import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState } from "../../components/EmptyState";
import { TodoCard } from "../../components/TodoCard";
import { theme } from "../../constants/theme";
import { useTodo } from "../../hooks/useTodo";

export default function CompletedScreen() {
  const { todos, deleteTodo } = useTodo();

  const completedTodos = todos.filter((todo) => todo.completed);
  const ListHeader = (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Completed</Text>
      </View>
    </>
  );
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Completed Tasks</Text>
        </View>

        <FlatList
          data={completedTodos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoCard
              todo={item}
              onDelete={deleteTodo}
            />
          )}
          contentContainerStyle={[
            styles.listContent,
            completedTodos.length === 0 && styles.listContentEmpty,
          ]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState message="Tasks you complete will appear here." />
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: "800",
    color: theme.colors.primary,
    letterSpacing: 0.2,
  },
  headerSubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.success,
    marginTop: theme.spacing.xs,
    fontWeight: "600",
  },
  listContent: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  listContentEmpty: {
    flex: 1,
  },
});