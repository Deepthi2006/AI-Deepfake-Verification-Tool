import { type Analysis } from "@shared/schema";
import { ScoreGauge } from "./ScoreGauge";
import { MetricBar } from "./MetricBar";
import { ShieldCheck, ShieldAlert, AlertTriangle, Video, Mic, FileCode, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AnalysisResultProps {
  analysis: Analysis;
}

export function AnalysisResult({ analysis }: AnalysisResultProps) {
  const isAuthentic = analysis.verdict === "Authentic";
  const isSuspicious = analysis.verdict === "Suspicious";
  
  const StatusIcon = isAuthentic ? ShieldCheck : isSuspicious ? AlertTriangle : ShieldAlert;
  const statusColor = isAuthentic 
    ? "text-green-500 bg-green-500/10 border-green-500/20" 
    : isSuspicious 
      ? "text-yellow-500 bg-yellow-500/10 border-yellow-500/20" 
      : "text-red-500 bg-red-500/10 border-red-500/20";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header Result Card */}
      <Card className="p-8 border-l-4 overflow-hidden relative" style={{ borderLeftColor: isAuthentic ? "var(--success)" : isSuspicious ? "var(--warning)" : "var(--destructive)" }}>
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
          <ScoreGauge score={analysis.overallScore} label="Authenticity" size="lg" />
          
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div>
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-bold uppercase tracking-wide mb-3 ${statusColor}`}>
                <StatusIcon className="w-4 h-4" />
                {analysis.verdict}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display">{analysis.explanation.split('.')[0]}.</h2>
              <p className="text-muted-foreground mt-2 text-lg">
                File: <span className="text-foreground font-mono">{analysis.fileName}</span>
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Badge variant="outline" className="px-3 py-1 text-xs">
                {analysis.fileType}
              </Badge>
              <Badge variant="outline" className="px-3 py-1 text-xs">
                {(analysis.fileSize / 1024 / 1024).toFixed(2)} MB
              </Badge>
              {analysis.duration && (
                <Badge variant="outline" className="px-3 py-1 text-xs">
                  {analysis.duration}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {/* Decorative background blur */}
        <div 
          className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
        />
      </Card>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold font-display mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            Detection Metrics
          </h3>
          <div className="space-y-6">
            <MetricBar 
              label="Face Consistency" 
              score={analysis.faceScore} 
              icon={<Video className="w-4 h-4" />} 
            />
            <MetricBar 
              label="Audio-Video Sync" 
              score={analysis.audioScore} 
              icon={<Mic className="w-4 h-4" />} 
            />
            <MetricBar 
              label="Metadata Integrity" 
              score={analysis.metadataScore} 
              icon={<FileCode className="w-4 h-4" />} 
            />
          </div>
        </Card>

        <Card className="p-6 flex flex-col">
          <h3 className="text-lg font-bold font-display mb-4">Detailed Analysis</h3>
          <div className="prose dark:prose-invert text-sm text-muted-foreground flex-1">
            <p>
              {analysis.explanation}
            </p>
            <p className="mt-4">
              Our system analyzed frame-by-frame integrity, spectral audio patterns, and file container metadata.
              {analysis.overallScore < 50 
                ? " Multiple irregularities were detected suggesting synthetic manipulation." 
                : " The content appears consistent with natural recording characteristics."}
            </p>
          </div>
          <div className="mt-6 pt-6 border-t border-border flex justify-between items-center text-xs text-muted-foreground font-mono">
            <span>ID: {analysis.id}</span>
            <span>{new Date(analysis.createdAt!).toLocaleDateString()}</span>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
