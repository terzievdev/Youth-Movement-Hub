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
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function fetchBlogs() {
  if (!projectId) return [];
  const query = `*[_type == "blog"] | order(publishedAt desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    mainImage,
    "body": pt::text(body),
    publishedAt
  }`;
  return sanityClient.fetch(query);
}

export async function fetchBlogBySlug(slug: string) {
  if (!projectId) return undefined;
  const query = `*[_type == "blog" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    mainImage,
    "body": pt::text(body),
    publishedAt
  }`;
  return sanityClient.fetch(query, { slug });
}

export async function fetchMeetings() {
  if (!projectId) return [];
  const query = `*[_type == "meeting"] | order(dateTime desc) {
    _id,
    _type,
    title,
    dateTime,
    location,
    description
  }`;
  return sanityClient.fetch(query);
}

export async function fetchGalleries() {
  if (!projectId) return [];
  const query = `*[_type == "gallery"] {
    _id,
    _type,
    title,
    images[] {
      asset,
      caption
    }
  }`;
  return sanityClient.fetch(query);
}
