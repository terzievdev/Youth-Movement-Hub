import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.SANITY_PROJECT_ID || "";
const dataset = process.env.SANITY_DATASET || "production";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function fetchBlogs() {
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
