/*
PURPOSE:
Định nghĩa model Todo.

Fields:

id
title
detail
completed

Lý do tạo:
Dùng type chung cho toàn project.
*/
/**
 * Represents a single Todo item in the application.
 * This interface defines the shape of data stored and manipulated throughout the app.
 */
export interface Todo {
  /** Unique identifier for the todo item (UUID string) */
  id: string;

  /** Short title or name of the todo task */
  title: string;

  /** Detailed description or notes about the todo task */
  detail: string;

  /** Whether the todo task has been marked as completed */
  completed: boolean;

  /** ISO 8601 timestamp string of when the todo was created (e.g., new Date().toISOString()) */
  createdAt: string;
}