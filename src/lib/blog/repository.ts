import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import type { Root } from "hast";
import type { BlogCategorySlug, BlogPostMeta } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export type BlogPost = BlogPostMeta & {
  content: string;
  html: string;
  headings: { id: string; text: string; level: number }[];
};

function collectText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const value = node as { value?: string; children?: unknown[] };
  if (typeof value.value === "string") return value.value;
  if (!Array.isArray(value.children)) return "";
  return value.children.map((child) => collectText(child)).join("").trim();
}

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
}

function readPostFile(filename: string): BlogPost | null {
  const fullPath = path.join(BLOG_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const slug = filename.replace(/\.mdx?$/, "");

  const meta: BlogPostMeta = {
    slug,
    title: String(data.title || slug),
    description: String(data.description || ""),
    category: data.category as BlogCategorySlug,
    publishedAt: String(data.publishedAt || ""),
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    author: data.author ? String(data.author) : undefined,
    draft: Boolean(data.draft),
    featured: Boolean(data.featured),
    relatedProductCategory: data.relatedProductCategory,
    seoTitle: data.seoTitle ? String(data.seoTitle) : undefined,
    seoDescription: data.seoDescription ? String(data.seoDescription) : undefined,
  };

  const stats = readingTime(content);
  meta.readingTimeMinutes = Math.max(1, Math.ceil(stats.minutes));

  const headings: BlogPost["headings"] = [];

  const processed = remark()
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(() => (tree: Root) => {
      visit(tree, "element", (node) => {
        if (!["h2", "h3"].includes(node.tagName)) return;
        const text = collectText(node);
        const id = String(node.properties?.id || "");
        if (text && id) {
          headings.push({
            id,
            text,
            level: node.tagName === "h2" ? 2 : 3,
          });
        }
      });
    })
    .use(rehypeStringify)
    .processSync(content);

  return {
    ...meta,
    content,
    html: String(processed),
    headings,
  };
}

export function getAllPostFiles() {
  ensureBlogDir();
  return fs
    .readdirSync(BLOG_DIR)
    .filter(
      (file) =>
        (file.endsWith(".md") || file.endsWith(".mdx")) &&
        !file.startsWith("_") &&
        file !== "BLOG_BRIEFS.md",
    );
}

export function getAllPosts(): BlogPost[] {
  return getAllPostFiles()
    .map((file) => readPostFile(file))
    .filter((post): post is BlogPost => Boolean(post))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getPublishedPosts(): BlogPost[] {
  return getAllPosts().filter((post) => !post.draft && post.publishedAt);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getPublishedPosts().find((post) => post.slug === slug);
}

export function getPostsByCategory(category: BlogCategorySlug): BlogPost[] {
  return getPublishedPosts().filter((post) => post.category === category);
}

export function searchPosts(query: string): BlogPost[] {
  const q = query.trim().toLowerCase();
  if (!q) return getPublishedPosts();
  return getPublishedPosts().filter(
    (post) =>
      post.title.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q),
  );
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return getPublishedPosts()
    .filter(
      (item) => item.slug !== post.slug && item.category === post.category,
    )
    .slice(0, limit);
}
