import { useMemo, useState } from 'react';

const fallbackUsers = [
  'n',
  'chamudi',
  'Nimesha Madushani',
  'Lashini Dissanayake',
  'Sarah Kumara',
  'Chamali Sapunsara',
  'Priyanka',
  'Test',
  'Janani Kaveesha',
  'Minerva Kumari',
  'Rashini Suzain',
  'IT Team'
];

function SignaturePreview({ hasSignature }) {
  if (hasSignature) {
    return (
      <div className="flex h-24 items-center justify-center rounded-lg border border-slate-200 bg-white">
        <svg className="h-12 w-32 text-slate-800" viewBox="0 0 180 64" fill="none" aria-hidden="true">
          <path d="M8 42C22 20 31 55 44 32C55 13 61 48 75 30C89 11 94 45 108 31C122 16 129 41 142 28C154 16 159 31 172 23" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex h-24 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-slate-400">
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20H21" />
        <path d="M16.5 3.5A2.1 2.1 0 0 1 19.5 6.5L7 19L3 20L4 16Z" />
      </svg>
      <p className="mt-2 text-xs">No signature</p>
    </div>
  );
}

function SignaturesPanel({ users }) {
  const signatureUsers = useMemo(() => {
    const sourceUsers = users.length > 0 ? users : fallbackUsers.map((name, index) => ({ id: index, name }));
    return sourceUsers.slice(0, 15).map((user, index) => ({
      ...user,
      hasSignature: index === 1 || index === 7
    }));
  }, [users]);

  const [localSignatures, setLocalSignatures] = useState({});

  const markSignature = (userId, value) => {
    setLocalSignatures((current) => ({
      ...current,
      [userId]: value
    }));
  };

  return (
    <section className="rounded-xl bg-white p-5 shadow-md shadow-slate-200/80">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20H21" />
            <path d="M16.5 3.5A2.1 2.1 0 0 1 19.5 6.5L7 19L3 20L4 16Z" />
          </svg>
        </span>
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Digital Signatures</h2>
          <p className="mt-1 text-xs font-normal text-slate-500">
            Upload and manage digital signatures for users with signing permissions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {signatureUsers.map((user, index) => {
          const hasSignature = localSignatures[user.id] ?? user.hasSignature;

          return (
            <article key={user.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="mb-3">
                <h3 className="text-sm font-medium text-slate-950">{user.name}</h3>
                <p className="mt-1 truncate text-xs text-slate-500">
                  {(user.email || `${user.name.replaceAll(' ', '.').toLowerCase()}@newoon.com`)}
                </p>
                <div className="mt-2 flex gap-2">
                  <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                    DMLRO
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                    MLRO
                  </span>
                  <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-medium text-violet-700">
                    CEO
                  </span>
                </div>
              </div>

              <SignaturePreview hasSignature={hasSignature} />

              {hasSignature ? (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-blue-50 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
                    type="button"
                    onClick={() => markSignature(user.id, true)}
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12S5.5 5 12 5S22 12 22 12S18.5 19 12 19S2 12 2 12Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Preview
                  </button>
                  <button
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-rose-50 text-xs font-medium text-rose-700 transition hover:bg-rose-100"
                    type="button"
                    onClick={() => markSignature(user.id, false)}
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6H21" />
                      <path d="M8 6V4H16V6" />
                      <path d="M6 6L7 21H17L18 6" />
                    </svg>
                    Delete
                  </button>
                </div>
              ) : (
                <label className="mt-3 flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 text-xs font-medium text-white shadow-md shadow-violet-500/20 transition hover:-translate-y-0.5">
                  <input
                    className="sr-only"
                    type="file"
                    accept=".png,.jpg,.jpeg,.svg"
                    onChange={() => markSignature(user.id, true)}
                  />
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20H21" />
                    <path d="M16.5 3.5A2.1 2.1 0 0 1 19.5 6.5L7 19L3 20L4 16Z" />
                  </svg>
                  Create Signature
                </label>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default SignaturesPanel;
