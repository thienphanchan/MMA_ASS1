import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../constants/theme";

interface EmptyStateProps {
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = "No tasks found",
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No Tasks Found</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: theme.colors.text,
    textAlign: "center",
  },
  message: {
    fontSize: theme.fontSize.md,
    color: theme.colors.subtext,
    textAlign: "center",
    lineHeight: 24,
  },
});