import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { ScreenContainer } from "@/components/screen-container";

/**
 * Home Screen - Lexius Shoplifting Detection Dashboard
 *
 * Displays live detection status, camera count, recent alerts summary,
 * and quick action buttons to navigate to other screens.
 */
export default function HomeScreen() {
  const colors = useColors();

  // Mock data - in production, this would come from API/context
  const isDetectionActive = true;
  const activeCameras = 8;
  const recentIncidents = 3;
  const lastAlertTime = "2 minutes ago";
  const dailyIncidents = 12;
  const weeklyIncidents = 47;

  return (
    <ScreenContainer className="p-6 bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-1">
            <Text className="text-3xl font-bold text-foreground">Lexius Guard</Text>
            <Text className="text-sm text-muted">Real-Time Shoplifting Detection</Text>
          </View>

          {/* Live Status Card */}
          <View className="bg-surface rounded-2xl p-6 border border-border shadow-sm">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-semibold text-foreground">Detection Status</Text>
              <View
                className={`w-3 h-3 rounded-full ${
                  isDetectionActive ? "bg-success" : "bg-error"
                }`}
              />
            </View>
            <Text className="text-2xl font-bold text-foreground mb-2">
              {isDetectionActive ? "Active" : "Inactive"}
            </Text>
            <Text className="text-sm text-muted">
              {activeCameras} cameras monitored • {isDetectionActive ? "All systems operational" : "System offline"}
            </Text>
          </View>

          {/* Quick Stats Grid */}
          <View className="gap-3">
            <View className="flex-row gap-3">
              {/* Active Cameras */}
              <View className="flex-1 bg-surface rounded-xl p-4 border border-border">
                <Text className="text-xs text-muted font-medium mb-2">ACTIVE CAMERAS</Text>
                <Text className="text-2xl font-bold text-primary">{activeCameras}</Text>
              </View>
              {/* Recent Incidents */}
              <View className="flex-1 bg-surface rounded-xl p-4 border border-border">
                <Text className="text-xs text-muted font-medium mb-2">TODAY'S INCIDENTS</Text>
                <Text className="text-2xl font-bold text-warning">{dailyIncidents}</Text>
              </View>
            </View>
            <View className="flex-row gap-3">
              {/* Weekly Incidents */}
              <View className="flex-1 bg-surface rounded-xl p-4 border border-border">
                <Text className="text-xs text-muted font-medium mb-2">THIS WEEK</Text>
                <Text className="text-2xl font-bold text-error">{weeklyIncidents}</Text>
              </View>
              {/* Last Alert */}
              <View className="flex-1 bg-surface rounded-xl p-4 border border-border">
                <Text className="text-xs text-muted font-medium mb-2">LAST ALERT</Text>
                <Text className="text-xs font-semibold text-foreground">{lastAlertTime}</Text>
              </View>
            </View>
          </View>

          {/* Recent Incidents Alert */}
          {recentIncidents > 0 && (
            <View className="bg-error/10 rounded-xl p-4 border border-error/20">
              <View className="flex-row items-start gap-3">
                <View className="w-2 h-2 bg-error rounded-full mt-1.5" />
                <View className="flex-1">
                  <Text className="font-semibold text-foreground mb-1">{recentIncidents} Recent Incidents</Text>
                  <Text className="text-xs text-muted">Review alerts for details and verification</Text>
                </View>
              </View>
            </View>
          )}

          {/* Quick Action Buttons */}
          <View className="gap-3 mt-2">
            <TouchableOpacity
              className="bg-primary rounded-xl p-4 flex-row items-center justify-between"
              activeOpacity={0.8}
            >
              <Text className="text-base font-semibold text-white">View Recent Alerts</Text>
              <Text className="text-white text-lg">→</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-surface border border-border rounded-xl p-4 flex-row items-center justify-between"
              activeOpacity={0.8}
            >
              <Text className="text-base font-semibold text-foreground">Live Camera Feed</Text>
              <Text className="text-foreground text-lg">→</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-surface border border-border rounded-xl p-4 flex-row items-center justify-between"
              activeOpacity={0.8}
            >
              <Text className="text-base font-semibold text-foreground">Evidence Log</Text>
              <Text className="text-foreground text-lg">→</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
