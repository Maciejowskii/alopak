import type { Product } from "@/types";
import { SmartImage } from "@/components/ui/SmartImage";
import { CanTechDrawing } from "@/components/products/CanTechDrawing";
import { cn } from "@/lib/utils";

function hasRealPhoto(product: Product): boolean {
  const src = product.images[0]?.src;
  if (!src) return false;
  return !src.includes("placeholder");
}

export function ProductImage({
  product,
  priority,
  className,
  sizes = "(max-width: 768px) 100vw, 33vw",
  fill = false,
}: {
  product: Product;
  priority?: boolean;
  className?: string;
  sizes?: string;
  fill?: boolean;
}) {
  const alt = product.images[0]?.alt || product.name;

  if (hasRealPhoto(product)) {
    return (
      <SmartImage
        src={product.images[0].src}
        alt={alt}
        fill={fill}
        priority={priority}
        sizes={sizes}
        className={className}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden bg-surface",
        fill && "absolute inset-0 h-full w-full",
        className,
      )}
    >
      <CanTechDrawing product={product} className="h-full w-full object-contain p-3 sm:p-4" />
    </div>
  );
}
