const colors = {
  primary: "#7C3AED",    // Purple — primary actions, FAB, highlights
  secondary: "#FFFFFF",  // White — buttons, text on dark backgrounds
  background: "#F5F3FF", // Warm purple white — screen backgrounds
  card: "#FFFFFF",       // White — card backgrounds
  text: "#1F2937",       // Dark gray — primary text
  subtext: "#6B7280",    // Medium gray — secondary / hint text
  danger: "#EF4444",     // Red — delete actions, errors
  success: "#22C55E",    // Green — completed state, confirmations
  border: "#DDD6FE",     // Light purple — card borders, dividers
  shadow: "#7C3AED",     // Purple-tinted — shadow color for depth
};
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const radius = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 24,
};

const fontSize = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
};

export const theme = {
  colors,
  spacing,
  radius,
  fontSize,
} as const;

export type Theme = typeof theme;