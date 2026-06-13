const activities = [
  'New client profile created',
  'Financial report reviewed',
  'Job moved to in progress',
  'Compliance item updated'
];

function ActivityCard() {
  return (
    <article className="h-full rounded-xl bg-white p-5 shadow-md shadow-slate-200/80">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
        <p className="mt-1 text-xs font-normal text-slate-500">
          Latest workspace updates
        </p>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity} className="flex gap-3">
            <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-xs font-medium text-violet-700">
              {index + 1}
            </span>
            <div>
              <p className="text-sm font-medium text-slate-800">{activity}</p>
              <p className="mt-1 text-xs font-normal text-slate-400">
                Static dashboard placeholder
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export default ActivityCard;
