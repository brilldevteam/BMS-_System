const sampleDocuments = {
  screening: [
    {
      id: 'garage-screening',
      fileName: 'Chamudi-Shanindi Rajapaksha Garage-Staff screening.pdf',
      category: 'Employee screening',
      date: '9/11/2025',
      uploadedBy: 'chamudi',
      size: '104.63 KB'
    }
  ],
  education: [
    {
      id: 'aml-certificate',
      fileName: 'AML certificate.Chamudi (1).pdf',
      category: 'AML Certificate',
      date: '9/11/2025',
      uploadedBy: 'chamudi',
      size: '21.98 MB'
    },
    {
      id: 'chamudi-certificates',
      fileName: 'Chamudi-documents.pdf',
      category: 'Other Certificate',
      date: '9/11/2025',
      uploadedBy: 'chamudi',
      size: '618.71 KB'
    }
  ],
  employment: [
    {
      id: 'data-protection',
      fileName: 'Data Protection -Chamudi New.pdf',
      category: 'Data Protection',
      date: '9/16/2025',
      uploadedBy: 'chamudi',
      size: '363.55 KB'
    },
    {
      id: 'manual-receipt',
      fileName: 'Chamudi Shanindi-Manual Receipt.pdf',
      category: 'Manual Receipt',
      date: '9/16/2025',
      uploadedBy: 'chamudi',
      size: '201.02 KB'
    },
    {
      id: 'pep-document',
      fileName: 'Criminal & PEP Chamudi.pdf',
      category: 'Criminal & PEP',
      date: '9/16/2025',
      uploadedBy: 'chamudi',
      size: '312.16 KB'
    },
    {
      id: 'job-description',
      fileName: 'JD-Assistant Manager-Operational & Client onboard-Chamudi.pdf',
      category: 'Job Description',
      date: '9/16/2025',
      uploadedBy: 'chamudi',
      size: '327.71 KB'
    }
  ],
  personal: [
    {
      id: 'passport-copy',
      fileName: 'Passport copy_chamudi.pdf',
      category: 'Passport',
      date: '9/14/2025',
      uploadedBy: 'chamudi',
      size: '62.06 KB'
    },
    {
      id: 'cv',
      fileName: 'CV.pdf',
      category: 'CV',
      date: '9/14/2025',
      uploadedBy: 'chamudi',
      size: '122.62 KB'
    },
    {
      id: 'qid',
      fileName: 'QID.jpg',
      category: 'QID',
      date: '9/14/2025',
      uploadedBy: 'chamudi',
      size: '111.15 KB'
    }
  ]
};

const createDocumentSections = (hasDocuments = false) => [
  {
    id: 'kyc-sheet',
    title: 'KYC Sheet',
    description: 'Know Your Customer documentation and verification records',
    documents: []
  },
  {
    id: 'screening-records',
    title: 'Screening Records',
    description: 'Background verification and screening documentation',
    documents: hasDocuments ? sampleDocuments.screening : []
  },
  {
    id: 'ongoing-monitoring',
    title: 'Ongoing Monitoring',
    description: 'Continuous monitoring and compliance tracking records',
    documents: []
  },
  {
    id: 'educational-certificates',
    title: 'Educational Certificates',
    description: 'Custom staff document section',
    custom: true,
    documents: hasDocuments ? sampleDocuments.education : []
  },
  {
    id: 'employment-documents',
    title: 'Employment Documents',
    description: 'Custom staff document section',
    custom: true,
    documents: hasDocuments ? sampleDocuments.employment : []
  },
  {
    id: 'personal-documents',
    title: 'Personal Documents',
    description: 'Custom staff document section',
    custom: true,
    documents: hasDocuments ? sampleDocuments.personal : []
  }
];

const staffRecords = [
  {
    id: 'chamali-sapunsara',
    name: 'Chamali Sapunsara',
    email: 'chamali@newoon.com',
    department: 'Operation',
    role: 'Operation Management',
    level: 'Senior',
    sections: 3,
    documents: 0,
    status: 'No Documents'
  },
  {
    id: 'chaminda',
    name: 'Chaminda',
    email: 'chaminda@newoon.com',
    department: 'Compliance',
    role: 'Compliance Management',
    level: 'Senior',
    sections: 3,
    documents: 0,
    status: 'No Documents'
  },
  {
    id: 'chamudi',
    name: 'chamudi',
    email: 'chamudi@gmail.com',
    department: 'Administration',
    role: 'admin',
    level: 'Senior',
    sections: 6,
    documents: 10,
    status: 'Complete'
  },
  {
    id: 'hashini-vithanagama',
    name: 'Hashini Vithanagama',
    email: 'hashini@newoon.com',
    department: 'Finance & Accounting',
    role: 'Accounting',
    sections: 6,
    documents: 8,
    status: 'Complete'
  },
  {
    id: 'iresha-sadamali',
    name: 'Iresha Sadamali',
    email: 'iresha@newoon.com',
    department: 'Finance & Accounting',
    role: 'Accounting',
    sections: 6,
    documents: 9,
    status: 'Complete'
  },
  {
    id: 'it-team',
    name: 'IT Team',
    email: 'it@newoon.com',
    department: 'Administration',
    role: 'admin',
    level: 'Senior',
    sections: 3,
    documents: 0,
    status: 'No Documents'
  },
  {
    id: 'janani-kaveesha',
    name: 'Janani Kaveesha',
    email: 'janani@newoon.com',
    department: 'Compliance',
    role: 'Compliance Management',
    level: 'Senior',
    sections: 3,
    documents: 0,
    status: 'No Documents'
  },
  {
    id: 'jyoti-kumari-rajak',
    name: 'Jyoti Kumari Rajak',
    email: 'jyoti@newoon.com',
    department: 'Operation',
    role: 'Operation Management',
    level: 'Senior',
    sections: 3,
    documents: 0,
    status: 'No Documents'
  },
  {
    id: 'kaveena-perera',
    name: 'Kaveena Perera',
    email: 'kaveena@newoon.com',
    department: 'Finance & Accounting',
    role: 'Accounting',
    sections: 6,
    documents: 10,
    status: 'Complete'
  },
  {
    id: 'lashini-dissanayake',
    name: 'Lashini Dissanayake',
    email: 'lashini@newoon.com',
    department: 'Compliance',
    role: 'Compliance Management',
    level: 'Senior',
    sections: 7,
    documents: 18,
    status: 'Complete'
  },
  {
    id: 'minerva-kumari',
    name: 'Minerva Kumari',
    email: 'minerva@newoon.com',
    department: 'Compliance',
    role: 'Compliance Management',
    level: 'Senior',
    sections: 3,
    documents: 0,
    status: 'No Documents'
  },
  {
    id: 'n',
    name: 'n',
    email: 'admin@gmail.com',
    department: 'Administration',
    role: 'admin',
    level: 'Senior',
    sections: 4,
    documents: 3,
    status: 'Incomplete'
  },
  {
    id: 'nimesha-madushani',
    name: 'Nimesha Madushani',
    email: 'nimesha@newoon.com',
    department: 'Operation',
    role: 'Operation Management',
    sections: 6,
    documents: 8,
    status: 'Complete'
  },
  {
    id: 'pavithra-madhubhashini',
    name: 'Pavithra Madhubhashini',
    email: 'pavithra@newoon.com',
    department: 'Finance & Accounting',
    role: 'Accounting',
    sections: 3,
    documents: 0,
    status: 'No Documents'
  },
  {
    id: 'poornima-nilmini',
    name: 'Poornima Nilmini',
    email: 'poornima@newoon.com',
    department: 'Finance & Accounting',
    role: 'Accounting',
    sections: 3,
    documents: 0,
    status: 'No Documents'
  },
  {
    id: 'prabisha-poudel',
    name: 'Prabisha Poudel',
    email: 'prabisha@gmail.com',
    department: 'Risk & Compliance',
    role: 'MLRO',
    level: 'Senior',
    sections: 3,
    documents: 0,
    status: 'No Documents'
  },
  {
    id: 'priyanka-singh',
    name: 'Priyanka Singh',
    email: 'priyanka@newoon.com',
    department: 'General Department',
    role: 'DMLRO',
    sections: 6,
    documents: 13,
    status: 'Complete'
  }
];

export const complianceStaff = staffRecords.map((staff) => ({
  ...staff,
  documentSections: createDocumentSections(staff.documents > 0)
}));
