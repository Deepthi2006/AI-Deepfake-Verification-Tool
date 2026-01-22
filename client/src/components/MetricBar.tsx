import { motion } from "framer-motion";

interface MetricBarProps {
  label: string;
  score: number;
  icon?: React.ReactNode;
}

export function MetricBar({ label, score, icon }: MetricBarProps) {
  const getColor = (s: number) => {
    if (s >= 80) return "bg-green-500";
    if (s >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm font-medium">
        <div className="flex items-center gap-2 text-muted-foreground">
          {icon}
          <span>{label}</span>
        </div>
        <span className="font-mono">{score}%</span>
      </div>
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full ${getColor(score)} rounded-full shadow-[0_0_10px_rgba(0,0,0,0.2)]`}
        />
      </div>
    </div>
  );
}
