import CardShell from "./CardShell";

export default function CardStat({ title, value, suffix = "", className = "" }) {
  return (
    <CardShell title={title} className={`h-[150px] flex flex-col ${className}`}>
      <div className="flex-1 flex items-center">
        <span className="text-4xl font-extrabold tracking-tight text-[#002F6C]">
          {value}
          {suffix && <span className="text-xl align-top ml-1">{suffix}</span>}
        </span>
      </div>
    </CardShell>
  );
}