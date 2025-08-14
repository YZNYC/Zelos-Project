export default function CardShell({ title, className = "", children, right }) {
  return (
    <div className={`bg-white rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] p-5 ${className}`}>
      {(title || right) && (
        <div className="flex items-start justify-between mb-3">
          {title ? (
            <h3 className="text-[15px] font-semibold text-gray-700">{title}</h3>
          ) : <span />}
          {right ? <div className="text-xs text-gray-400">{right}</div> : null}
        </div>
      )}
      {children}
    </div>
  );
}