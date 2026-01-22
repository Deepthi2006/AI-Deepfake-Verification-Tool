import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type Analysis } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

// Fetch all analyses
export function useAnalyses() {
  return useQuery({
    queryKey: [api.analyses.list.path],
    queryFn: async () => {
      const res = await fetch(api.analyses.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch analyses");
      return api.analyses.list.responses[200].parse(await res.json());
    },
  });
}

// Fetch single analysis
export function useAnalysis(id: number | null) {
  return useQuery({
    queryKey: [api.analyses.get.path, id],
    enabled: !!id,
    queryFn: async () => {
      if (!id) return null;
      const url = buildUrl(api.analyses.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch analysis");
      return api.analyses.get.responses[200].parse(await res.json());
    },
  });
}

// Create analysis (Upload)
export function useAnalyzeMedia() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(api.analyses.analyze.path, {
        method: api.analyses.analyze.method,
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Validation failed");
        }
        throw new Error("Analysis failed");
      }

      return api.analyses.analyze.responses[201].parse(await res.json());
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [api.analyses.list.path] });
      toast({
        title: "Analysis Complete",
        description: `File analyzed successfully. Verdict: ${data.verdict}`,
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
