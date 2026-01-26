import { z } from "zod";

export const blogSchema = z.object({
  _id: z.string(),
  _type: z.literal("blog"),
  title: z.string(),
  slug: z.string(),
  mainImage: z.object({
    asset: z.object({ _ref: z.string() }),
    alt: z.string().optional(),
  }).optional(),
  body: z.string().optional(),
  publishedAt: z.string(),
});

export const meetingSchema = z.object({
  _id: z.string(),
  _type: z.literal("meeting"),
  title: z.string(),
  dateTime: z.string(),
  location: z.string(),
  description: z.string().optional(),
});

export const galleryImageSchema = z.object({
  asset: z.object({ _ref: z.string() }),
  caption: z.string().optional(),
});

export const gallerySchema = z.object({
  _id: z.string(),
  _type: z.literal("gallery"),
  title: z.string(),
  images: z.array(galleryImageSchema),
});

export type Blog = z.infer<typeof blogSchema>;
export type Meeting = z.infer<typeof meetingSchema>;
export type Gallery = z.infer<typeof gallerySchema>;
export type GalleryImage = z.infer<typeof galleryImageSchema>;
