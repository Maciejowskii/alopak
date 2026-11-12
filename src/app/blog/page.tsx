import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { blogCategories, blogCategoryLabels } from "@/lib/blog/categories";
import { getPublishedPosts, searchPosts } from "@/lib/blog/repository";
import { createMetadata } from "@/lib/seo/metadata";
import { formatDate } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Blog",
  description:
    "Poradniki o puszkach aluminiowych i foliach. Pomoc przy przygotowaniu zapytania.",
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
  const [featured, ...rest] = posts;

  return (
    <section className="section-pad bg-white pt-12">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Strona główna", href: "/" },
            { label: "Blog" },
          ]}
        />
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Poradniki
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Materiały pomagające przygotować zapytanie i ocenić ofertę opakowań
          oraz folii.
        </p>

        <form className="mt-10 flex flex-col gap-3 sm:flex-row" action="/blog" method="get">
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

        {featured ? (
          <article className="mt-14 border-t border-border pt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-dark">
              {blogCategoryLabels[featured.category]}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              <Link href={`/blog/${featured.slug}`} className="hover:text-primary">
                {featured.title}
              </Link>
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
              {featured.description}
            </p>
            <div className="mt-5 flex gap-4 text-sm text-muted">
              <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
              <span>{featured.readingTimeMinutes} min</span>
            </div>
          </article>
        ) : null}

        <div className="mt-10 grid gap-0 divide-y divide-border border-t border-border md:grid-cols-2 md:gap-x-10 md:divide-y-0">
          {rest.map((post) => (
            <article key={post.slug} className="border-b border-border py-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-dark">
                {blogCategoryLabels[post.category]}
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-ink">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{post.description}</p>
              <time className="mt-4 block text-sm text-muted" dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
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
