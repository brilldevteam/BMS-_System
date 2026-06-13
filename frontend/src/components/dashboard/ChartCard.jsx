import { useId, useState } from 'react';
import { TrendingUp } from 'lucide-react';

function ChartBars({ values = [38, 62, 52, 78, 68, 88, 60] }) {
  const maxValue = Math.max(...values, 1);

  return (
    <div className="flex h-56 items-end gap-3 rounded-xl bg-slate-50 p-5">
      {values.map((value, index) => (
        <div key={index} className="flex flex-1 items-end">
          <div
            className="w-full rounded-t-lg bg-violet-500/80 transition-[height] duration-300"
            style={{ height: `${Math.max((value / maxValue) * 100, 8)}%` }}
          />
        </div>
      ))}
    </div>
  );
}

function TaskCompletionChart({ data }) {
  const [activeWeek, setActiveWeek] = useState(null);
  const chartId = useId().replace(/:/g, '');
  const width = 640;
  const height = 330;
  const margin = { top: 20, right: 18, bottom: 55, left: 48 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const maxValue = Math.max(
    4,
    ...data.flatMap((week) => [week.completed, week.pending])
  );
  const yMax = Math.ceil(maxValue / 2) * 2;
  const ticks = Array.from({ length: 5 }, (_, index) =>
    Math.round((yMax / 4) * index)
  );
  const groupWidth = plotWidth / data.length;
  const barWidth = Math.min(34, groupWidth * 0.24);
  const yPosition = (value) =>
    margin.top + plotHeight - (value / yMax) * plotHeight;

  return (
    <div className="relative rounded-xl bg-slate-50 px-2 pb-4 pt-2">
      <svg
        className="h-[300px] w-full overflow-visible"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Weekly task completion chart"
        onMouseLeave={() => setActiveWeek(null)}
      >
        <defs>
          <linearGradient id={`${chartId}-completed`} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#6366f1" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        {ticks.map((tick) => {
          const y = yPosition(tick);

          return (
            <g key={tick}>
              <line
                x1={margin.left}
                x2={width - margin.right}
                y1={y}
                y2={y}
                stroke="#dbe3ef"
                strokeDasharray="4 5"
              />
              <text
                x={margin.left - 12}
                y={y + 4}
                textAnchor="end"
                className="fill-slate-500 text-[12px]"
              >
                {tick}
              </text>
            </g>
          );
        })}

        <line
          x1={margin.left}
          x2={margin.left}
          y1={margin.top}
          y2={margin.top + plotHeight}
          stroke="#64748b"
        />
        <line
          x1={margin.left}
          x2={width - margin.right}
          y1={margin.top + plotHeight}
          y2={margin.top + plotHeight}
          stroke="#64748b"
        />

        {data.map((week, index) => {
          const centerX = margin.left + groupWidth * index + groupWidth / 2;
          const completedY = yPosition(week.completed);
          const pendingY = yPosition(week.pending);
          const isActive = activeWeek === index;

          return (
            <g
              key={week.label}
              onMouseEnter={() => setActiveWeek(index)}
              onFocus={() => setActiveWeek(index)}
              onBlur={() => setActiveWeek(null)}
              tabIndex="0"
              className="cursor-pointer outline-none"
              aria-label={`${week.label}: ${week.completed} completed, ${week.pending} pending`}
            >
              <rect
                x={margin.left + groupWidth * index}
                y={margin.top}
                width={groupWidth}
                height={plotHeight}
                fill={isActive ? '#eef2ff' : 'transparent'}
                className="transition-colors duration-300"
              />
              <rect
                x={centerX - barWidth - 2}
                y={completedY}
                width={barWidth}
                height={Math.max(margin.top + plotHeight - completedY, 0)}
                rx="5"
                fill={`url(#${chartId}-completed)`}
                className="transition-all duration-500 ease-out"
              />
              <rect
                x={centerX + 2}
                y={pendingY}
                width={barWidth}
                height={Math.max(margin.top + plotHeight - pendingY, 0)}
                rx="5"
                fill="#64748b"
                className="transition-all duration-500 ease-out"
              />
              <line
                x1={centerX}
                x2={centerX}
                y1={margin.top + plotHeight}
                y2={margin.top + plotHeight + 7}
                stroke="#64748b"
              />
              <text
                x={centerX}
                y={margin.top + plotHeight + 25}
                textAnchor="middle"
                className="fill-slate-600 text-[12px]"
              >
                {week.label}
              </text>
            </g>
          );
        })}
      </svg>

      {activeWeek !== null ? (
        <div
          className="pointer-events-none absolute z-10 min-w-40 -translate-x-1/2 -translate-y-full rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-xl shadow-slate-300/50 transition-all duration-200"
          style={{
            left: `${((activeWeek + 0.5) / data.length) * 100}%`,
            top: '53%'
          }}
        >
          <p className="text-sm font-semibold text-slate-900">
            {data[activeWeek].label}
          </p>
          <p className="mt-2 text-xs font-medium text-blue-600">
            Completed: {data[activeWeek].completed}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Pending: {data[activeWeek].pending}
          </p>
        </div>
      ) : null}

      <div className="flex items-center justify-center gap-5 text-xs font-medium">
        <span className="inline-flex items-center gap-2 text-blue-600">
          <span className="h-3 w-3 rounded-sm bg-blue-500" />
          Completed
        </span>
        <span className="inline-flex items-center gap-2 text-slate-600">
          <span className="h-3 w-3 rounded-sm bg-slate-500" />
          Pending
        </span>
      </div>
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

function JobTrendsChart() {
  const chartId = useId().replace(/:/g, '');
  const [activeMonth, setActiveMonth] = useState(null);
  const data = [
    { label: 'Dec', jobs: 2 },
    { label: 'Jan', jobs: 0 },
    { label: 'Feb', jobs: 16 },
    { label: 'Mar', jobs: 24 },
    { label: 'Apr', jobs: 0 },
    { label: 'May', jobs: 0 },
    { label: 'Jun', jobs: 0 }
  ];
  const yTicks = [0, 6, 12, 18, 24];
  const width = 680;
  const height = 390;
  const margin = { top: 20, right: 20, bottom: 48, left: 52 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const xPosition = (index) =>
    margin.left + (plotWidth / (data.length - 1)) * index;
  const yPosition = (value) =>
    margin.top + plotHeight - (value / 24) * plotHeight;
  const baseline = margin.top + plotHeight;
  const linePath = [
    `M ${xPosition(0)} ${yPosition(2)}`,
    `C ${xPosition(0) + 34} ${yPosition(1)}, ${xPosition(1) - 32} ${baseline}, ${xPosition(1)} ${baseline}`,
    `C ${xPosition(1) + 35} ${baseline}, ${xPosition(2) - 35} ${yPosition(16)}, ${xPosition(2)} ${yPosition(16)}`,
    `C ${xPosition(2) + 36} ${yPosition(8)}, ${xPosition(3) - 38} ${margin.top}, ${xPosition(3)} ${margin.top}`,
    `C ${xPosition(3) + 38} ${margin.top}, ${xPosition(4) - 35} ${baseline}, ${xPosition(4)} ${baseline}`,
    `C ${xPosition(4) + 34} ${baseline}, ${xPosition(5) - 28} ${baseline}, ${xPosition(5)} ${baseline}`,
    `C ${xPosition(5) + 34} ${baseline}, ${xPosition(6) - 28} ${baseline}, ${xPosition(6)} ${baseline}`
  ].join(' ');
  const areaPath = `${linePath} L ${xPosition(6)} ${baseline} L ${xPosition(0)} ${baseline} Z`;

  return (
    <div className="relative w-full overflow-visible">
      <svg
        className="h-auto min-h-[280px] w-full"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Job trends from December to June"
        onMouseLeave={() => setActiveMonth(null)}
      >
        <defs>
          <linearGradient id={`${chartId}-area`} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#3b82f6" stopOpacity="0.32" />
            <stop offset="1" stopColor="#3b82f6" stopOpacity="0.04" />
          </linearGradient>
          <clipPath id={`${chartId}-reveal`}>
            <rect className="job-trends-reveal" x="0" y="0" width={width} height={height} />
          </clipPath>
        </defs>

        {yTicks.map((tick) => {
          const y = yPosition(tick);

          return (
            <g key={tick}>
              <line
                x1={margin.left}
                x2={width - margin.right}
                y1={y}
                y2={y}
                stroke="#dbe3ef"
                strokeDasharray="4 5"
              />
              <text
                x={margin.left - 11}
                y={y + 5}
                textAnchor="end"
                className="fill-slate-600 text-[14px]"
              >
                {tick}
              </text>
            </g>
          );
        })}

        {data.map((month, index) => {
          const x = xPosition(index);

          return (
            <g key={month.label}>
              <line
                x1={x}
                x2={x}
                y1={margin.top}
                y2={baseline}
                stroke="#dbe3ef"
                strokeDasharray="4 5"
              />
              <line
                x1={x}
                x2={x}
                y1={baseline}
                y2={baseline + 7}
                stroke="#64748b"
              />
              <text
                x={x}
                y={baseline + 27}
                textAnchor="middle"
                className="fill-slate-600 text-[14px]"
              >
                {month.label}
              </text>
            </g>
          );
        })}

        <line
          x1={margin.left}
          x2={margin.left}
          y1={margin.top}
          y2={baseline}
          stroke="#64748b"
        />
        <line
          x1={margin.left}
          x2={width - margin.right}
          y1={baseline}
          y2={baseline}
          stroke="#64748b"
        />

        <g clipPath={`url(#${chartId}-reveal)`}>
          <path d={areaPath} fill={`url(#${chartId}-area)`} />
          <path
            className="job-trends-line"
            d={linePath}
            fill="none"
            pathLength="1"
            stroke="#3b82f6"
            strokeDasharray="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
        </g>

        {data.map((month, index) => {
          const sectionWidth = plotWidth / (data.length - 1);

          return (
            <rect
              key={`${month.label}-interaction`}
              x={
                index === 0
                  ? margin.left
                  : xPosition(index) - sectionWidth / 2
              }
              y={margin.top}
              width={
                index === 0 || index === data.length - 1
                  ? sectionWidth / 2
                  : sectionWidth
              }
              height={plotHeight}
              fill="transparent"
              tabIndex="0"
              className="cursor-crosshair outline-none"
              aria-label={`${month.label}: ${month.jobs} jobs`}
              onMouseEnter={() => setActiveMonth(index)}
              onFocus={() => setActiveMonth(index)}
              onBlur={() => setActiveMonth(null)}
            />
          );
        })}

        {activeMonth !== null ? (
          <g className="pointer-events-none">
            <line
              x1={xPosition(activeMonth)}
              x2={xPosition(activeMonth)}
              y1={margin.top}
              y2={baseline}
              stroke="#94a3b8"
              strokeOpacity="0.55"
            />
            <circle
              cx={xPosition(activeMonth)}
              cy={yPosition(data[activeMonth].jobs)}
              r="6"
              fill="#3b82f6"
              stroke="white"
              strokeWidth="3"
            />
          </g>
        ) : null}
      </svg>

      {activeMonth !== null ? (
        <div
          className="pointer-events-none absolute z-20 min-w-28 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-xl shadow-slate-300/60 transition-all duration-200 ease-out"
          style={{
            left: `${Math.min(
              Math.max((xPosition(activeMonth) / width) * 100, 11),
              89
            )}%`,
            top: `${(yPosition(data[activeMonth].jobs) / height) * 100}%`,
            transform: 'translate(-50%, calc(-100% - 14px))'
          }}
        >
          <p className="text-base font-medium text-slate-900">
            {data[activeMonth].label}
          </p>
          <p className="mt-2 text-sm font-medium text-blue-600">
            jobs : {data[activeMonth].jobs}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  type = 'bars',
  wide = false,
  bars,
  filter,
  taskCompletionData,
  trendLabel
}) {
  const isJobTrends = type === 'line';

  return (
    <article
      className={`h-full bg-white transition hover:shadow-lg ${
        isJobTrends
          ? 'rounded-[22px] p-6 shadow-xl shadow-slate-300/60 sm:p-8'
          : 'rounded-xl p-5 shadow-md shadow-slate-200/80'
      } ${
        wide ? 'xl:col-span-2' : ''
      }`}
    >
      <div
        className={`flex items-start justify-between gap-4 ${
          isJobTrends ? 'mb-4 sm:items-center' : 'mb-5'
        }`}
      >
        <div>
          <h3
            className={`font-semibold text-slate-900 ${
              isJobTrends ? 'text-xl sm:text-2xl' : 'text-lg'
            }`}
          >
            {title}
          </h3>
          {!isJobTrends && subtitle ? (
            <p className="mt-1 text-xs font-normal text-slate-500">{subtitle}</p>
          ) : null}
        </div>

        {isJobTrends && trendLabel ? (
          <span className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 sm:px-4 sm:text-sm">
            <TrendingUp className="h-4 w-4" />
            {trendLabel}
          </span>
        ) : null}

        {filter ? (
          <select
            aria-label={filter.label}
            value={filter.value}
            onChange={(event) => filter.onChange(event.target.value)}
            className="h-9 min-w-[126px] rounded-lg border border-violet-300 bg-white px-3 text-xs font-medium text-slate-700 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          >
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : null}
      </div>

      {type === 'donut' ? <DonutPlaceholder /> : null}
      {type === 'line' ? <JobTrendsChart /> : null}
      {type === 'bars' ? <ChartBars values={bars} /> : null}
      {type === 'task-completion' ? (
        <TaskCompletionChart data={taskCompletionData} />
      ) : null}
    </article>
  );
}

export default ChartCard;
