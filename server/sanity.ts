import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || "production";

if (!projectId) {
  console.warn("Warning: SANITY_PROJECT_ID is not set. Sanity queries will return empty results.");
}

export const sanityClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function fetchBlogs() {
  if (!projectId) return [];
  try {
    const query = `*[_type == "blog"] | order(publishedAt desc) {
      _id,
      _type,
      title,
      "slug": slug.current,
      mainImage {
        asset,
        hotspot,
        crop
      },
      body,
      publishedAt
    }`;
    const results = await sanityClient.fetch(query);
    return results.map((blog: any) => ({
      ...blog,
      body: extractPlainText(blog.body),
    }));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function fetchBlogBySlug(slug: string) {
  if (!projectId) return undefined;
  try {
    const query = `*[_type == "blog" && slug.current == $slug][0] {
      _id,
      _type,
      title,
      "slug": slug.current,
      mainImage {
        asset,
        hotspot,
        crop
      },
      body,
      publishedAt
    }`;
    const result = await sanityClient.fetch(query, { slug });
    if (!result) return undefined;
    return {
      ...result,
      body: extractPlainText(result.body),
    };
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return undefined;
  }
}

export async function fetchMeetings() {
  if (!projectId) return [];
  try {
    const query = `*[_type == "meeting"] | order(dateTime desc) {
      _id,
      _type,
      title,
      dateTime,
      location,
      description
    }`;
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Error fetching meetings:", error);
    return [];
  }
}

export async function fetchGalleries() {
  if (!projectId) return [];
  try {
    const query = `*[_type == "gallery"] {
      _id,
      _type,
      title,
      images[] {
        asset,
        hotspot,
        crop,
        caption
      }
    }`;
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Error fetching galleries:", error);
    return [];
  }
}

function extractPlainText(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .filter((block: any) => block._type === "block")
    .map((block: any) => {
      if (block.children) {
        return block.children
          .map((child: any) => child.text || "")
          .join("");
      }
      return "";
    })
    .join("\n\n");
}
