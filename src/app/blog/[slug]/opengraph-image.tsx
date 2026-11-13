import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/blog/repository";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts()
    .filter((post) => !post.draft)
    .map((post) => ({ slug: post.slug }));
}

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return [
    {
      id: "default",
      size,
      contentType,
      alt: post?.title ?? "Artykuł ALOPAK",
    },
  ];
}

export default async function BlogOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title ?? "Artykuł ALOPAK";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0f2438",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          ALOPAK · BLOG
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
      </div>
    ),
    { ...size },
  );
}
