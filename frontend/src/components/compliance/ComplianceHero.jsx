import { ShieldCheck } from 'lucide-react';

function ComplianceHero() {
  return (
    <section className="rounded-[28px] bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-900 px-6 py-14 text-center text-white shadow-lg shadow-purple-200/50 sm:px-10 sm:py-16 lg:py-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-white shadow-xl shadow-purple-950/10">
          <ShieldCheck className="h-10 w-10" />
        </div>
        <h1 className="mt-7 text-3xl font-bold tracking-normal sm:text-5xl">
          Compliance Management
        </h1>
        <p className="mt-5 max-w-3xl text-sm font-normal leading-7 text-white/95 sm:text-lg">
          Comprehensive compliance management system to ensure regulatory
          adherence, risk mitigation, and operational excellence across your
          organization.
        </p>
      </div>
    </section>
  );
}

export default ComplianceHero;
