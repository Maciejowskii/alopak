import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { blogCategories, blogCategoryLabels } from "@/lib/blog/categories";
import { getPostsByCategory } from "@/lib/blog/repository";
import { createMetadata } from "@/lib/seo/metadata";
import { formatDate } from "@/lib/utils";
import type { BlogCategorySlug } from "@/types";
import type { SlugPageProps } from "@/types/next";

export function generateStaticParams() {
  return blogCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: SlugPageProps) {
  const { slug } = await params;
  const label = blogCategoryLabels[slug as BlogCategorySlug];
  if (!label) return {};
  return createMetadata({
    title: `Blog — ${label}`,
    description: `Artykuły z kategorii ${label} na blogu ALOPAK.`,
    path: `/blog/kategoria/${slug}`,
  });
}

export default async function BlogCategoryPage({
  params,
}: SlugPageProps) {
  const { slug } = await params;
  const label = blogCategoryLabels[slug as BlogCategorySlug];
  if (!label) notFound();

  const posts = getPostsByCategory(slug as BlogCategorySlug);

  return (
    <section className="section-pad bg-white">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Strona główna", href: "/" },
            { label: "Blog", href: "/blog" },
            { label },
          ]}
        />
        <h1 className="text-4xl font-semibold tracking-tight text-ink">{label}</h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.slug} className="border-t border-border pt-5">
              <h2 className="text-xl font-semibold text-ink">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-3 text-sm text-muted">{post.description}</p>
              <time className="mt-4 block text-sm text-muted" dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </article>
          ))}
        </div>
        {!posts.length ? (
          <p className="mt-8 text-muted">Brak opublikowanych artykułów w tej kategorii.</p>
        ) : null}
      </Container>
    </section>
  );
}
