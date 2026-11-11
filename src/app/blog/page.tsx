import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogCategories, blogCategoryLabels } from "@/lib/blog/categories";
import { getPublishedPosts, searchPosts } from "@/lib/blog/repository";
import { createMetadata } from "@/lib/seo/metadata";
import { formatDate } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Blog",
  description:
    "Artykuły ALOPAK dla firm: opakowania aluminiowe, folie, zakupy B2B i przygotowanie zapytań ofertowych.",
  path: "/blog",
});

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const query = params.q || "";
  const posts = query ? searchPosts(query) : getPublishedPosts();

  return (
    <section className="section-pad bg-white">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Strona główna", href: "/" },
            { label: "Blog" },
          ]}
        />
        <SectionHeading
          eyebrow="Blog"
          title="Wiedza dla zakupów B2B"
          description="Materiały pomagające przygotować zapytanie i ocenić ofertę opakowań oraz folii."
        />

        <form className="mt-8 flex flex-col gap-3 sm:flex-row" action="/blog" method="get">
          <label htmlFor="q" className="sr-only">
            Szukaj artykułów
          </label>
          <input
            id="q"
            name="q"
            defaultValue={query}
            placeholder="Szukaj artykułów..."
            className="w-full rounded-md border border-border px-4 py-2.5 text-sm"
          />
          <button
            type="submit"
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white"
          >
            Szukaj
          </button>
        </form>

        <div className="mt-6 flex flex-wrap gap-2">
          {blogCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/blog/kategoria/${category.slug}`}
              className="rounded-md border border-border px-3 py-1.5 text-sm text-ink hover:border-primary/30"
            >
              {category.name}
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="border-t border-border pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-dark">
                {blogCategoryLabels[post.category]}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-ink">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{post.description}</p>
              <div className="mt-4 flex items-center justify-between text-sm text-muted">
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                <span>{post.readingTimeMinutes} min</span>
              </div>
            </article>
          ))}
        </div>

        {!posts.length ? (
          <p className="mt-10 text-muted">Brak artykułów dla podanego zapytania.</p>
        ) : null}
      </Container>
    </section>
  );
}
