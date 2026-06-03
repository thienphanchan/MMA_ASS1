import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState } from "../../components/EmptyState";
import { FAB } from "../../components/FAB";
import { TodoCard } from "../../components/TodoCard";
import { theme } from "../../constants/theme";
import { useTodo } from "../../hooks/useTodo";
import { Todo } from "../../types/todo";

export default function IndexScreen() {
  const router = useRouter();
  const { todos, deleteTodo, toggleComplete } = useTodo();

  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  const handleEdit = (todo: Todo) => {
    router.push(`/edit/${todo.id}` as any);
  };

  const handleAdd = () => {
    router.push("/add-task" as any);
  };

  // const ListHeader = (
  //   <>
  //     <DashboardCard
  //       total={todos.length}
  //       completed={completedTodos.length}
  //       pending={incompleteTodos.length}
  //     />
  //     <View style={styles.sectionRow}>
  //       <Text style={styles.sectionTitle}>Pending Tasks</Text>
  //       <Text style={styles.sectionCount}>{incompleteTodos.length}</Text>
  //     </View>
  //   </>II
  // );

  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>TODO APP</Text>
            <Ionicons name="calendar-outline" size={28} color={theme.colors.primary} />
          </View>
        </View>
        <FlatList
          data={incompleteTodos}
          keyExtractor={(item) => item.id}
          //ListHeaderComponent={ListHeader}
          renderItem={({ item }) => (
            <TodoCard
              todo={item}
              onEdit={handleEdit}
              onDelete={deleteTodo}
              onToggleComplete={toggleComplete}
            />
          )}
          contentContainerStyle={[
            styles.listContent,
            incompleteTodos.length === 0 && styles.listContentEmpty,
          ]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState message="Tap the + button to add your first task." />
          }
        />

        <FAB onPress={handleAdd} />
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
    color: theme.colors.subtext,
    marginTop: theme.spacing.xs,
    fontWeight: "500",
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xs,
  },
  sectionTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: "700",
    color: theme.colors.text,
  },
  sectionCount: {
    fontSize: theme.fontSize.sm,
    fontWeight: "700",
    color: theme.colors.primary,
    backgroundColor: theme.colors.primary + "18",
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.radius.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors.primary + "44",
  },
  listContent: {
    paddingBottom: 100,
  },
  listContentEmpty: {
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});