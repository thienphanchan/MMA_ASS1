import { useCallback, useEffect, useState } from "react";
import {
  loadTodos as loadFromStorage,
  saveTodos as saveToStorage,
} from "../services/todoStorage";
import { Todo } from "../types/todo";

let globalTodos: Todo[] = [];
let listeners: Array<(todos: Todo[]) => void> = [];

const notifyListeners = (todos: Todo[]) => {
  globalTodos = todos;
  listeners.forEach((fn) => fn(todos));
};

const persistAndNotify = async (todos: Todo[]) => {
  await saveToStorage(todos);
  notifyListeners(todos);
};

export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>(globalTodos);

  // Subscribe to global state changes
  useEffect(() => {
    const listener = (updated: Todo[]) => setTodos([...updated]);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((fn) => fn !== listener);
    };
  }, []);

  // Load todos from AsyncStorage and sync to global state
  const loadTodos = useCallback(async () => {
    const stored = await loadFromStorage();
    notifyListeners(stored);
  }, []);

  /** Initialize on first mount */
  useEffect(() => {
    if (globalTodos.length === 0) {
      loadTodos();
    }
  }, []);

  const addTodo = useCallback((title: string, detail: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: title.trim(),
      detail: detail.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const updated = [newTodo, ...globalTodos];
    persistAndNotify(updated);
  }, []);

  const deleteTodo = useCallback((id: string) => {
    const updated = globalTodos.filter((todo) => todo.id !== id);
    persistAndNotify(updated);
  }, []);

  const updateTodo = useCallback((id: string, title: string, detail: string) => {
    const updated = globalTodos.map((todo) =>
      todo.id === id
        ? { ...todo, title: title.trim(), detail: detail.trim() }
        : todo
    );
    persistAndNotify(updated);
  }, []);

  const toggleComplete = useCallback((id: string) => {
    const updated = globalTodos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    try {
      const before = globalTodos.find((t) => t.id === id);
      const after = updated.find((t) => t.id === id);
      // eslint-disable-next-line no-console
      console.log("useTodo.toggleComplete", { id, beforeCompleted: before?.completed, afterCompleted: after?.completed });
    } catch (e) {
      // ignore
    }
    persistAndNotify(updated);
  }, []);

  return {
    todos,
    loadTodos,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleComplete,
  };
};