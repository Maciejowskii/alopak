import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPublishedPosts } from "@/lib/blog/repository";
import { formatDate } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogCategoryLabels } from "@/lib/blog/categories";

export function BlogTeaser() {
  const posts = getPublishedPosts().slice(0, 3);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="section-pad bg-white">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Blog"
            title="Wiedza dla działów zakupów i zaopatrzenia"
            description="Artykuły wspierające przygotowanie zapytań ofertowych i ocenę dostawców."
          />
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Wszystkie artykuły
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 70}>
              <article className="flex h-full flex-col border-t border-border pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-dark">
                  {blogCategoryLabels[post.category]}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {post.description}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3 text-sm">
                  <time dateTime={post.publishedAt} className="text-muted">
                    {formatDate(post.publishedAt)}
                  </time>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-semibold text-primary"
                  >
                    Czytaj artykuł
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
