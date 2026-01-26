import { fetchBlogs, fetchBlogBySlug, fetchMeetings, fetchGalleries } from "./sanity";
import { type Blog, type Meeting, type Gallery } from "@shared/schema";

export interface IStorage {
  getBlogs(): Promise<Blog[]>;
  getBlogBySlug(slug: string): Promise<Blog | undefined>;
  getMeetings(): Promise<Meeting[]>;
  getGalleries(): Promise<Gallery[]>;
}

export class SanityStorage implements IStorage {
  async getBlogs(): Promise<Blog[]> {
    return fetchBlogs();
  }

  async getBlogBySlug(slug: string): Promise<Blog | undefined> {
    return fetchBlogBySlug(slug);
  }

  async getMeetings(): Promise<Meeting[]> {
    return fetchMeetings();
  }

  async getGalleries(): Promise<Gallery[]> {
    return fetchGalleries();
  }
}

export const storage = new SanityStorage();
