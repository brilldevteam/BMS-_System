import { Building2, Plus } from 'lucide-react';

function EmptyDocumentState({
  title = 'No Organizational Structures Yet',
  description = 'Start by adding your first organizational structure document',
  actionLabel = 'Add Structure'
}) {
  return (
    <section className="flex min-h-[465px] items-center justify-center rounded-[22px] border border-slate-100 bg-white px-6 py-16 text-center shadow-[0_16px_32px_-20px_rgba(15,23,42,0.35)] sm:min-h-[490px]">
      <div className="flex max-w-2xl flex-col items-center">
        <Building2
          className="h-[72px] w-[72px] text-slate-300"
          strokeWidth={1.55}
          aria-hidden="true"
        />
        <h2 className="mt-7 text-xl font-semibold text-slate-800 sm:text-2xl">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
          {description}
        </p>
        <button
          type="button"
          className="mt-8 inline-flex h-14 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-8 text-base font-semibold text-white shadow-lg shadow-orange-200/80 transition hover:-translate-y-0.5 hover:from-amber-600 hover:to-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-100"
        >
          <Plus className="h-5 w-5" />
          {actionLabel}
        </button>
      </div>
    </section>
  );
}

export default EmptyDocumentState;
