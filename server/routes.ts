import type { Express } from "express";
import { type Server } from "http";
import { fetchBlogs, fetchBlogBySlug, fetchMeetings, fetchGalleries, urlFor } from "./sanity";
import { sendContactEmail, sendPartnerEmail } from "./email";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get("/api/blogs", async (_req, res) => {
    try {
      const blogs = await fetchBlogs();
      res.json(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({ message: "Failed to fetch blogs" });
    }
  });

  app.get("/api/blogs/:slug", async (req, res) => {
    try {
      const blog = await fetchBlogBySlug(req.params.slug);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json(blog);
    } catch (error) {
      console.error("Error fetching blog:", error);
      res.status(500).json({ message: "Failed to fetch blog" });
    }
  });

  app.get("/api/meetings", async (_req, res) => {
    try {
      const meetings = await fetchMeetings();
      res.json(meetings);
    } catch (error) {
      console.error("Error fetching meetings:", error);
      res.status(500).json({ message: "Failed to fetch meetings" });
    }
  });

  app.get("/api/galleries", async (_req, res) => {
    try {
      const galleries = await fetchGalleries();
      res.json(galleries);
    } catch (error) {
      console.error("Error fetching galleries:", error);
      res.status(500).json({ message: "Failed to fetch galleries" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, topic, message } = req.body;
      
      if (!name || !email || !topic || !message) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const result = await sendContactEmail({ name, email, topic, message });
      
      if (result.success) {
        res.json({ message: "Message sent successfully" });
      } else {
        res.status(500).json({ message: "Failed to send message" });
      }
    } catch (error) {
      console.error("Error sending contact email:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  app.post("/api/partner", async (req, res) => {
    try {
      const { name, organization, email, partnerType, message } = req.body;
      
      if (!name || !organization || !email) {
        return res.status(400).json({ message: "Name, organization and email are required" });
      }

      const result = await sendPartnerEmail({ name, organization, email, partnerType, message });
      
      if (result.success) {
        res.json({ message: "Partner request sent successfully" });
      } else {
        res.status(500).json({ message: "Failed to send partner request" });
      }
    } catch (error) {
      console.error("Error sending partner email:", error);
      res.status(500).json({ message: "Failed to send partner request" });
    }
  });

  return httpServer;
}
