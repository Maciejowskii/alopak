import Link from "next/link";
import type { Product } from "@/types";
import { getCategory } from "@/data/categories";
import { ProductImage } from "@/components/products/ProductImage";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category);
  const contactHref = `/kontakt?produkt=${encodeURIComponent(product.slug)}&kategoria=${encodeURIComponent(product.category)}`;

  return (
    <article className="card-lift group flex h-full flex-col border border-border bg-white hover:border-brand/40">
      <Link href={`/produkty/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-aluminium">
        <ProductImage
          product={product}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06] motion-reduce:transition-none"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        {category ? (
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
            {category.name}
          </p>
        ) : null}
        <h3 className="mt-2 text-lg font-bold text-navy">
          <Link href={`/produkty/${product.slug}`} className="hover:text-brand">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {product.shortDescription}
        </p>
        {product.catalogNumber ? (
          <p className="mt-4 text-xs text-muted">Nr kat. {product.catalogNumber}</p>
        ) : null}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-semibold">
          <Link href={`/produkty/${product.slug}`} className="text-navy hover:underline">
            Zobacz
          </Link>
          <Link href={contactHref} className="text-brand hover:underline">
            Zapytaj
          </Link>
        </div>
      </div>
    </article>
  );
}
