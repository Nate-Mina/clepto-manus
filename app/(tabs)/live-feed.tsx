import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

/**
 * Live Feed Screen - Real-time camera feed monitoring
 *
 * Displays live video stream from selected camera with detection
 * overlays and status indicators.
 */
export default function LiveFeedScreen() {
  // Mock camera data
  const cameras = [
    { id: "1", name: "Aisle 1 - Beverages", status: "active" },
    { id: "2", name: "Aisle 2 - Clothing", status: "active" },
    { id: "3", name: "Aisle 3 - Electronics", status: "active" },
    { id: "4", name: "Aisle 5 - Cosmetics", status: "active" },
    { id: "5", name: "Checkout Counter", status: "active" },
    { id: "6", name: "Entrance/Exit", status: "inactive" },
    { id: "7", name: "Storage Room", status: "active" },
    { id: "8", name: "Manager Office", status: "active" },
  ];

  const selectedCamera = cameras[0];

  return (
    <ScreenContainer className="p-6 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-1">
            <Text className="text-3xl font-bold text-foreground">Live Feed</Text>
            <Text className="text-sm text-muted">Real-time camera monitoring</Text>
          </View>

          {/* Live Video Player */}
          <View className="w-full aspect-video bg-muted/20 rounded-2xl items-center justify-center border border-border overflow-hidden">
            <View className="items-center gap-3">
              <Text className="text-5xl">📹</Text>
              <Text className="text-sm text-muted">Live Feed Stream</Text>
              <View className="flex-row items-center gap-2 mt-2">
                <View className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <Text className="text-xs text-success font-semibold">LIVE</Text>
              </View>
            </View>
          </View>

          {/* Camera Info and Controls */}
          <View className="bg-surface rounded-2xl p-6 border border-border gap-4">
            <View>
              <Text className="text-xs text-muted font-medium mb-1">SELECTED CAMERA</Text>
              <Text className="text-lg font-semibold text-foreground">{selectedCamera.name}</Text>
            </View>
            <View className="border-t border-border pt-4">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-xs text-muted font-medium mb-1">STATUS</Text>
                  <View className="flex-row items-center gap-2">
                    <View className="w-2 h-2 bg-success rounded-full" />
                    <Text className="text-sm font-semibold text-foreground">
                      {selectedCamera.status === "active" ? "Active" : "Inactive"}
                    </Text>
                  </View>
                </View>
                <View className="text-right">
                  <Text className="text-xs text-muted font-medium mb-1">FRAME RATE</Text>
                  <Text className="text-sm font-semibold text-foreground">30 FPS</Text>
                </View>
              </View>
            </View>
            <View className="border-t border-border pt-4">
              <Text className="text-xs text-muted font-medium mb-2">DETECTION STATUS</Text>
              <View className="flex-row items-center gap-2">
                <View className="w-2 h-2 bg-success rounded-full" />
                <Text className="text-sm text-foreground">Detection active • No alerts</Text>
              </View>
            </View>
          </View>

          {/* Camera Selector */}
          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-base font-semibold text-foreground">All Cameras ({cameras.length})</Text>
              <TouchableOpacity>
                <Text className="text-primary font-semibold text-sm">View All</Text>
              </TouchableOpacity>
            </View>

            {/* Camera Grid */}
            <View className="gap-3">
              {cameras.map((camera, index) => (
                <TouchableOpacity
                  key={camera.id}
                  className={`rounded-xl p-4 flex-row items-center justify-between border ${
                    camera.id === selectedCamera.id
                      ? "bg-primary/10 border-primary"
                      : "bg-surface border-border"
                  }`}
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-center gap-3 flex-1">
                    <View
                      className={`w-10 h-10 rounded-lg items-center justify-center ${
                        camera.status === "active" ? "bg-success/20" : "bg-muted/20"
                      }`}
                    >
                      <Text className="text-lg">📷</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-sm font-semibold text-foreground">{camera.name}</Text>
                      <View className="flex-row items-center gap-1 mt-0.5">
                        <View
                          className={`w-1.5 h-1.5 rounded-full ${
                            camera.status === "active" ? "bg-success" : "bg-muted"
                          }`}
                        />
                        <Text className="text-xs text-muted">
                          {camera.status === "active" ? "Active" : "Offline"}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {camera.id === selectedCamera.id && (
                    <View className="bg-primary px-3 py-1 rounded-full">
                      <Text className="text-xs font-semibold text-white">Active</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
