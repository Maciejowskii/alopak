import type { SpecValue } from "@/types";

/** Build full can specification set from official catalog numbers. */
export function canSpecs(input: {
  catalogNumber: string;
  capacityMl: string;
  outer: string;
  inner: string;
  height: string;
  bottom: string;
  lid: string;
  cartonPcs: string;
  palletCartons: string;
  palletPcs: string;
  round?: boolean;
}): SpecValue[] {
  const dimLabelOuter = input.round ? "Średnica zewnętrzna" : "Wymiar zewnętrzny";
  const dimLabelInner = input.round ? "Średnica wewnętrzna" : "Wymiar wewnętrzny";
  const dimLabelBottom = input.round ? "Średnica dna" : "Wymiar dna";

  return [
    { label: "Nr katalogowy", value: input.catalogNumber },
    { label: "Pojemność", value: input.capacityMl, unit: "ml" },
    { label: dimLabelOuter, value: input.outer.replace(/x/gi, "×"), unit: "mm" },
    { label: dimLabelInner, value: input.inner.replace(/x/gi, "×"), unit: "mm" },
    { label: "Wysokość", value: input.height, unit: "mm" },
    { label: dimLabelBottom, value: input.bottom.replace(/x/gi, "×"), unit: "mm" },
    {
      label: "Wymiar wieczka aluminiowego zgrzewanego do puszki",
      value: input.lid.replace(/x/gi, "×"),
      unit: "mm",
    },
    { label: "Sztuk w kartonie", value: input.cartonPcs, unit: "szt." },
    { label: "Kartonów na palecie", value: input.palletCartons },
    { label: "Sztuk na palecie", value: input.palletPcs.replace(/\s/g, " "), unit: "szt." },
  ];
}
