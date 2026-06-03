import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../constants/theme";
import { Todo } from "../types/todo";

interface TodoCardProps {
  todo: Todo;
  onEdit?: (todo: Todo) => void;
  onDelete?: (id: string) => void;
  onToggleComplete?: (id: string) => void;
}

export const TodoCard: React.FC<TodoCardProps> = ({
  todo,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const showActions = !!onEdit || !!onDelete || !!onToggleComplete;

  return (
    <View style={[styles.card, todo.completed && styles.cardCompleted]}>
      {/* Left: Title + Detail */}
      <View style={styles.body}>
        <Text
          style={[styles.title, todo.completed && styles.titleCompleted]}
          numberOfLines={1}
        >
          {todo.title}
        </Text>
        {!!todo.detail && (
          <Text
            style={[styles.detail, todo.completed && styles.detailCompleted]}
            numberOfLines={1}
          >
            {todo.detail}
          </Text>
        )}
      </View>

      {/* Right: Icons */}
      {showActions && (
        <View style={styles.actions}>
          {typeof onEdit === "function" && (
            <TouchableOpacity onPress={() => onEdit(todo)} activeOpacity={0.7}>
              <Ionicons name="pencil-outline" size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          )}

          {typeof onDelete === "function" && (
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "Delete Task",
                  "Are you sure you want to delete this task?",
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: () => onDelete(todo.id),
                    },
                  ]
                )
              }
              activeOpacity={0.7}
            >
              <Ionicons name="trash-outline" size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          )}

          {typeof onToggleComplete === "function" && (
            <TouchableOpacity
              onPress={() => onToggleComplete(todo.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={todo.completed ? "checkmark-circle" : "checkmark-circle-outline"}
                size={20}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  cardCompleted: {
    opacity: 0.7,
  },
  body: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: theme.fontSize.md,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  titleCompleted: {
    textDecorationLine: "line-through",
    color: theme.colors.subtext,
  },
  detail: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.subtext,
  },
  detailCompleted: {
    color: theme.colors.subtext + "88",
  },
  actions: {
    flexDirection: "row",
    gap: theme.spacing.md,
    alignItems: "center",
  },
});