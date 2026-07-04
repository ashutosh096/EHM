import dotenv from "dotenv";
dotenv.config();

import https from "https";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { AuthAdminRouter } from "./routes/AuthAdmin";
import { BlogUserRouter } from "./routes/BlogUser";
import { BlogAdminRouter } from "./routes/BlogAdmin";
import { NewsletterUserRouter } from "./routes/NewsLetterUser";
import { NewsletterAdminRouter } from "./routes/NewsLetterAdmin";
import { ArticleAdminRouter } from "./routes/ArticleAdmin";
import { ArticleUserRouter } from "./routes/ArticleUser";
import { ContactUserRouter } from "./routes/ContactUser";
import { FootprintAdminRouter } from "./routes/FootprintAdmin";
import { FootprintUserRouter } from "./routes/FootprintUser";
import { CaseStudyAdminRouter } from "./routes/CaseStudyAdmin";
import { CaseStudyUserRouter } from "./routes/CaseStudyUser";
import VidUser from "./routes/VidUser";

const app = express();

// Trust reverse proxy (e.g. Render) to get the correct client IP for rate limiting
app.set("trust proxy", 1);

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ehmconsultancy.co.in",
      "https://www.ehmconsultancy.co.in",
      "https://ehm.vercel.app",
      "https://ehm-backend.onrender.com",
      "http://localhost:5000",
    ],
    methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Connect to MongoDB
async function connectDB() {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in the .env file");
    }
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (error: any) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
}

connectDB();

app.use(express.json());

app.use("/hello", (req, res) => { res.send("Hello World"); });

// Admin auth routes
app.use("/admin", AuthAdminRouter);

// Admin Blog routes
app.use("/admin", BlogAdminRouter);

// User Blog routes
app.use("/", BlogUserRouter);

// Admin case study routes
app.use("/admin", CaseStudyAdminRouter);

// User case study routes
app.use("/", CaseStudyUserRouter);

// Admin Article routes
app.use("/admin", ArticleAdminRouter);

// User Article routes
app.use("/", ArticleUserRouter);

// Serve static files from uploads folder
app.use("/uploads", express.static(path.resolve("uploads")));

// User newsletter route
app.use("/", NewsletterUserRouter);

// Admin newsletter route
app.use("/admin", NewsletterAdminRouter);

// User Contact route
app.use("/", ContactUserRouter);

// Admin footprint route
app.use("/admin", FootprintAdminRouter);

// User footprint route
app.use("/", FootprintUserRouter);

app.use("/videos", VidUser);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // Self-ping keep-alive to prevent sleeping on Render free tier
  if (process.env.RENDER === "true") {
    const rawExternalUrl = process.env.RENDER_EXTERNAL_URL || "https://ehm-backend.onrender.com";
    const externalUrl = rawExternalUrl.endsWith("/") ? rawExternalUrl.slice(0, -1) : rawExternalUrl;
    const PING_URL = `${externalUrl}/hello`;

    console.log(`[Keep-Alive] Initializing self-ping keep-alive targeting: ${PING_URL}`);
    
    // Initial ping after 5 seconds to wake up/confirm active status
    setTimeout(() => {
      https.get(PING_URL, (res) => {
        console.log(`[Keep-Alive] Startup ping response: ${res.statusCode}`);
      }).on("error", (err) => {
        console.error("[Keep-Alive] Startup ping failed:", err.message);
      });
    }, 5000);

    // Periodic ping every 10 minutes (600000ms) to keep it awake
    setInterval(() => {
      https.get(PING_URL, (res) => {
        console.log(`[Keep-Alive] Periodic ping response: ${res.statusCode}`);
      }).on("error", (err) => {
        console.error("[Keep-Alive] Periodic ping failed:", err.message);
      });
    }, 10 * 60 * 1000);
  }
});
