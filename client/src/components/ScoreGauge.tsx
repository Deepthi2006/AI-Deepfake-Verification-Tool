import { motion } from "framer-motion";

interface ScoreGaugeProps {
  score: number;
  label: string;
  size?: "sm" | "md" | "lg";
}

export function ScoreGauge({ score, label, size = "md" }: ScoreGaugeProps) {
  // Determine color based on score
  // High score = Authentic (Green/Blue), Low score = Fake (Red)
  const getColor = (s: number) => {
    if (s >= 70) return "hsl(142, 71%, 45%)"; // Success Green
    if (s >= 50) return "hsl(38, 92%, 50%)"; // Warning Yellow
    return "hsl(0, 84%, 60%)"; // Danger Red
  };

  const strokeColor = getColor(score);
  
  const radius = size === "lg" ? 80 : size === "md" ? 60 : 30;
  const strokeWidth = size === "lg" ? 12 : size === "md" ? 8 : 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const sizeClass = size === "lg" ? "w-48 h-48" : size === "md" ? "w-36 h-36" : "w-16 h-16";
  const fontSizeClass = size === "lg" ? "text-5xl" : size === "md" ? "text-3xl" : "text-sm";

  return (
    <div className={`flex flex-col items-center justify-center ${sizeClass} relative`}>
      <svg className="w-full h-full transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="transparent"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
          cx="50%"
          cy="50%"
          r={radius}
          fill="transparent"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`${fontSizeClass} font-bold font-display text-foreground`}>
          {score}
        </span>
        {size !== "sm" && (
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
