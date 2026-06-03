import { Stack } from "expo-router";
import { theme } from "../constants/theme";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTitleStyle: {
          fontSize: theme.fontSize.lg,
          fontWeight: "700",
          color: theme.colors.text,
        },
        headerTintColor: theme.colors.primary,
        headerShadowVisible: true,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      {/* Tabs — no header, managed by tab layout */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      {/* Add Task Screen */}
      <Stack.Screen
        name="add-task"
        options={{
          headerShown: false,
          title: "Add Task",
          presentation: "modal",
        }}
      />

      {/* Edit Task Screen */}
      <Stack.Screen
        name="edit/[id]"
        options={{
          headerShown: false,
          title: "Edit Task",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}