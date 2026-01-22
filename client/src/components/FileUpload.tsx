import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileVideo, FileImage, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
}

export function FileUpload({ onFileSelect, isAnalyzing }: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0 && !isAnalyzing) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect, isAnalyzing]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "video/*": [],
    },
    maxFiles: 1,
    disabled: isAnalyzing,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative group cursor-pointer
        border-2 border-dashed rounded-2xl p-12
        transition-all duration-300 ease-in-out
        flex flex-col items-center justify-center text-center
        min-h-[300px]
        ${isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-secondary/50"}
        ${isAnalyzing ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      <input {...getInputProps()} />
      
      {isAnalyzing ? (
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-16 h-16 text-primary" />
          </motion.div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold font-display">Analyzing Media...</h3>
            <p className="text-muted-foreground">Running AI deepfake detection models</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className={`
            w-20 h-20 rounded-full flex items-center justify-center mx-auto
            bg-secondary text-secondary-foreground
            group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground
            transition-all duration-300
          `}>
            {isDragActive ? (
              <Upload className="w-10 h-10" />
            ) : (
              <FileVideo className="w-10 h-10" />
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold font-display">
              {isDragActive ? "Drop file here" : "Upload Media to Verify"}
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Drag and drop your image or video file, or click to browse.
              Supports MP4, AVI, MOV, JPG, PNG.
            </p>
          </div>

          <div className="flex justify-center gap-4 text-xs text-muted-foreground uppercase tracking-widest font-mono">
            <span className="flex items-center gap-1"><FileVideo className="w-3 h-3" /> Max 50MB</span>
            <span className="flex items-center gap-1"><FileImage className="w-3 h-3" /> Secure Upload</span>
          </div>
        </div>
      )}
    </div>
  );
}
