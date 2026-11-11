import type { SpecValue } from "@/types";

export function SpecTable({ specs }: { specs: SpecValue[] }) {
  if (!specs.length) return null;

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-surface">
          <tr>
            <th className="px-4 py-3 font-semibold text-ink">Parametr</th>
            <th className="px-4 py-3 font-semibold text-ink">Wartość</th>
          </tr>
        </thead>
        <tbody>
          {specs.map((spec) => (
            <tr key={spec.label} className="border-t border-border">
              <td className="px-4 py-3 text-muted">{spec.label}</td>
              <td className="px-4 py-3 font-medium text-ink">
                {spec.value}
                {spec.unit ? ` ${spec.unit}` : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
