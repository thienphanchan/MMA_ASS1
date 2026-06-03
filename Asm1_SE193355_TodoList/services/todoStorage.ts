import AsyncStorage from "@react-native-async-storage/async-storage";
import { Todo } from "../types/todo";

/** AsyncStorage key used to persist the todo list */
const STORAGE_KEY = "TODOS";

export const loadTodos = async (): Promise<Todo[]> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (json === null) return [];
    return JSON.parse(json) as Todo[];
  } catch (error) {
    console.error("[todoStorage] Failed to load todos:", error);
    return [];
  }
};

/**
 * Persists the given todo array to AsyncStorage as a JSON string.
 * Overwrites any previously saved data.
 */
export const saveTodos = async (todos: Todo[]): Promise<void> => {
  try {
    const json = JSON.stringify(todos);
    await AsyncStorage.setItem(STORAGE_KEY, json);
  } catch (error) {
    console.error("[todoStorage] Failed to save todos:", error);
  }
};

/**
 * Removes all todos from AsyncStorage.
 * Useful for resetting app state or during logout flows.
 */
export const clearTodos = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("[todoStorage] Failed to clear todos:", error);
  }
};