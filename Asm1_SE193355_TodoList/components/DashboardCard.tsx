import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../constants/theme";

interface DashboardCardProps {
  total: number;
  completed: number;
  pending: number;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  total,
  completed,
  pending,
}) => {
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <View style={styles.card}>
      {/* Title Row */}
      <View style={styles.titleRow}>
        <Text style={styles.cardTitle}>Today's Overview</Text>
        <Text style={styles.progressBadge}>{progress}% done</Text>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        {/* Total */}
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>

        <View style={styles.statDivider} />

        {/* Completed */}
        <View style={styles.statItem}>
          <Text style={[styles.statValue, styles.successText]}>{completed}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>

        <View style={styles.statDivider} />

        {/* Pending */}
        <View style={styles.statItem}>
          <Text style={[styles.statValue, styles.primaryText]}>{pending}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
      </View>

      {/* Progress Bar — width applied inline using progress value */}
      <View style={styles.progressBarTrack}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${progress}%` },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
  },
  cardTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: "700",
    color: theme.colors.text,
    letterSpacing: 0.1,
  },
  progressBadge: {
    fontSize: theme.fontSize.sm,
    fontWeight: "700",
    color: theme.colors.primary,
    backgroundColor: theme.colors.primary + "18",
    paddingHorizontal: theme.spacing.sm + 2,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors.primary + "44",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  statValue: {
    fontSize: theme.fontSize.xl + 4,
    fontWeight: "800",
    color: theme.colors.text,
    lineHeight: 36,
  },
  statLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.subtext,
    fontWeight: "500",
  },
  primaryText: {
    color: theme.colors.primary,
  },
  successText: {
    color: theme.colors.success,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: theme.colors.border,
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: theme.radius.xl,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.xl,
  },
});