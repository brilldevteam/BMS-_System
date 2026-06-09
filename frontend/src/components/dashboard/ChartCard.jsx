function ChartBars() {
  const bars = ['h-14', 'h-24', 'h-20', 'h-32', 'h-28', 'h-36', 'h-24'];

  return (
    <div className="flex h-56 items-end gap-3 rounded-xl bg-slate-50 p-5">
      {bars.map((height, index) => (
        <div key={index} className="flex flex-1 items-end">
          <div
            className={`${height} w-full rounded-t-lg bg-violet-500/80`}
          />
        </div>
      ))}
    </div>
  );
}

function DonutPlaceholder() {
  return (
    <div className="flex h-56 items-center justify-center rounded-xl bg-slate-50">
      <div className="flex h-36 w-36 items-center justify-center rounded-full bg-[conic-gradient(#7c3aed_0_42%,#38bdf8_42%_72%,#22c55e_72%_100%)] shadow-md">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-sm font-medium text-slate-700">
          100%
        </div>
      </div>
    </div>
  );
}

function LinePlaceholder() {
  return (
    <div className="relative h-56 overflow-hidden rounded-xl bg-slate-50 p-5">
      <div className="absolute inset-x-5 top-1/2 h-px bg-slate-200" />
      <div className="absolute inset-x-5 top-1/4 h-px bg-slate-100" />
      <div className="absolute inset-x-5 top-3/4 h-px bg-slate-100" />
      <svg className="relative h-full w-full" viewBox="0 0 420 180" fill="none">
        <path
          d="M10 140C60 90 95 120 130 82C166 42 210 70 244 58C290 42 320 22 410 48"
          stroke="url(#lineGradient)"
          strokeLinecap="round"
          strokeWidth="6"
        />
        <defs>
          <linearGradient id="lineGradient" x1="10" x2="410" y1="140" y2="48">
            <stop stopColor="#7c3aed" />
            <stop offset="1" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function ChartCard({ title, subtitle, type = 'bars', wide = false }) {
  return (
    <article
      className={`rounded-xl bg-white p-5 shadow-md shadow-slate-200/80 transition hover:shadow-lg ${
        wide ? 'xl:col-span-2' : ''
      }`}
    >
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-xs font-normal text-slate-500">{subtitle}</p>
      </div>

      {type === 'donut' ? <DonutPlaceholder /> : null}
      {type === 'line' ? <LinePlaceholder /> : null}
      {type === 'bars' ? <ChartBars /> : null}
    </article>
  );
}

export default ChartCard;
