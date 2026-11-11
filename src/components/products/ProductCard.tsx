import Link from "next/link";
import type { Product } from "@/types";
import { getCategory } from "@/data/categories";
import { SmartImage } from "@/components/ui/SmartImage";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white transition-all hover:-translate-y-0.5 hover:shadow-soft">
      <Link href={`/produkty/${product.slug}`} className="relative block aspect-[4/3] bg-surface">
        <SmartImage
          src={product.images[0]?.src || "/images/products/puszka-placeholder.svg"}
          alt={product.images[0]?.alt || product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        {category ? (
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-dark">
            {category.name}
          </p>
        ) : null}
        <h3 className="mt-2 text-lg font-semibold text-ink">
          <Link href={`/produkty/${product.slug}`} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {product.shortDescription}
        </p>
        <Link
          href={`/produkty/${product.slug}`}
          className="mt-4 text-sm font-semibold text-primary"
        >
          Zobacz szczegóły
        </Link>
      </div>
    </article>
  );
}
