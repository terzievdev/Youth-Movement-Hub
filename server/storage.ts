import { type Blog, type Meeting, type Gallery } from "@shared/schema";

export interface IStorage {
  getBlogs(): Promise<Blog[]>;
  getBlogBySlug(slug: string): Promise<Blog | undefined>;
  getMeetings(): Promise<Meeting[]>;
  getGalleries(): Promise<Gallery[]>;
}

export class MemStorage implements IStorage {
  async getBlogs(): Promise<Blog[]> {
    return [];
  }

  async getBlogBySlug(slug: string): Promise<Blog | undefined> {
    return undefined;
  }

  async getMeetings(): Promise<Meeting[]> {
    return [];
  }

  async getGalleries(): Promise<Gallery[]> {
    return [];
  }
}

export const storage = new MemStorage();
