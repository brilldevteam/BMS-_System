function FieldLabel({
  children,
  required = false,
  optional = false,
  optionalText = 'Optional',
  className = ''
}) {
  return (
    <span className={`text-xs font-medium text-slate-900 ${className}`}>
      {children}
      {required ? <span className="ml-1 text-rose-600">*</span> : null}
      {optional ? (
        <span className="ml-1 text-[11px] font-normal text-slate-500">
          ({optionalText})
        </span>
      ) : null}
    </span>
  );
}

export default FieldLabel;
