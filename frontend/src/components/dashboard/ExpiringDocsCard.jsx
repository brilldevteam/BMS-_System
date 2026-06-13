const documents = [
  { name: 'Trade License', date: 'Expires in 30 days', tone: 'bg-amber-50 text-amber-700' },
  { name: 'KYC Document', date: 'Expires in 45 days', tone: 'bg-rose-50 text-rose-700' },
  { name: 'Service Agreement', date: 'Expires in 60 days', tone: 'bg-blue-50 text-blue-700' }
];

function ExpiringDocsCard() {
  return (
    <article className="h-full rounded-xl bg-white p-5 shadow-md shadow-slate-200/80">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-900">
          Future Expiring Documents
        </h3>
        <p className="mt-1 text-xs font-normal text-slate-500">
          Upcoming document reminders
        </p>
      </div>

      <div className="space-y-3">
        {documents.map((document) => (
          <div
            key={document.name}
            className={`rounded-lg px-4 py-3 ${document.tone}`}
          >
            <p className="text-sm font-medium">{document.name}</p>
            <p className="mt-1 text-xs font-normal opacity-80">
              {document.date}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

export default ExpiringDocsCard;
