import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const roleNames = [
  'admin',
  'Accounting',
  'CEO',
  'MLRO',
  'DMLRO',
  'Compliance Management',
  'Operation Management',
  'Senior Executive Function'
];

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

const users = [
  ['n', 'admin', 'Administration'],
  ['chamudi', 'admin', 'Administration'],
  ['Nimesha Madushani', 'Operation Management', 'Operation'],
  ['Lashini Dissanayake', 'Compliance Management', 'Compliance'],
  ['Hashini Vithanagama', 'Accounting', 'Finance & Accounting'],
  ['Iresha Sadamali', 'Accounting', 'Finance & Accounting'],
  ['Chamali Sapunsara', 'Operation Management', 'Operation'],
  ['Pavithra Madhubhashini', 'Accounting', 'Finance & Accounting'],
  ['Janani Kaveesha', 'Compliance Management', 'Compliance'],
  ['Poornima Nilmini', 'Accounting', 'Finance & Accounting'],
  ['Minerva Kumari', 'Compliance Management', 'Compliance'],
  ['Prabisha Poudel', 'MLRO', 'Risk & Compliance'],
  ['Jyoti Kumari Rajak', 'Operation Management', 'Operation'],
  ['IT Team', 'admin', 'Administration']
];

const services = [
  ['New Client Onboarding', 'Client intake, document collection, and initial setup workflow.', 'Client Services'],
  ['Company Formation', 'Prepare incorporation documents and coordinate entity setup tasks.', 'Corporate Services'],
  ['KYC Review', 'Review client KYC packs and track compliance approval readiness.', 'Compliance'],
  ['BRA Assessment', 'Business risk assessment preparation and review service.', 'Compliance'],
  ['Annual Renewal', 'Manage recurring company renewal requirements and document updates.', 'Renewals'],
  ['Financial Statement Review', 'Coordinate annual financial statement collection and review.', 'Accounting'],
  ['Tax Return Coordination', 'Track tax return preparation tasks and required supporting files.', 'Accounting'],
  ['Document Certification', 'Handle certified document requests and related admin tracking.', 'Administration']
];

const companies = [
  'Newoon Business Services',
  'Gulf Horizon Trading',
  'Blue Axis Consulting',
  'Palm Bridge Holdings',
  'Atlas Compliance Group'
];

async function main() {
  const rolesByName = new Map();

  for (const name of roleNames) {
    const role = await prisma.role.upsert({
      where: { name },
      update: {},
      create: {
        name,
        description: `${name} role`,
        permissions: []
      }
    });
    rolesByName.set(name, role);
  }

  for (const [index, [fullName, roleName, department]] of users.entries()) {
    const email = `${fullName.toLowerCase().replace(/[^a-z0-9]+/g, '.')}@newoon.com`;
    const role = rolesByName.get(roleName);

    await prisma.user.upsert({
      where: { email },
      update: {
        roleId: role?.id,
        department,
        permissions: buildPermissions(index, roleName === 'admin')
      },
      create: {
        fullName,
        email,
        password: null,
        department,
        roleId: role?.id,
        permissions: buildPermissions(index, roleName === 'admin')
      }
    });
  }

  for (const [index, [title, description, category]] of services.entries()) {
    const existingService = await prisma.service.findFirst({ where: { title } });

    if (!existingService) {
      await prisma.service.create({
        data: {
          title,
          description,
          category,
          status: index % 6 === 0 ? 'Inactive' : 'Active',
          departments: [category],
          usageCount: 8 + index * 3
        }
      });
    }
  }

  for (const name of companies) {
    const existingCompany = await prisma.company.findFirst({ where: { name } });

    if (!existingCompany) {
      await prisma.company.create({ data: { name } });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
