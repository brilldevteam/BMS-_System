function CreateJobHeader() {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white shadow-md shadow-violet-500/20">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 7H18V20H6Z" />
          <path d="M9 7V5H15V7" />
          <path d="M9 12H15" />
        </svg>
      </div>
      <div>
        <h1 className="text-2xl font-semibold tracking-normal text-slate-950">
          Create New Job
        </h1>
        <p className="mt-1 text-sm font-normal text-slate-600">
          Fill in the details below to create a new job assignment
        </p>
      </div>
    </div>
  );
}

export default CreateJobHeader;
