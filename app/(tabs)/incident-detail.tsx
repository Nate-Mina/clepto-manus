import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useDetection } from "@/lib/incident-context";
import { useRouter } from "expo-router";

/**
 * Incident Detail Screen - View specific incident with video clip
 *
 * Displays incident video player, metadata, confidence score,
 * behavior details, and action buttons for verification or dismissal.
 */
export default function IncidentDetailScreen() {
  const router = useRouter();
  const detection = useDetection();

  // Get the most recent incident or use mock data
  const mostRecentIncident = detection.incidents[0];
  const incident = mostRecentIncident ? {
    id: mostRecentIncident.id,
    timestamp: `${Math.round((Date.now() - mostRecentIncident.timestamp.getTime()) / 60000)} minutes ago`,
    date: mostRecentIncident.timestamp.toLocaleString(),
    camera: mostRecentIncident.camera,
    location: "Store Location: Downtown",
    behavior: mostRecentIncident.behavior,
    description: mostRecentIncident.description || "Suspicious behavior detected in retail area",
    confidence: mostRecentIncident.confidence,
    duration: "2.3 seconds",
    videoUrl: mostRecentIncident.videoUrl || "https://example.com/video.mp4",
    verified: mostRecentIncident.verified,
  } : {
    id: "1",
    timestamp: "2 minutes ago",
    date: "April 1, 2026 at 2:35 PM",
    camera: "Aisle 3 - Electronics",
    location: "Store Location: Downtown",
    behavior: "Suspicious concealment detected",
    description: "Customer placed item in bag without scanning. Unusual movement pattern detected.",
    confidence: 94,
    duration: "2.3 seconds",
    videoUrl: "https://example.com/video.mp4",
    verified: false,
  };

  const handleVerify = () => {
    if (mostRecentIncident) {
      detection.verifyIncident(mostRecentIncident.id);
    }
  };

  const handleDismiss = () => {
    if (mostRecentIncident) {
      detection.dismissIncident(mostRecentIncident.id);
      router.back();
    }
  };

  return (
    <ScreenContainer className="p-6 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="gap-6">
          {/* Back Button */}
          <TouchableOpacity className="flex-row items-center gap-2 w-12" onPress={() => router.back()}>
            <Text className="text-primary text-lg">←</Text>
            <Text className="text-primary font-semibold">Back</Text>
          </TouchableOpacity>

          {/* Video Player Placeholder */}
          <View className="w-full aspect-video bg-muted/20 rounded-2xl items-center justify-center border border-border">
            <View className="items-center gap-2">
              <Text className="text-4xl">🎥</Text>
              <Text className="text-sm text-muted">Video Clip ({incident.duration})</Text>
              <TouchableOpacity className="bg-primary px-6 py-2 rounded-full mt-2">
                <Text className="text-white font-semibold text-sm">Play Video</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Confidence Score Card */}
          <View className="bg-surface rounded-2xl p-6 border border-border">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-semibold text-foreground">Confidence Score</Text>
              <View className="bg-error px-3 py-1 rounded-full">
                <Text className="text-white font-bold text-lg">{incident.confidence}%</Text>
              </View>
            </View>
            <View className="w-full bg-muted/20 rounded-full h-2 overflow-hidden">
              <View
                className="bg-error h-full"
                style={{ width: `${incident.confidence}%` }}
              />
            </View>
            <Text className="text-xs text-muted mt-2">High confidence incident - Requires verification</Text>
          </View>

          {/* Incident Metadata */}
          <View className="bg-surface rounded-2xl p-6 border border-border gap-4">
            <View>
              <Text className="text-xs text-muted font-medium mb-1">BEHAVIOR DETECTED</Text>
              <Text className="text-base font-semibold text-foreground">{incident.behavior}</Text>
            </View>
            <View className="border-t border-border pt-4">
              <Text className="text-xs text-muted font-medium mb-1">DESCRIPTION</Text>
              <Text className="text-sm text-foreground leading-relaxed">{incident.description}</Text>
            </View>
            <View className="border-t border-border pt-4">
              <Text className="text-xs text-muted font-medium mb-1">CAMERA LOCATION</Text>
              <Text className="text-sm font-semibold text-foreground">{incident.camera}</Text>
              <Text className="text-xs text-muted mt-1">{incident.location}</Text>
            </View>
            <View className="border-t border-border pt-4">
              <Text className="text-xs text-muted font-medium mb-1">TIMESTAMP</Text>
              <Text className="text-sm font-semibold text-foreground">{incident.date}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="gap-3">
            <TouchableOpacity
              className="bg-success rounded-xl p-4 flex-row items-center justify-center gap-2"
              onPress={handleVerify}
            >
              <Text className="text-white font-semibold">✓ Mark as Verified</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-surface border border-border rounded-xl p-4 flex-row items-center justify-center gap-2"
              onPress={handleDismiss}
            >
              <Text className="text-foreground font-semibold">✗ False Alarm</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-surface border border-border rounded-xl p-4 flex-row items-center justify-center gap-2">
              <Text className="text-foreground font-semibold">📤 Share Evidence</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
