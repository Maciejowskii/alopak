import type { ReactNode } from "react";
import type { Product, SpecValue } from "@/types";
import { cn } from "@/lib/utils";

const palette = {
  navy: "#0f2438",
  graphite: "#5c6975",
  aluminium: "#9aa8b4",
  bg: "#f3f5f7",
  rim: "#e8ecf0",
} as const;

const FONT = "system-ui, sans-serif";
const FS = 12;

function findSpec(specs: SpecValue[], pattern: RegExp): SpecValue | undefined {
  return specs.find((spec) => pattern.test(spec.label));
}

function formatSpec(spec: SpecValue | undefined, fallbackUnit?: string): string | null {
  if (!spec?.value) return null;
  const unit = spec.unit || fallbackUnit;
  return unit ? `${spec.value} ${unit}` : spec.value;
}

function parseSingleMm(value: string): number | null {
  const match = value.replace(",", ".").match(/[\d.]+/);
  if (!match) return null;
  const n = parseFloat(match[0]);
  return Number.isFinite(n) ? n : null;
}

function parsePairMm(value: string): [number, number] | null {
  const parts = value.split(/[×x]/i).map((p) => parseSingleMm(p.trim()));
  if (parts.length >= 2 && parts[0] != null && parts[1] != null) return [parts[0], parts[1]];
  return null;
}

function isFoilProduct(product: Product) {
  return product.category === "folia-fryzjerska" || product.category === "folia-spozywcza";
}

function isRectangularProfile(product: Product, outer?: SpecValue) {
  const shape = product.shape;
  if (shape === "rectangular" || shape === "square") return true;
  const raw = outer?.value ?? "";
  return /[×x]/i.test(raw);
}

type DrawingSpecs = {
  capacity: string | null;
  outer: string | null;
  height: string | null;
  bottom: string | null;
  outerRaw: string | null;
  heightMm: number | null;
  outerMm: number | null;
  bottomMm: number | null;
  outerPairMm: [number, number] | null;
  bottomPairMm: [number, number] | null;
};

function readDrawingSpecs(product: Product): DrawingSpecs {
  const specs = product.specifications;
  const capacitySpec = findSpec(specs, /pojemność/i);
  const outerSpec = findSpec(specs, /(wymiar|średnica).*zewn/i);
  const heightSpec = findSpec(specs, /wysokość/i);
  const bottomSpec = findSpec(specs, /(wymiar|średnica).*dn/i);

  const outerRaw = outerSpec?.value ?? null;
  const heightRaw = heightSpec?.value ?? null;
  const bottomRaw = bottomSpec?.value ?? null;

  return {
    capacity: formatSpec(capacitySpec, "ml"),
    outer: formatSpec(outerSpec, "mm"),
    height: formatSpec(heightSpec, "mm"),
    bottom: formatSpec(bottomSpec, "mm"),
    outerRaw,
    heightMm: heightRaw ? parseSingleMm(heightRaw) : null,
    outerMm: outerRaw ? parseSingleMm(outerRaw.split(/[×x]/i)[0] ?? outerRaw) : null,
    bottomMm: bottomRaw ? parseSingleMm(bottomRaw.split(/[×x]/i)[0] ?? bottomRaw) : null,
    outerPairMm: outerRaw ? parsePairMm(outerRaw) : null,
    bottomPairMm: bottomRaw ? parsePairMm(bottomRaw) : null,
  };
}

function DimH({
  x1,
  x2,
  y,
  label,
  tick = 5,
}: {
  x1: number;
  x2: number;
  y: number;
  label: string;
  tick?: number;
}) {
  const mx = (x1 + x2) / 2;
  return (
    <g fill="none" stroke={palette.graphite} strokeWidth="1">
      <line x1={x1} y1={y} x2={x2} y2={y} />
      <line x1={x1} y1={y - tick} x2={x1} y2={y + tick} strokeWidth="1.25" />
      <line x1={x2} y1={y - tick} x2={x2} y2={y + tick} strokeWidth="1.25" />
      <text x={mx} y={y - 5} textAnchor="middle" fontSize={FS} fontFamily={FONT} fill={palette.navy}>
        {label}
      </text>
    </g>
  );
}

function DimV({
  x,
  y1,
  y2,
  label,
  tick = 5,
  labelDx = 4,
}: {
  x: number;
  y1: number;
  y2: number;
  label: string;
  tick?: number;
  labelDx?: number;
}) {
  const my = (y1 + y2) / 2;
  return (
    <g fill="none" stroke={palette.graphite} strokeWidth="1">
      <line x1={x} y1={y1} x2={x} y2={y2} />
      <line x1={x - tick} y1={y1} x2={x + tick} y2={y1} strokeWidth="1.25" />
      <line x1={x - tick} y1={y2} x2={x + tick} y2={y2} strokeWidth="1.25" />
      <text
        x={x + labelDx}
        y={my + 4}
        textAnchor="start"
        fontSize={FS}
        fontFamily={FONT}
        fill={palette.navy}
      >
        {label}
      </text>
    </g>
  );
}

function SvgFrame({ ariaLabel, children }: { ariaLabel: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 480 320" className="h-full w-full" role="img" aria-label={ariaLabel}>
      <rect width="480" height="320" fill={palette.bg} />
      {children}
    </svg>
  );
}

function FoilRollDrawing({ product, ariaLabel }: { product: Product; ariaLabel: string }) {
  const widthSpec = findSpec(product.specifications, /szerokość/i);
  const lengthSpec = findSpec(product.specifications, /długość/i);
  const widthLabel = formatSpec(widthSpec, "cm") ?? "szerokość rolki";
  const lengthLabel = formatSpec(lengthSpec, "m");

  const rollCx = 128;
  const rollCy = 172;

  return (
    <SvgFrame ariaLabel={ariaLabel}>
      <text
        x={240}
        y={30}
        textAnchor="middle"
        fontSize={FS}
        fontWeight="600"
        fontFamily={FONT}
        fill={palette.navy}
      >
        {product.name}
      </text>
      <ellipse
        cx={rollCx}
        cy={rollCy}
        rx={78}
        ry={94}
        fill={palette.rim}
        stroke={palette.navy}
        strokeWidth="2"
      />
      <ellipse
        cx={rollCx}
        cy={rollCy}
        rx={30}
        ry={38}
        fill={palette.bg}
        stroke={palette.graphite}
        strokeWidth="1.5"
      />
      <path
        d="M206 148 Q248 138 290 142 L418 142"
        fill="none"
        stroke={palette.aluminium}
        strokeWidth="36"
        strokeLinecap="round"
      />
      <path
        d="M206 148 Q248 138 290 142 L418 142"
        fill="none"
        stroke={palette.navy}
        strokeWidth="1.5"
      />
      <path
        d="M230 128 C280 118 330 116 380 118"
        fill="none"
        stroke={palette.graphite}
        strokeWidth="1"
        opacity="0.65"
      />
      <DimH x1={206} x2={418} y={112} label={widthLabel} />
      {lengthLabel ? (
        <text x={368} y={198} textAnchor="middle" fontSize={FS} fontFamily={FONT} fill={palette.navy}>
          L: {lengthLabel}
        </text>
      ) : null}
    </SvgFrame>
  );
}

function RoundCanDrawing({ specs, ariaLabel }: { specs: DrawingSpecs; ariaLabel: string }) {
  const outerMm = specs.outerMm ?? 70;
  const heightMm = specs.heightMm ?? 28;
  const bottomMm = specs.bottomMm ?? outerMm * 0.86;

  const pxPerMm = 1.35;
  const topRx = Math.min(72, Math.max(48, outerMm * pxPerMm * 0.55));
  const bottomRx = Math.min(topRx, Math.max(topRx * 0.78, bottomMm * pxPerMm * 0.55));
  const topRy = Math.max(7, topRx * 0.22);
  const heightPx = Math.min(132, Math.max(52, heightMm * pxPerMm * 1.65));

  const cx = 188;
  const topY = 78;
  const bottomY = topY + heightPx;
  const flangeBoost = 5;

  const outerLabel = specs.outer ?? `Ø ${outerMm} mm`;
  const heightLabel = specs.height ?? `${heightMm} mm`;
  const bottomLabel = specs.bottom ?? `Ø ${bottomMm} mm`;

  const insetCx = 388;
  const insetCy = 108;
  const insetR = 44;

  return (
    <SvgFrame ariaLabel={ariaLabel}>
      <text
        x={240}
        y={28}
        textAnchor="middle"
        fontSize={FS}
        fontWeight="600"
        fontFamily={FONT}
        fill={palette.navy}
      >
        {specs.capacity ? `Pojemność ${specs.capacity}` : "Puszka cylindryczna"}
      </text>

      <g stroke={palette.navy} strokeWidth="2" fill={palette.aluminium}>
        <ellipse
          cx={cx}
          cy={topY - 2}
          rx={topRx + flangeBoost}
          ry={topRy + 3}
          fill={palette.rim}
        />
        <path
          d={[
            `M ${cx - topRx - 1} ${topY}`,
            `L ${cx - bottomRx} ${bottomY}`,
            `A ${bottomRx} ${topRy} 0 0 0 ${cx + bottomRx} ${bottomY}`,
            `L ${cx + topRx + 1} ${topY}`,
            "Z",
          ].join(" ")}
          opacity={0.96}
        />
        <ellipse cx={cx} cy={topY} rx={topRx} ry={topRy} fill={palette.rim} />
        <ellipse
          cx={cx}
          cy={bottomY}
          rx={bottomRx}
          ry={topRy * 0.85}
          fill="none"
          stroke={palette.graphite}
          strokeWidth="1.25"
        />
      </g>

      <line
        x1={cx - topRx * 0.72}
        y1={topY + 6}
        x2={cx - bottomRx * 0.72}
        y2={bottomY - 4}
        stroke={palette.graphite}
        strokeWidth="0.75"
        opacity="0.35"
      />

      <DimH
        x1={cx - topRx}
        x2={cx + topRx}
        y={52}
        label={outerLabel.includes("Ø") ? outerLabel : `Ø ${outerLabel}`}
      />
      <DimV x={cx + topRx + 28} y1={topY} y2={bottomY} label={heightLabel} />
      <DimH
        x1={cx - bottomRx}
        x2={cx + bottomRx}
        y={bottomY + 22}
        label={bottomLabel.includes("Ø") ? bottomLabel : `Ø ${bottomLabel}`}
      />

      <g>
        <rect
          x={318}
          y={56}
          width={140}
          height={118}
          rx={6}
          fill={palette.rim}
          stroke={palette.graphite}
          strokeWidth="1"
        />
        <text
          x={388}
          y={74}
          textAnchor="middle"
          fontSize={FS}
          fontFamily={FONT}
          fill={palette.graphite}
        >
          Widok z góry
        </text>
        <circle
          cx={insetCx}
          cy={insetCy}
          r={insetR}
          fill={palette.aluminium}
          stroke={palette.navy}
          strokeWidth="1.75"
        />
        <circle cx={insetCx} cy={insetCy} r={insetR * 0.55} fill="none" stroke={palette.graphite} strokeWidth="1" />
        <line
          x1={insetCx - insetR}
          y1={insetCy}
          x2={insetCx + insetR}
          y2={insetCy}
          stroke={palette.graphite}
          strokeWidth="0.75"
          opacity="0.5"
        />
        <line
          x1={insetCx}
          y1={insetCy - insetR}
          x2={insetCx}
          y2={insetCy + insetR}
          stroke={palette.graphite}
          strokeWidth="0.75"
          opacity="0.5"
        />
        <DimH x1={insetCx - insetR} x2={insetCx + insetR} y={164} label={outerLabel} />
      </g>
    </SvgFrame>
  );
}

function roundedRectPath(x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  return [
    `M ${x + rr} ${y}`,
    `H ${x + w - rr}`,
    `Q ${x + w} ${y} ${x + w} ${y + rr}`,
    `V ${y + h - rr}`,
    `Q ${x + w} ${y + h} ${x + w - rr} ${y + h}`,
    `H ${x + rr}`,
    `Q ${x} ${y + h} ${x} ${y + h - rr}`,
    `V ${y + rr}`,
    `Q ${x} ${y} ${x + rr} ${y}`,
    "Z",
  ].join(" ");
}

function RectangularCanDrawing({ specs, ariaLabel }: { specs: DrawingSpecs; ariaLabel: string }) {
  const pair = specs.outerPairMm ?? [88, 83];
  const [wMm, dMm] = pair;
  const heightMm = specs.heightMm ?? 34;
  const bottomPair = specs.bottomPairMm;

  const scale = 1.05;
  const frontW = Math.min(118, wMm * scale * 0.95);
  const frontH = Math.min(120, heightMm * scale * 2.1);
  const depthSkew = Math.min(38, dMm * scale * 0.38);
  const corner = 10;

  const fx = 72;
  const fy = 86;
  const topY = fy;
  const bottomY = fy + frontH;

  const outerLabel =
    specs.outer ??
    (specs.outerRaw ? `${specs.outerRaw} mm` : `${wMm}×${dMm} mm`);
  const heightLabel = specs.height ?? `${heightMm} mm`;
  const bottomLabel =
    specs.bottom ??
    (bottomPair ? `${bottomPair[0]}×${bottomPair[1]} mm` : null);

  const insetX = 300;
  const insetY = 58;
  const insetW = 150;
  const insetH = 118;
  const planW = 98;
  const planH = Math.min(78, (dMm / wMm) * planW);
  const planCx = insetX + insetW / 2;
  const planCy = insetY + 58;
  const planX = planCx - planW / 2;
  const planY = planCy - planH / 2;
  const planR = 8;

  return (
    <SvgFrame ariaLabel={ariaLabel}>
      <text
        x={240}
        y={28}
        textAnchor="middle"
        fontSize={FS}
        fontWeight="600"
        fontFamily={FONT}
        fill={palette.navy}
      >
        {specs.capacity ? `Pojemność ${specs.capacity}` : "Puszka prostokątna"}
      </text>

      <g stroke={palette.navy} strokeWidth="2" fill={palette.aluminium}>
        <path
          d={[
            `M ${fx + depthSkew} ${topY - depthSkew * 0.55}`,
            `L ${fx + frontW + depthSkew} ${topY - depthSkew * 0.55}`,
            `L ${fx + frontW} ${topY}`,
            `L ${fx} ${topY}`,
            "Z",
          ].join(" ")}
          fill={palette.rim}
        />
        <path
          d={[
            `M ${fx + frontW} ${topY}`,
            `L ${fx + frontW + depthSkew} ${topY - depthSkew * 0.55}`,
            `L ${fx + frontW + depthSkew} ${bottomY - depthSkew * 0.55}`,
            `L ${fx + frontW} ${bottomY}`,
            "Z",
          ].join(" ")}
          fill={palette.graphite}
          opacity={0.35}
        />
        <path d={roundedRectPath(fx, topY, frontW, frontH, corner)} />
        <rect
          x={fx - 2}
          y={topY - 5}
          width={frontW + 4}
          height={7}
          rx={3}
          fill={palette.rim}
          stroke={palette.navy}
          strokeWidth="1.5"
        />
        <path
          d={roundedRectPath(fx + 4, bottomY - 6, frontW - 8, 5, 2)}
          fill="none"
          stroke={palette.graphite}
          strokeWidth="1.25"
        />
      </g>

      <DimH
        x1={fx}
        x2={fx + frontW}
        y={bottomY + 20}
        label={
          specs.outerRaw
            ? `${specs.outerRaw.split(/[×x]/i)[0]?.trim() ?? wMm} mm`
            : `${wMm} mm`
        }
      />
      <DimV x={fx + frontW + 36} y1={topY} y2={bottomY} label={heightLabel} />
      {bottomLabel ? (
        <text x={fx} y={bottomY + 44} fontSize={FS} fontFamily={FONT} fill={palette.navy}>
          Dno: {bottomLabel}
        </text>
      ) : null}

      <g>
        <rect
          x={insetX}
          y={insetY}
          width={insetW}
          height={insetH}
          rx={6}
          fill={palette.rim}
          stroke={palette.graphite}
          strokeWidth="1"
        />
        <text
          x={planCx}
          y={insetY + 16}
          textAnchor="middle"
          fontSize={FS}
          fontFamily={FONT}
          fill={palette.graphite}
        >
          Widok z góry
        </text>
        <path
          d={roundedRectPath(planX, planY, planW, planH, planR)}
          fill={palette.aluminium}
          stroke={palette.navy}
          strokeWidth="1.75"
        />
        {bottomPair ? (
          <path
            d={roundedRectPath(
              planX + (planW * (1 - bottomPair[0] / wMm)) / 2,
              planY + (planH * (1 - bottomPair[1] / dMm)) / 2,
              planW * (bottomPair[0] / wMm),
              planH * (bottomPair[1] / dMm),
              planR - 2,
            )}
            fill="none"
            stroke={palette.graphite}
            strokeWidth="1"
          />
        ) : null}
        <DimH x1={planX} x2={planX + planW} y={planY + planH + 14} label={outerLabel} />
        <DimV
          x={planX - 10}
          y1={planY}
          y2={planY + planH}
          label={
            specs.outerRaw?.split(/[×x]/i)[1]?.trim()
              ? `${specs.outerRaw.split(/[×x]/i)[1].trim()} mm`
              : `${dMm} mm`
          }
          labelDx={-52}
        />
      </g>
    </SvgFrame>
  );
}

export function CanTechDrawing({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const ariaLabel = `Rysunek techniczny: ${product.name}`;

  if (isFoilProduct(product)) {
    return (
      <div className={cn("h-full w-full", className)}>
        <FoilRollDrawing product={product} ariaLabel={ariaLabel} />
      </div>
    );
  }

  const specs = readDrawingSpecs(product);
  const outerSpec = findSpec(product.specifications, /(wymiar|średnica).*zewn/i);
  const rectangular = isRectangularProfile(product, outerSpec);

  return (
    <div className={cn("h-full w-full", className)}>
      {rectangular ? (
        <RectangularCanDrawing specs={specs} ariaLabel={ariaLabel} />
      ) : (
        <RoundCanDrawing specs={specs} ariaLabel={ariaLabel} />
      )}
    </div>
  );
}
