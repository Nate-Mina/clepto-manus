# Lexius Mobile App - Interface Design Plan

## Screen List

The app will include the following screens designed for mobile portrait orientation (9:16) and one-handed usage:

| Screen | Purpose | Key Elements |
|--------|---------|--------------|
| **Home** | Main dashboard showing live detection status | Live status indicator, active camera count, incident alerts summary, quick stats |
| **Alerts** | Real-time and historical incident notifications | Alert list with timestamps, severity badges, incident previews |
| **Incident Detail** | View specific incident with video clip | Video player, incident metadata, timestamp, location, confidence score, action buttons |
| **Evidence Log** | Historical record of all incidents | Searchable/filterable list, incident thumbnails, dates, export options |
| **Live Feed** | Real-time camera feed monitoring | Camera selector, live video stream, detection overlay indicators |
| **Settings** | App configuration and preferences | Notification preferences, camera management, app info, logout |

## Primary Content and Functionality

### Home Screen
- **Live Status Card**: Shows current detection system status (active/inactive)
- **Camera Count Badge**: Number of cameras currently monitored
- **Alert Summary**: Recent incidents count and latest alert timestamp
- **Quick Actions**: Buttons to view alerts, live feed, or evidence log
- **Statistics**: Daily/weekly incident count, detection accuracy rate

### Alerts Screen
- **Alert List**: Chronological list of incidents with:
  - Incident thumbnail/preview image
  - Timestamp and relative time (e.g., "2 minutes ago")
  - Severity badge (high/medium/low confidence)
  - Brief description (e.g., "Suspicious concealment detected")
- **Pull-to-Refresh**: Update alert list
- **Tap Action**: Navigate to incident detail view

### Incident Detail Screen
- **Video Player**: Play incident clip (under 2 seconds)
- **Metadata Panel**: 
  - Timestamp and date
  - Camera location/name
  - Confidence score (percentage)
  - Behavior detected (concealment, unusual movement, etc.)
- **Action Buttons**:
  - "Mark as Verified" (confirm incident)
  - "False Alarm" (dismiss)
  - "Share Evidence" (export/send)
  - "Back to Alerts"

### Evidence Log Screen
- **Searchable List**: Filter by date range, camera, or status
- **Incident Cards**: Show thumbnail, date, status (verified/false alarm/pending)
- **Export Function**: Download incident data or video clips
- **Sort Options**: By date, confidence score, or status

### Live Feed Screen
- **Camera Selector**: Dropdown or carousel to switch between cameras
- **Live Video Stream**: Real-time feed from selected camera
- **Detection Overlay**: Visual indicators when suspicious behavior is detected
- **Status Bar**: Current detection status, frame rate, connection quality

### Settings Screen
- **Notification Preferences**: Toggle push notifications, sound, vibration
- **Camera Management**: Add/remove cameras, configure detection sensitivity
- **App Info**: Version, about, help
- **Account**: User profile, logout

## Key User Flows

### Flow 1: Receive and Review Alert
1. User receives push notification of suspicious activity
2. Taps notification → navigates to Incident Detail screen
3. Views video clip and incident metadata
4. Marks as "Verified" or "False Alarm"
5. Returns to Alerts list

### Flow 2: Monitor Live Feed
1. User taps "Live Feed" from home screen
2. Selects camera from dropdown
3. Watches real-time stream with detection overlays
4. If suspicious activity detected, receives alert notification
5. Can tap alert to view incident detail

### Flow 3: Review Evidence Log
1. User navigates to Evidence Log
2. Searches or filters incidents (by date, camera, status)
3. Taps incident to view details and video
4. Exports evidence for reporting or sharing
5. Returns to log

### Flow 4: Configure Settings
1. User taps Settings icon
2. Adjusts notification preferences
3. Manages cameras (add/remove, sensitivity)
4. Views app information
5. Returns to home

## Color Choices

The app uses a modern, professional color scheme suitable for retail loss prevention:

| Color | Hex | Usage |
|-------|-----|-------|
| **Primary** | #0a7ea4 | Buttons, active states, highlights |
| **Background** | #ffffff (light) / #151718 (dark) | Screen backgrounds |
| **Surface** | #f5f5f5 (light) / #1e2022 (dark) | Cards, panels, elevated surfaces |
| **Foreground** | #11181c (light) / #ecedee (dark) | Primary text |
| **Muted** | #687076 (light) / #9ba1a6 (dark) | Secondary text, labels |
| **Border** | #e5e7eb (light) / #334155 (dark) | Dividers, borders |
| **Success** | #22c55e (light) / #4ade80 (dark) | Verified incidents, positive actions |
| **Warning** | #f59e0b (light) / #fbbf24 (dark) | Medium-confidence alerts, caution states |
| **Error** | #ef4444 (light) / #f87171 (dark) | High-confidence alerts, critical incidents |

## Design Principles

- **One-Handed Usage**: All interactive elements positioned within thumb reach
- **Minimal Cognitive Load**: Clear visual hierarchy, simple navigation
- **Accessibility**: High contrast, readable text sizes, clear labels
- **iOS-First Design**: Follows Apple Human Interface Guidelines
- **Real-Time Responsiveness**: Immediate feedback on user actions
- **Trust & Transparency**: Clear incident metadata, confidence scores, evidence trails
