import { Router } from 'express';
import { hashPassword } from '../lib/password.js';
import prisma from '../lib/prisma.js';

const router = Router();

function buildPermissions(index, elevated = false) {
  const dual = (edit, view = true) => ({ edit: Boolean(edit), view: Boolean(view) });
  const single = (enabled) => ({ enabled: Boolean(enabled) });

  return {
    companyDetails: dual(elevated || index % 3 !== 1),
    directorDetails: dual(elevated || index % 2 === 0),
    secretaryDetails: dual(elevated || index % 3 !== 2),
    shareholderDetails: dual(elevated || index % 4 === 0),
    sefDetails: dual(elevated || index % 2 === 1),
    signedKyc: dual(elevated || index % 3 === 0),
    paymentDetails: dual(elevated || index % 3 === 1),
    auditedFinancial: dual(elevated || index % 2 === 0),
    kycLmro: single(elevated || index % 3 === 0),
    kycDmlro: single(elevated || index % 4 === 0),
    kycCeo: single(elevated || index % 5 === 0),
    braLmro: single(elevated || index % 3 === 0),
    braCeo: single(elevated || index % 5 === 0),
    resources: single(elevated || index % 4 === 2),
    documentManagement: single(elevated || index % 2 === 0),
    renewalManagement: single(elevated || index % 3 === 0),
    complianceManagement: single(elevated || index % 2 === 0),
    requestService: single(elevated || index % 3 !== 1),
    userManagement: single(elevated || index % 4 === 0),
    operationManagement: single(elevated || index % 2 === 0),
    accountManagement: single(elevated || index % 5 === 0)
  };
}

function mapRole(role) {
  return {
    id: role.id,
    name: role.name,
    description: role.description,
    permissions: role.permissions || [],
    userCount: role._count?.users || 0,
    createdAt: role.createdAt.toISOString(),
    updatedAt: role.updatedAt.toISOString()
  };
}

function mapUser(user) {
  return {
    id: user.id,
    name: user.fullName,
    fullName: user.fullName,
    email: user.email,
    department: user.department,
    avatar: user.avatar,
    status: user.status,
    role: user.role?.name || null,
    roleId: user.roleId,
    permissions: user.permissions || {},
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString()
  };
}

router.get('/roles', async (_request, response) => {
  try {
    const roles = await prisma.role.findMany({
      include: { _count: { select: { users: true } } },
      orderBy: { createdAt: 'asc' }
    });

    response.status(200).json({ roles: roles.map(mapRole) });
  } catch (error) {
    response.status(500).json({ message: 'Failed to load roles.' });
  }
});

router.post('/roles', async (request, response) => {
  const { name, description = '', permissions = [] } = request.body;

  if (!name || !name.trim()) {
    response.status(400).json({ message: 'Role name is required.' });
    return;
  }

  try {
    const role = await prisma.role.create({
      data: {
        name: name.trim(),
        description,
        permissions
      },
      include: { _count: { select: { users: true } } }
    });

    response.status(201).json({ role: mapRole(role) });
  } catch (error) {
    if (error.code === 'P2002') {
      response.status(409).json({ message: 'Role already exists.' });
      return;
    }

    response.status(500).json({ message: 'Failed to create role.' });
  }
});

router.put('/roles/:id', async (request, response) => {
  try {
    const role = await prisma.role.update({
      where: { id: request.params.id },
      data: {
        name: request.body.name,
        description: request.body.description,
        permissions: request.body.permissions
      },
      include: { _count: { select: { users: true } } }
    });

    response.status(200).json({ role: mapRole(role) });
  } catch (error) {
    if (error.code === 'P2025') {
      response.status(404).json({ message: 'Role not found.' });
      return;
    }

    response.status(500).json({ message: 'Failed to update role.' });
  }
});

router.delete('/roles/:id', async (request, response) => {
  try {
    await prisma.role.delete({ where: { id: request.params.id } });
    response.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      response.status(404).json({ message: 'Role not found.' });
      return;
    }

    response.status(500).json({ message: 'Failed to delete role.' });
  }
});

router.get('/users', async (_request, response) => {
  try {
    const users = await prisma.user.findMany({
      include: { role: true },
      orderBy: { createdAt: 'asc' }
    });

    response.status(200).json({ users: users.map(mapUser) });
  } catch (error) {
    response.status(500).json({ message: 'Failed to load users.' });
  }
});

router.post('/users', async (request, response) => {
  const { name, fullName, email, password, role, department = '' } = request.body;
  const resolvedName = fullName || name;

  if (!resolvedName || !email || !password || !role) {
    response.status(400).json({ message: 'Name, email, password, and role are required.' });
    return;
  }

  try {
    const roleRecord = await prisma.role.findUnique({ where: { name: role } });

    if (!roleRecord) {
      response.status(400).json({ message: 'Selected role does not exist.' });
      return;
    }

    const userCount = await prisma.user.count();
    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        fullName: resolvedName.trim(),
        email: email.trim(),
        password: passwordHash,
        department,
        roleId: roleRecord.id,
        permissions: buildPermissions(userCount, role === 'admin')
      },
      include: { role: true }
    });

    response.status(201).json({ user: mapUser(user) });
  } catch (error) {
    if (error.code === 'P2002') {
      response.status(409).json({ message: 'A user with this email already exists.' });
      return;
    }

    response.status(500).json({ message: 'Failed to create user.' });
  }
});

router.put('/users/:id/permissions', async (request, response) => {
  const { permissions } = request.body;

  if (!permissions || typeof permissions !== 'object' || Array.isArray(permissions)) {
    response.status(400).json({ message: 'Permissions object is required.' });
    return;
  }

  try {
    const user = await prisma.user.update({
      where: { id: request.params.id },
      data: { permissions },
      include: { role: true }
    });

    response.status(200).json({ user: mapUser(user) });
  } catch (error) {
    if (error.code === 'P2025') {
      response.status(404).json({ message: 'User not found.' });
      return;
    }

    response.status(500).json({ message: 'Failed to update permissions.' });
  }
});

export default router;
