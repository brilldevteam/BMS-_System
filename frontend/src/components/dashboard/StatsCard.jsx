const icons = {
  jobs: (
    <>
      <path d="M6 7H18V20H6Z" />
      <path d="M9 7V5H15V7" />
      <path d="M9 12H15" />
      <path d="M9 16H13" />
    </>
  ),
  users: (
    <>
      <path d="M16 19C16 16.8 14.2 15 12 15H8C5.8 15 4 16.8 4 19" />
      <circle cx="10" cy="8" r="4" />
      <path d="M20 19C20 17.3 18.9 15.9 17.4 15.3" />
      <path d="M16.5 4.4C17.4 5.1 18 6.2 18 7.5C18 8.8 17.4 9.9 16.5 10.6" />
    </>
  ),
  online: (
    <>
      <path d="M12 20A8 8 0 1 0 12 4A8 8 0 0 0 12 20Z" />
      <path d="M8.5 12.5L11 15L16 9" />
    </>
  ),
  rate: (
    <>
      <path d="M4 19V5" />
      <path d="M4 19H20" />
      <path d="M8 15L12 11L15 14L20 8" />
    </>
  )
};

function StatsCard({ title, value, hint, tone, icon }) {
  return (
    <article className="rounded-xl bg-white p-5 shadow-md shadow-slate-200/80 transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-normal text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold tracking-normal text-slate-950">
            {value}
          </p>
        </div>
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${tone.bg} ${tone.text}`}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {icons[icon]}
          </svg>
        </span>
      </div>
      <p className={`mt-4 text-xs font-medium ${tone.text}`}>{hint}</p>
    </article>
  );
}

export default StatsCard;
