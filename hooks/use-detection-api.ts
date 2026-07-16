import { useState, useCallback } from "react";
import { trpc } from "@/lib/trpc";

/**
 * Hook for interacting with the shoplifting detection API
 *
 * Provides methods to analyze images and fetch detection statistics
 */

export interface DetectionResult {
  detected_behaviors: string[];
  confidence_score: number;
  risk_level: "low" | "medium" | "high";
  recommended_action: string;
  summary: string;
}

export function useDetectionAPI() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API mutation for image analysis
  const analyzeImageMutation = trpc.detection.analyzeImage.useMutation();

  // API query for statistics
  const statisticsQuery = trpc.detection.getStatistics.useQuery();

  // Analyze an image for suspicious behavior
  const analyzeImage = useCallback(
    async (imageUrl: string, context?: string) => {
      setIsAnalyzing(true);
      setError(null);

      try {
        const result = await analyzeImageMutation.mutateAsync({
          imageUrl,
          context,
        });

        if (result.success) {
          return result.analysis;
        } else {
          setError(result.error || "Analysis failed");
          return null;
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("Detection API error:", err);
        return null;
      } finally {
        setIsAnalyzing(false);
      }
    },
    [analyzeImageMutation]
  );

  // Get detection statistics
  const getStatistics = useCallback(() => {
    return statisticsQuery.data;
  }, [statisticsQuery.data]);

  // Refetch statistics
  const refetchStatistics = useCallback(() => {
    return statisticsQuery.refetch();
  }, [statisticsQuery]);

  return {
    analyzeImage,
    isAnalyzing,
    error,
    getStatistics,
    refetchStatistics,
    statisticsLoading: statisticsQuery.isLoading,
    statistics: statisticsQuery.data,
  };
}
