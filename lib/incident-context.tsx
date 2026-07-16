import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Incident Detection Context
 *
 * Manages incident data, detection state, and notifications
 * for the Lexius shoplifting detection app.
 */

export interface DetectionIncident {
  id: string;
  timestamp: Date;
  camera: string;
  behavior: string;
  confidence: number;
  duration: number;
  verified: boolean;
  videoUrl?: string;
  description?: string;
}

export interface DetectionContextType {
  incidents: DetectionIncident[];
  isDetectionActive: boolean;
  activeCameras: number;
  recentIncidents: number;
  lastAlertTime: Date | null;
  dailyIncidents: number;
  weeklyIncidents: number;
  addIncident: (incident: Omit<DetectionIncident, "id">) => void;
  verifyIncident: (id: string) => void;
  dismissIncident: (id: string) => void;
  clearIncidents: () => void;
  setDetectionActive: (active: boolean) => void;
  setActiveCameras: (count: number) => void;
}

const DetectionContext = createContext<DetectionContextType | undefined>(undefined);

export function DetectionProvider({ children }: { children: React.ReactNode }) {
  const [incidents, setIncidents] = useState<DetectionIncident[]>([]);
  const [isDetectionActive, setDetectionActive] = useState(true);
  const [activeCameras, setActiveCameras] = useState(8);

  // Load incidents from storage on mount
  useEffect(() => {
    loadIncidents();
  }, []);

  const loadIncidents = async () => {
    try {
      const stored = await AsyncStorage.getItem("lexius_incidents");
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert timestamp strings back to Date objects
        const converted = parsed.map((inc: any) => ({
          ...inc,
          timestamp: new Date(inc.timestamp),
        }));
        setIncidents(converted);
      }
    } catch (error) {
      console.error("Failed to load incidents:", error);
    }
  };

  const saveIncidents = async (newIncidents: DetectionIncident[]) => {
    try {
      await AsyncStorage.setItem("lexius_incidents", JSON.stringify(newIncidents));
    } catch (error) {
      console.error("Failed to save incidents:", error);
    }
  };

  const addIncident = useCallback(
    (incident: Omit<DetectionIncident, "id">) => {
      const newIncident: DetectionIncident = {
        ...incident,
        id: Date.now().toString(),
      };
      const updated = [newIncident, ...incidents];
      setIncidents(updated);
      saveIncidents(updated);
    },
    [incidents]
  );

  const verifyIncident = useCallback(
    (id: string) => {
      const updated = incidents.map((inc) =>
        inc.id === id ? { ...inc, verified: true } : inc
      );
      setIncidents(updated);
      saveIncidents(updated);
    },
    [incidents]
  );

  const dismissIncident = useCallback(
    (id: string) => {
      const updated = incidents.filter((inc) => inc.id !== id);
      setIncidents(updated);
      saveIncidents(updated);
    },
    [incidents]
  );

  const clearIncidents = useCallback(() => {
    setIncidents([]);
    saveIncidents([]);
  }, []);

  // Calculate statistics
  const recentIncidents = incidents.filter((inc) => {
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60000);
    return inc.timestamp > fiveMinutesAgo;
  }).length;

  const lastAlertTime = incidents.length > 0 ? incidents[0].timestamp : null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dailyIncidents = incidents.filter((inc) => {
    const incDate = new Date(inc.timestamp);
    incDate.setHours(0, 0, 0, 0);
    return incDate.getTime() === today.getTime();
  }).length;

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weeklyIncidents = incidents.filter((inc) => inc.timestamp > weekAgo).length;

  const value: DetectionContextType = {
    incidents,
    isDetectionActive,
    activeCameras,
    recentIncidents,
    lastAlertTime,
    dailyIncidents,
    weeklyIncidents,
    addIncident,
    verifyIncident,
    dismissIncident,
    clearIncidents,
    setDetectionActive,
    setActiveCameras,
  };

  return (
    <DetectionContext.Provider value={value}>
      {children}
    </DetectionContext.Provider>
  );
}

export function useDetection() {
  const context = useContext(DetectionContext);
  if (!context) {
    throw new Error("useDetection must be used within DetectionProvider");
  }
  return context;
}
