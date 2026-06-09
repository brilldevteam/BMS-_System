function Topbar({ title, subtitle, accent }) {
  return (
    <header className="rounded-3xl border border-white bg-white/90 px-5 py-5 shadow-sm shadow-slate-200/80 sm:px-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className={`text-sm font-bold uppercase tracking-[0.18em] ${accent.text}`}>
            Workspace
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-normal text-[#23225f]">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">{subtitle}</p>
        </div>

        <a
          href="/mode-selection"
          className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950"
        >
          Switch Workspace
        </a>
      </div>
    </header>
  );
}

export default Topbar;
