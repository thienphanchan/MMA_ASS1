import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../constants/theme";
import { useTodo } from "../hooks/useTodo";
export default function AddTaskScreen() {
  const router = useRouter();
  const { addTodo } = useTodo();

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const handleAdd = () => {
    if (!title.trim()) {
      Alert.alert("Validation", "Title cannot be empty.");
      return;
    }
    addTodo(title, detail);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={22} color={theme.colors.text} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>New Task</Text>
            <Text style={styles.headerSubtitle}>Fill in the details below</Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Title Field */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Title *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter task title..."
              placeholderTextColor={theme.colors.subtext + "88"}
              value={title}
              onChangeText={setTitle}
              maxLength={100}
              returnKeyType="next"
              autoFocus
            />
          </View>

          {/* Detail Field */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Detail</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter task details..."
              placeholderTextColor={theme.colors.subtext + "88"}
              value={detail}
              onChangeText={setDetail}
              maxLength={500}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              returnKeyType="done"
            />
          </View>

          {/* Add Button */}
          <TouchableOpacity
            style={[styles.btn, styles.addBtn]}
            onPress={handleAdd}
            activeOpacity={0.8}
          >
            <Text style={styles.addBtnText}>+ Add Task</Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity
            style={[styles.btn, styles.cancelBtn]}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  },
  header: {
    flexDirection: "row",      // thêm dòng này
    alignItems: "center",      // thêm dòng này
    gap: theme.spacing.md,     // thêm dòng này
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
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  backBtnText: {
    fontSize: 20,
    color: theme.colors.text,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: "800",
    color: theme.colors.text,
    letterSpacing: 0.2,
  },
  headerSubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.subtext,
    marginTop: theme.spacing.xs,
    fontWeight: "500",
  },
  form: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  fieldGroup: {
    gap: theme.spacing.xs,
  },
  label: {
    fontSize: theme.fontSize.sm + 1,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  input: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm + 4,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  textArea: {
    minHeight: 110,
    paddingTop: theme.spacing.sm + 4,
  },
  btn: {
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing.md,
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing.xs,
  },
  addBtn: {
    backgroundColor: theme.colors.primary,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  addBtnText: {
    color: theme.colors.secondary,
    fontSize: theme.fontSize.md,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  cancelBtn: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cancelBtnText: {
    color: theme.colors.subtext,
    fontSize: theme.fontSize.md,
    fontWeight: "600",
  },
});