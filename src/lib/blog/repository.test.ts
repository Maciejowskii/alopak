import { describe, expect, it } from "vitest";
import { getPostBySlug, getPublishedPosts } from "@/lib/blog/repository";

describe("blog repository", () => {
  it("loads published posts with html", () => {
    const posts = getPublishedPosts();
    expect(posts.length).toBeGreaterThanOrEqual(3);
    expect(posts[0].html).toContain("<");
  });

  it("returns post by slug", () => {
    const post = getPostBySlug("puszki-aluminiowe-wybor-dostawcy");
    expect(post?.title).toMatch(/Puszki aluminiowe/i);
    expect(post?.headings.length).toBeGreaterThan(0);
  });

  it("renders GFM tables as HTML for foil article", () => {
    const post = getPostBySlug("folia-fryzjerska-dla-hurtowni");
    expect(post?.html).toContain("<table");
    expect(post?.html).toContain("<thead");
    expect(post?.html).toContain("<tbody");
    expect(post?.html).not.toMatch(/\|\s*Parametr\s*\|/);
  });
});

