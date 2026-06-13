import { randomUUID } from 'node:crypto';
import { copyFile, mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(currentDirectory, '../../..');
const seedDirectory = path.join(projectRoot, 'data');
const storeDirectory = path.join(projectRoot, '.tmp', 'user-management');
const rolesFile = path.join(storeDirectory, 'roles.json');
const usersFile = path.join(storeDirectory, 'users.json');

let writeQueue = Promise.resolve();

function storeError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

async function ensureStore() {
  await mkdir(storeDirectory, { recursive: true });

  await Promise.all([
    copyFile(path.join(seedDirectory, 'roles.json'), rolesFile, 1).catch((error) => {
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }),
    copyFile(path.join(seedDirectory, 'users.json'), usersFile, 1).catch((error) => {
      if (error.code !== 'EEXIST') {
        throw error;
      }
    })
  ]);
}

async function readJson(file) {
  await ensureStore();
  return JSON.parse(await readFile(file, 'utf8'));
}

async function writeJson(file, value) {
  const temporaryFile = `${file}.${randomUUID()}.tmp`;
  await writeFile(temporaryFile, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  await rename(temporaryFile, file);
}

function withWriteLock(operation) {
  const result = writeQueue.then(operation, operation);
  writeQueue = result.catch(() => {});
  return result;
}

function normalizeUser(user, roles) {
  const role = roles.find((item) => item.name === user.role);
  const createdAt = user.createdAt || new Date(0).toISOString();

  return {
    id: user.id,
    name: user.fullName || user.name,
    fullName: user.fullName || user.name,
    email: user.email || '',
    department: user.department || '',
    avatar: user.avatar || null,
    status: user.status || 'Active',
    role: user.role || null,
    roleId: user.roleId || role?.id || null,
    permissions: user.permissions || {},
    createdAt,
    updatedAt: user.updatedAt || createdAt
  };
}

function normalizeRoles(roles, users) {
  return roles.map((role) => {
    const createdAt = role.createdAt || new Date(0).toISOString();

    return {
      id: role.id,
      name: role.name,
      description: role.description || '',
      permissions: role.permissions || [],
      userCount: users.filter((user) => user.role === role.name).length,
      createdAt,
      updatedAt: role.updatedAt || createdAt
    };
  });
}

export async function getLocalRoles() {
  const [roles, users] = await Promise.all([readJson(rolesFile), readJson(usersFile)]);
  return normalizeRoles(roles, users);
}

export async function getLocalUsers() {
  const [roles, users] = await Promise.all([readJson(rolesFile), readJson(usersFile)]);
  return users.map((user) => normalizeUser(user, roles));
}

export async function createLocalRole({ name, description = '', permissions = [] }) {
  return withWriteLock(async () => {
    const [roles, users] = await Promise.all([readJson(rolesFile), readJson(usersFile)]);

    if (roles.some((role) => role.name === name)) {
      throw storeError('P2002', 'Role already exists.');
    }

    const timestamp = new Date().toISOString();
    const role = {
      id: randomUUID(),
      name,
      description,
      permissions,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    roles.push(role);
    await writeJson(rolesFile, roles);
    return normalizeRoles([role], users)[0];
  });
}

export async function updateLocalRole(id, updates) {
  return withWriteLock(async () => {
    const [roles, users] = await Promise.all([readJson(rolesFile), readJson(usersFile)]);
    const roleIndex = roles.findIndex((role) => role.id === id);

    if (roleIndex === -1) {
      throw storeError('P2025', 'Role not found.');
    }

    const previousName = roles[roleIndex].name;
    const nextName = updates.name ?? previousName;

    if (roles.some((role, index) => index !== roleIndex && role.name === nextName)) {
      throw storeError('P2002', 'Role already exists.');
    }

    roles[roleIndex] = {
      ...roles[roleIndex],
      name: nextName,
      description: updates.description ?? roles[roleIndex].description ?? '',
      permissions: updates.permissions ?? roles[roleIndex].permissions ?? [],
      updatedAt: new Date().toISOString()
    };

    if (nextName !== previousName) {
      users.forEach((user) => {
        if (user.role === previousName) {
          user.role = nextName;
          user.roleId = id;
        }
      });
    }

    await Promise.all([writeJson(rolesFile, roles), writeJson(usersFile, users)]);
    return normalizeRoles([roles[roleIndex]], users)[0];
  });
}

export async function deleteLocalRole(id) {
  return withWriteLock(async () => {
    const [roles, users] = await Promise.all([readJson(rolesFile), readJson(usersFile)]);
    const role = roles.find((item) => item.id === id);

    if (!role) {
      throw storeError('P2025', 'Role not found.');
    }

    if (users.some((user) => user.role === role.name)) {
      throw storeError('P2003', 'Role is assigned to users.');
    }

    await writeJson(
      rolesFile,
      roles.filter((item) => item.id !== id)
    );
  });
}

export async function createLocalUser(userData) {
  return withWriteLock(async () => {
    const [roles, users] = await Promise.all([readJson(rolesFile), readJson(usersFile)]);
    const role = roles.find((item) => item.name === userData.role);

    if (!role) {
      throw storeError('P2025', 'Selected role does not exist.');
    }

    if (users.some((user) => user.email?.toLowerCase() === userData.email.toLowerCase())) {
      throw storeError('P2002', 'A user with this email already exists.');
    }

    const timestamp = new Date().toISOString();
    const user = {
      id: randomUUID(),
      name: userData.fullName,
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password,
      department: userData.department || '',
      avatar: null,
      status: 'Active',
      role: role.name,
      roleId: role.id,
      permissions: userData.permissions,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    users.push(user);
    await writeJson(usersFile, users);
    return normalizeUser(user, roles);
  });
}

export async function updateLocalUserPermissions(id, permissions) {
  return withWriteLock(async () => {
    const [roles, users] = await Promise.all([readJson(rolesFile), readJson(usersFile)]);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw storeError('P2025', 'User not found.');
    }

    users[userIndex] = {
      ...users[userIndex],
      permissions,
      updatedAt: new Date().toISOString()
    };

    await writeJson(usersFile, users);
    return normalizeUser(users[userIndex], roles);
  });
}
