import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const analyses = pgTable("analyses", {
  id: serial("id").primaryKey(),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(),
  fileSize: integer("file_size").notNull(),
  duration: text("duration"), // e.g. "0:15"
  faceScore: integer("face_score").notNull(),
  audioScore: integer("audio_score").notNull(),
  metadataScore: integer("metadata_score").notNull(),
  overallScore: integer("overall_score").notNull(),
  verdict: text("verdict").notNull(), // "Authentic", "Suspicious", "Likely Manipulated"
  explanation: text("explanation").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAnalysisSchema = createInsertSchema(analyses).omit({ 
  id: true, 
  createdAt: true 
});

export type Analysis = typeof analyses.$inferSelect;
export type InsertAnalysis = z.infer<typeof insertAnalysisSchema>;

// Request type for the analysis (file upload is handled via FormData, but this helps for typing the response)
export type AnalyzeResponse = Analysis;
