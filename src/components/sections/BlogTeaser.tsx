import Link from "next/link";
import { getPublishedPosts } from "@/lib/blog/repository";
import { blogCategoryLabels } from "@/lib/blog/categories";
import { formatDate } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

export function BlogTeaser() {
  const posts = getPublishedPosts().slice(0, 3);
  if (!posts.length) return null;

  const [featured, ...rest] = posts;

  return (
    <section className="section-pad bg-white">
      <Container>
        <div className="flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-xl text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Materiały dla zakupów B2B
          </h2>
          <Link href="/blog" className="text-sm font-semibold text-navy hover:text-brand">
            Wszystkie artykuły
          </Link>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="border-b border-border pb-10 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              {blogCategoryLabels[featured.category]}
            </p>
            <h3 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              <Link href={`/blog/${featured.slug}`} className="hover:text-brand">
                {featured.title}
              </Link>
            </h3>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              {featured.description}
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted">
              <time dateTime={featured.publishedAt}>
                {formatDate(featured.publishedAt)}
              </time>
              <span>{featured.readingTimeMinutes} min</span>
            </div>
          </article>

          <div className="space-y-0 divide-y divide-border">
            {rest.map((post) => (
              <article key={post.slug} className="py-6 first:pt-0">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                  {blogCategoryLabels[post.category]}
                </p>
                <h3 className="mt-3 text-xl font-bold text-navy">
                  <Link href={`/blog/${post.slug}`} className="hover:text-brand">
                    {post.title}
                  </Link>
                </h3>
                <time
                  dateTime={post.publishedAt}
                  className="mt-3 block text-sm text-muted"
                >
                  {formatDate(post.publishedAt)}
                </time>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
