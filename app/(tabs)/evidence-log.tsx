import { ScrollView, Text, View, TouchableOpacity, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

/**
 * Evidence Log Screen - Historical record of all incidents
 *
 * Displays searchable/filterable list of incidents with thumbnails,
 * dates, status badges, and export options.
 */
export default function EvidenceLogScreen() {
  // Mock evidence data
  const evidenceItems = [
    {
      id: "1",
      date: "Today, 2:35 PM",
      camera: "Aisle 3 - Electronics",
      behavior: "Suspicious concealment",
      status: "verified",
      confidence: 94,
    },
    {
      id: "2",
      date: "Today, 1:20 PM",
      camera: "Checkout Counter",
      behavior: "Unusual movement",
      status: "verified",
      confidence: 78,
    },
    {
      id: "3",
      date: "Yesterday, 5:45 PM",
      camera: "Entrance/Exit",
      behavior: "Item concealment",
      status: "false_alarm",
      confidence: 87,
    },
    {
      id: "4",
      date: "Yesterday, 3:10 PM",
      camera: "Aisle 1 - Beverages",
      behavior: "Suspicious behavior",
      status: "pending",
      confidence: 65,
    },
    {
      id: "5",
      date: "2 days ago, 6:20 PM",
      camera: "Aisle 5 - Cosmetics",
      behavior: "Concealment detected",
      status: "verified",
      confidence: 92,
    },
    {
      id: "6",
      date: "2 days ago, 2:15 PM",
      camera: "Aisle 2 - Clothing",
      behavior: "Unusual movement",
      status: "verified",
      confidence: 81,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-success/10 border-success/20";
      case "false_alarm":
        return "bg-muted/10 border-muted/20";
      case "pending":
        return "bg-warning/10 border-warning/20";
      default:
        return "bg-surface border-border";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "verified":
        return "Verified";
      case "false_alarm":
        return "False Alarm";
      case "pending":
        return "Pending";
      default:
        return "Unknown";
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "verified":
        return "text-success";
      case "false_alarm":
        return "text-muted";
      case "pending":
        return "text-warning";
      default:
        return "text-foreground";
    }
  };

  const renderEvidenceItem = ({ item }: { item: (typeof evidenceItems)[0] }) => (
    <TouchableOpacity
      className={`rounded-xl p-4 mb-3 border flex-row items-start gap-4 active:opacity-70 ${getStatusColor(
        item.status
      )}`}
      activeOpacity={0.7}
    >
      {/* Thumbnail */}
      <View className="w-14 h-14 bg-muted/20 rounded-lg items-center justify-center">
        <Text className="text-2xl">🎥</Text>
      </View>

      {/* Evidence Details */}
      <View className="flex-1">
        <View className="flex-row items-start justify-between mb-1">
          <Text className="text-sm font-semibold text-foreground flex-1">{item.behavior}</Text>
          <View className="bg-surface px-2 py-1 rounded-md ml-2">
            <Text className="text-xs font-semibold text-foreground">{item.confidence}%</Text>
          </View>
        </View>
        <Text className="text-xs text-muted mb-2">{item.camera}</Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-muted">{item.date}</Text>
          <View className="bg-surface px-2 py-0.5 rounded">
            <Text className={`text-xs font-semibold ${getStatusTextColor(item.status)}`}>
              {getStatusLabel(item.status)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer className="p-6 bg-background">
      <View className="gap-4 flex-1">
        {/* Header */}
        <View className="gap-1">
          <Text className="text-3xl font-bold text-foreground">Evidence Log</Text>
          <Text className="text-sm text-muted">Historical incident records</Text>
        </View>

        {/* Search and Filter Bar */}
        <View className="flex-row gap-2">
          <View className="flex-1 bg-surface border border-border rounded-lg px-4 py-3 flex-row items-center gap-2">
            <Text className="text-muted">🔍</Text>
            <Text className="text-sm text-muted flex-1">Search incidents...</Text>
          </View>
          <TouchableOpacity className="bg-surface border border-border rounded-lg px-4 py-3 items-center justify-center">
            <Text className="text-lg">⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <View className="flex-row gap-2">
          <TouchableOpacity className="bg-primary px-4 py-2 rounded-full">
            <Text className="text-xs font-semibold text-white">All</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-surface border border-border px-4 py-2 rounded-full">
            <Text className="text-xs font-semibold text-foreground">Verified</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-surface border border-border px-4 py-2 rounded-full">
            <Text className="text-xs font-semibold text-foreground">Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-surface border border-border px-4 py-2 rounded-full">
            <Text className="text-xs font-semibold text-foreground">Export</Text>
          </TouchableOpacity>
        </View>

        {/* Evidence List */}
        <FlatList
          data={evidenceItems}
          renderItem={renderEvidenceItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </ScreenContainer>
  );
}
