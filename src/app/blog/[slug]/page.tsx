import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/sections/CtaBand";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogCategoryLabels } from "@/lib/blog/categories";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog/repository";
import { createMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { formatDate } from "@/lib/utils";
import type { SlugPageProps } from "@/types/next";

export function generateStaticParams() {
  return getAllPosts()
    .filter((post) => !post.draft)
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: SlugPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return createMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.description,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: SlugPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Strona główna", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          articleSchema(post),
        ]}
      />

      <article className="section-pad bg-white">
        <Container className="grid gap-10 lg:grid-cols-[1fr_240px]">
          <div>
            <Breadcrumbs
              items={[
                { label: "Strona główna", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
            />
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-dark">
              {blogCategoryLabels[post.category]}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span>{post.readingTimeMinutes} min czytania</span>
              {post.author ? <span>{post.author}</span> : null}
            </div>
            <div
              className="prose-alopak mt-10 space-y-4 text-base leading-relaxed text-muted [&_a]:font-medium [&_a]:text-primary [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-border [&_th]:bg-surface [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-sm [&_th]:font-semibold [&_th]:text-ink [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:text-sm [&_td]:align-top [&_.table-wrap]:overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>

          <aside className="lg:pt-24">
            <div className="sticky top-24 rounded-lg border border-border bg-surface/50 p-5">
              <p className="text-sm font-semibold text-ink">Spis treści</p>
              <nav className="mt-4 space-y-2 text-sm">
                {post.headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className="block text-muted hover:text-primary"
                    style={{ paddingLeft: heading.level === 3 ? "0.75rem" : 0 }}
                  >
                    {heading.text}
                  </a>
                ))}
              </nav>
              {post.relatedProductCategory ? (
                <Link
                  href={`/oferta/${post.relatedProductCategory}`}
                  className="mt-6 inline-block text-sm font-semibold text-primary"
                >
                  Zobacz powiązaną kategorię
                </Link>
              ) : null}
            </div>
          </aside>
        </Container>
      </article>

      {related.length ? (
        <section className="section-pad surface-grid">
          <Container>
            <h2 className="text-2xl font-semibold text-ink">Powiązane artykuły</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="border-t border-border pt-4"
                >
                  <h3 className="font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.description}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBand
        title="Masz konkretne zapotrzebowanie?"
        description="Przejdź do formularza i opisz potrzeby swojej firmy."
      />
    </>
  );
}
