import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { insertAnalysisSchema } from "@shared/schema";
import multer from "multer";
import { z } from "zod";

const upload = multer({ storage: multer.memoryStorage() });

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.analyses.list.path, async (req, res) => {
    const analyses = await storage.getAnalyses();
    res.json(analyses);
  });

  app.get(api.analyses.get.path, async (req, res) => {
    const analysis = await storage.getAnalysis(Number(req.params.id));
    if (!analysis) {
      return res.status(404).json({ message: "Analysis not found" });
    }
    res.json(analysis);
  });

  app.post(api.analyses.analyze.path, upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Mock Analysis Logic
      // In a real app, this would use AI models. Here we simulate it.
      
      const fileSize = req.file.size;
      const fileName = req.file.originalname;
      const fileType = req.file.mimetype;
      
      // Deterministic simulation based on filename length to keep it consistent for demo
      // or just random for fun. Let's use random for the "Prototype" feel.
      
      const faceScore = Math.floor(Math.random() * 40) + 60; // 60-100 (mostly good)
      const audioScore = Math.floor(Math.random() * 100);    // 0-100
      const metadataScore = Math.floor(Math.random() * 100); // 0-100

      // Weighted calculation
      const overallScore = Math.round(
        (faceScore * 0.4) + 
        (audioScore * 0.4) + 
        (metadataScore * 0.2)
      );

      let verdict = "Suspicious";
      let explanation = "The analysis detected some inconsistencies in the media file.";

      if (overallScore >= 70) {
        verdict = "Verified Content";
        explanation = "High consistency across all checks. No signs of manipulation detected.";
      } else if (overallScore < 50) {
        verdict = "Possible Deepfake";
        explanation = "Major anomalies detected in audio-video synchronization and metadata headers.";
      } else {
        verdict = "Suspicious";
        explanation = "Some checks passed, but low confidence in metadata integrity.";
      }

      const analysisData = {
        fileName,
        fileType,
        fileSize,
        duration: "00:15", // Mock duration
        faceScore,
        audioScore,
        metadataScore,
        overallScore,
        verdict,
        explanation
      };

      const result = await storage.createAnalysis(analysisData);
      res.status(201).json(result);

    } catch (err) {
      console.error("Analysis error:", err);
      res.status(500).json({ message: "Failed to analyze file" });
    }
  });

  return httpServer;
}

// Seed function to be called in index.ts if needed, 
// but since we want to demonstrate the upload, we might not need pre-seeded data.
// We'll leave it empty or add one example.
export async function seedDatabase() {
  const existing = await storage.getAnalyses();
  if (existing.length === 0) {
    await storage.createAnalysis({
      fileName: "demo_video.mp4",
      fileType: "video/mp4",
      fileSize: 1024 * 1024 * 5,
      duration: "00:30",
      faceScore: 95,
      audioScore: 92,
      metadataScore: 88,
      overallScore: 92,
      verdict: "Verified Content",
      explanation: "Demo record: High consistency across all checks."
    });
  }
}
