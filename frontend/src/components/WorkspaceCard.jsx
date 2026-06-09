const iconPaths = {
  dashboard: (
    <>
      <path d="M7 18V13" />
      <path d="M12 18V9" />
      <path d="M17 18V5" />
    </>
  ),
  compliance: (
    <>
      <path d="M12 3L19 6V11C19 15.5 16.2 18.6 12 20C7.8 18.6 5 15.5 5 11V6L12 3Z" />
      <path d="M9.5 11.5L11.25 13.25L15 9.5" />
    </>
  ),
  resource: (
    <>
      <path d="M7 3H14L18 7V21H7Z" />
      <path d="M14 3V8H18" />
      <path d="M10 13H15" />
      <path d="M10 17H14" />
    </>
  ),
  library: (
    <>
      <path d="M5 7H19L18 20H6Z" />
      <path d="M8 7L9 4H15L16 7" />
      <path d="M9 11H15" />
    </>
  )
};

function WorkspaceIcon({ icon, className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
    >
      {iconPaths[icon]}
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M5 12H19" />
      <path d="M13 6L19 12L13 18" />
    </svg>
  );
}

function WorkspaceCard({
  title,
  subtitle,
  description,
  features,
  buttonLabel,
  href = '#',
  icon,
  accent,
  background,
  shadow
}) {
  return (
    <article
      className={`relative overflow-hidden rounded-[22px] border border-white/80 ${background} p-8 shadow-xl ${shadow}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.08)_1px,transparent_0)] bg-[length:24px_24px] opacity-40" />

      <div className="relative">
        <div
          className={`mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${accent.gradient} text-white shadow-lg ${accent.iconShadow}`}
        >
          <WorkspaceIcon icon={icon} className="h-7 w-7" />
        </div>

        <h2 className="text-[26px] font-bold leading-tight text-slate-900">
          {title}
        </h2>
        <p className={`mt-2 text-sm font-semibold ${accent.text}`}>
          {subtitle}
        </p>
        <p className="mt-6 max-w-[33rem] text-[15px] leading-7 text-slate-600">
          {description}
        </p>

        <div className="mt-7 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-3 text-sm text-slate-700">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${accent.featureBg} ${accent.text}`}
              >
                <WorkspaceIcon icon={icon} className="h-4 w-4" />
              </span>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <a
          href={href}
          className={`mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r ${accent.gradient} px-5 text-sm font-bold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 ${accent.focus}`}
        >
          {buttonLabel}
          <ArrowIcon />
        </a>
      </div>
    </article>
  );
}

export default WorkspaceCard;
