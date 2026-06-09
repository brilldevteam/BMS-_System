function SectionShell({ icon, title, children }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-700">
          {icon}
        </span>
        <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default SectionShell;
