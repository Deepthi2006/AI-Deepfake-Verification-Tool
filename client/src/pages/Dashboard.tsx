import { useState } from "react";
import { useAnalyses, useAnalyzeMedia } from "@/hooks/use-analyses";
import { FileUpload } from "@/components/FileUpload";
import { AnalysisResult } from "@/components/AnalysisResult";
import { Shield, History, Plus, Video, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { type Analysis } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const { data: analyses, isLoading: isLoadingHistory } = useAnalyses();
  const { mutate: analyze, isPending } = useAnalyzeMedia();
  const [currentAnalysis, setCurrentAnalysis] = useState<Analysis | null>(null);

  const handleFileUpload = (file: File) => {
    analyze(file, {
      onSuccess: (data) => {
        setCurrentAnalysis(data);
      },
    });
  };

  const handleNewAnalysis = () => {
    setCurrentAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row overflow-hidden font-body">
      {/* Sidebar - History */}
      <aside className="w-full md:w-80 border-r border-border bg-card/30 flex flex-col h-[30vh] md:h-screen">
        <div className="p-6 border-b border-border flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg leading-tight">TrueSight</h1>
            <p className="text-xs text-muted-foreground font-mono">Deepfake Detector</p>
          </div>
        </div>

        <div className="p-4">
          <Button 
            onClick={handleNewAnalysis} 
            className="w-full gap-2 shadow-lg shadow-primary/20" 
            size="lg"
          >
            <Plus className="w-4 h-4" /> New Analysis
          </Button>
        </div>

        <div className="px-6 py-2">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <History className="w-3 h-3" /> Recent Scans
          </h2>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {isLoadingHistory ? (
              <div className="text-center py-8 text-muted-foreground text-sm">Loading history...</div>
            ) : analyses?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">No recent scans</div>
            ) : (
              analyses?.slice().reverse().map((analysis) => (
                <button
                  key={analysis.id}
                  onClick={() => setCurrentAnalysis(analysis)}
                  className={`
                    w-full text-left p-3 rounded-lg border transition-all duration-200
                    hover:border-primary/50 hover:bg-secondary/50
                    ${currentAnalysis?.id === analysis.id 
                      ? "bg-secondary border-primary/50 shadow-sm" 
                      : "bg-background border-border"}
                  `}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-sm truncate max-w-[140px]" title={analysis.fileName}>
                      {analysis.fileName}
                    </span>
                    <span 
                      className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                        analysis.verdict === 'Authentic' ? 'text-green-500 bg-green-500/10' : 
                        analysis.verdict === 'Suspicious' ? 'text-yellow-500 bg-yellow-500/10' : 
                        'text-red-500 bg-red-500/10'
                      }`}
                    >
                      {analysis.overallScore}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{new Date(analysis.createdAt!).toLocaleDateString()}</span>
                    <span>{analysis.fileType.toUpperCase()}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-[70vh] md:h-screen overflow-hidden relative bg-grid-pattern">
        {/* Ambient background glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <ScrollArea className="flex-1 p-6 md:p-12">
          <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <AnimatePresence mode="wait">
              {!currentAnalysis ? (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-10 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight text-gradient inline-block">
                      Verify Media Authenticity
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                      Advanced AI-powered deepfake detection for images and video. 
                      Secure, fast, and reliable verification.
                    </p>
                  </div>
                  
                  <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-2 shadow-2xl border border-white/5">
                    <FileUpload onFileSelect={handleFileUpload} isAnalyzing={isPending} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-center">
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold">Metadata Analysis</h3>
                      <p className="text-sm text-muted-foreground">Checks for container modification and software signatures</p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center mx-auto mb-4">
                        <Video className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold">Visual Artifacts</h3>
                      <p className="text-sm text-muted-foreground">Detects face warping and GAN-generated textures</p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto mb-4">
                        <Mic className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold">Audio Sync</h3>
                      <p className="text-sm text-muted-foreground">Verifies lip movement matches audio waveform</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <Button 
                      variant="ghost" 
                      onClick={handleNewAnalysis}
                      className="text-muted-foreground hover:text-foreground pl-0 gap-2"
                    >
                      ← Back to Upload
                    </Button>
                  </div>
                  <AnalysisResult analysis={currentAnalysis} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
