function PermissionGroup({ group, selectedPermissions, onToggle }) {
  return (
    <section className="rounded-xl bg-slate-50 p-4">
      <h3 className="mb-3 text-sm font-medium text-slate-900">{group.title}</h3>

      <div className="space-y-2">
        {group.items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 rounded-lg bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="text-sm font-normal text-slate-800">{item.label}</span>

            {item.type === 'dual' ? (
              <div className="flex items-center gap-5">
                {['editor', 'viewer'].map((permissionType) => (
                  <label key={permissionType} className="flex items-center gap-2 text-xs text-slate-600">
                    <input
                      className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                      type="checkbox"
                      checked={Boolean(selectedPermissions[`${item.id}.${permissionType}`])}
                      onChange={() => onToggle(`${item.id}.${permissionType}`)}
                    />
                    {permissionType === 'editor' ? 'Editor' : 'Viewer'}
                  </label>
                ))}
              </div>
            ) : (
              <label className="flex items-center gap-2 text-xs text-slate-600">
                <input
                  className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                  type="checkbox"
                  checked={Boolean(selectedPermissions[item.id])}
                  onChange={() => onToggle(item.id)}
                />
                Enable
              </label>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default PermissionGroup;
