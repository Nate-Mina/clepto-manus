import { ScrollView, Text, View, TouchableOpacity, Switch } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useRouter } from "expo-router";

/**
 * Settings Screen - App configuration and preferences
 *
 * Displays notification preferences, camera management,
 * app information, and account settings.
 */
export default function SettingsScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <ScreenContainer className="p-6 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-1">
            <Text className="text-3xl font-bold text-foreground">Settings</Text>
            <Text className="text-sm text-muted">Preferences and configuration</Text>
          </View>

          {/* Notification Preferences */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Notifications</Text>
            <View className="bg-surface rounded-2xl p-6 border border-border gap-4">
              {/* Enable Notifications */}
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground">Push Notifications</Text>
                  <Text className="text-xs text-muted mt-1">Receive incident alerts</Text>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: "#ccc", true: "#0a7ea4" }}
                />
              </View>

              {/* Sound */}
              <View className="border-t border-border pt-4">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-foreground">Sound</Text>
                    <Text className="text-xs text-muted mt-1">Alert notification sound</Text>
                  </View>
                  <Switch
                    value={soundEnabled}
                    onValueChange={setSoundEnabled}
                    trackColor={{ false: "#ccc", true: "#0a7ea4" }}
                    disabled={!notificationsEnabled}
                  />
                </View>
              </View>

              {/* Vibration */}
              <View className="border-t border-border pt-4">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-foreground">Vibration</Text>
                    <Text className="text-xs text-muted mt-1">Haptic feedback on alerts</Text>
                  </View>
                  <Switch
                    value={vibrationEnabled}
                    onValueChange={setVibrationEnabled}
                    trackColor={{ false: "#ccc", true: "#0a7ea4" }}
                    disabled={!notificationsEnabled}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Display Settings */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Display</Text>
            <View className="bg-surface rounded-2xl p-6 border border-border gap-4">
              {/* Dark Mode */}
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground">Dark Mode</Text>
                  <Text className="text-xs text-muted mt-1">Use dark theme</Text>
                </View>
                <Switch
                  value={darkModeEnabled}
                  onValueChange={setDarkModeEnabled}
                  trackColor={{ false: "#ccc", true: "#0a7ea4" }}
                />
              </View>
            </View>
          </View>

          {/* Camera Management */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Cameras</Text>
            <View className="bg-surface rounded-2xl p-6 border border-border gap-4">
              <TouchableOpacity className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground">Manage Cameras</Text>
                  <Text className="text-xs text-muted mt-1">Add, remove, or configure cameras</Text>
                </View>
                <Text className="text-lg text-muted">→</Text>
              </TouchableOpacity>
              <View className="border-t border-border pt-4">
                <TouchableOpacity className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-foreground">Detection Sensitivity</Text>
                    <Text className="text-xs text-muted mt-1">Adjust detection threshold</Text>
                  </View>
                  <Text className="text-lg text-muted">→</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Account & App Info */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Account</Text>
            <View className="bg-surface rounded-2xl p-6 border border-border gap-4">
              <TouchableOpacity className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground">Account Settings</Text>
                  <Text className="text-xs text-muted mt-1">Manage your profile</Text>
                </View>
                <Text className="text-lg text-muted">→</Text>
              </TouchableOpacity>
              <View className="border-t border-border pt-4">
                <TouchableOpacity className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-foreground">Help & Support</Text>
                    <Text className="text-xs text-muted mt-1">FAQs and contact support</Text>
                  </View>
                  <Text className="text-lg text-muted">→</Text>
                </TouchableOpacity>
              </View>
              <View className="border-t border-border pt-4">
                <TouchableOpacity className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-foreground">About Lexius Guard</Text>
                    <Text className="text-xs text-muted mt-1">Version 1.0.0</Text>
                  </View>
                  <Text className="text-lg text-muted">→</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            className="bg-error/10 border border-error/20 rounded-xl p-4 flex-row items-center justify-center gap-2"
            onPress={() => router.push("/(tabs)")}
          >
            <Text className="text-error font-semibold">🚪 Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
