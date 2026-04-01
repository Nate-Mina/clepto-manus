import { ScrollView, Text, View, TouchableOpacity, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

/**
 * Alerts Screen - Real-time incident notifications
 *
 * Displays a list of detected incidents with severity badges,
 * timestamps, and incident previews. Users can tap to view details.
 */
export default function AlertsScreen() {
  // Mock incident data
  const incidents = [
    {
      id: "1",
      timestamp: "2 minutes ago",
      camera: "Aisle 3 - Electronics",
      behavior: "Suspicious concealment detected",
      confidence: 94,
      severity: "high",
      preview: "🎥",
    },
    {
      id: "2",
      timestamp: "15 minutes ago",
      camera: "Checkout Counter",
      behavior: "Unusual movement pattern",
      confidence: 78,
      severity: "medium",
      preview: "🎥",
    },
    {
      id: "3",
      timestamp: "1 hour ago",
      camera: "Entrance/Exit",
      behavior: "Item concealment detected",
      confidence: 87,
      severity: "high",
      preview: "🎥",
    },
    {
      id: "4",
      timestamp: "2 hours ago",
      camera: "Aisle 1 - Beverages",
      behavior: "Suspicious behavior",
      confidence: 65,
      severity: "medium",
      preview: "🎥",
    },
    {
      id: "5",
      timestamp: "3 hours ago",
      camera: "Aisle 5 - Cosmetics",
      behavior: "Concealment detected",
      confidence: 92,
      severity: "high",
      preview: "🎥",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-error";
      case "medium":
        return "bg-warning";
      case "low":
        return "bg-success";
      default:
        return "bg-muted";
    }
  };

  const getSeverityLabel = (severity: string) => {
    return severity.charAt(0).toUpperCase() + severity.slice(1);
  };

  const renderIncidentCard = ({ item }: { item: (typeof incidents)[0] }) => (
    <TouchableOpacity
      className="bg-surface rounded-xl p-4 mb-3 border border-border flex-row items-start gap-4 active:opacity-70"
      activeOpacity={0.7}
    >
      {/* Preview Thumbnail */}
      <View className="w-16 h-16 bg-muted/20 rounded-lg items-center justify-center">
        <Text className="text-2xl">{item.preview}</Text>
      </View>

      {/* Incident Details */}
      <View className="flex-1">
        <View className="flex-row items-start justify-between mb-1">
          <Text className="text-sm font-semibold text-foreground flex-1">{item.behavior}</Text>
          <View className={`${getSeverityColor(item.severity)} px-2 py-1 rounded-md ml-2`}>
            <Text className="text-xs font-semibold text-white">{item.confidence}%</Text>
          </View>
        </View>
        <Text className="text-xs text-muted mb-2">{item.camera}</Text>
        <Text className="text-xs text-muted">{item.timestamp}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer className="p-6 bg-background">
      <View className="gap-4 flex-1">
        {/* Header */}
        <View className="gap-1">
          <Text className="text-3xl font-bold text-foreground">Alerts</Text>
          <Text className="text-sm text-muted">Real-time incident notifications</Text>
        </View>

        {/* Alert Filter Buttons */}
        <View className="flex-row gap-2">
          <TouchableOpacity className="bg-primary px-4 py-2 rounded-full">
            <Text className="text-xs font-semibold text-white">All</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-surface border border-border px-4 py-2 rounded-full">
            <Text className="text-xs font-semibold text-foreground">High</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-surface border border-border px-4 py-2 rounded-full">
            <Text className="text-xs font-semibold text-foreground">Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-surface border border-border px-4 py-2 rounded-full">
            <Text className="text-xs font-semibold text-foreground">Verified</Text>
          </TouchableOpacity>
        </View>

        {/* Incidents List */}
        <FlatList
          data={incidents}
          renderItem={renderIncidentCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </ScreenContainer>
  );
}
