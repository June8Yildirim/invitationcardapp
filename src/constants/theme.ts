/**
 * Semantic colors used across the app, for light and dark mode.
 * They are mapped from the brand scale in `@/constants/palette`; change shades there,
 * change roles here.
 */

import '@/global.css';

import { Platform } from 'react-native';

import { Palette, StatusColors } from '@/constants/palette';

function semanticColors(mode: 'light' | 'dark') {
  const p = Palette[mode];
  return {
    // Text
    text: mode === 'light' ? p[900] : p[800],
    textSecondary: p[700],
    // Surfaces
    background: p[100],
    backgroundElement: p[200],
    backgroundSelected: p[300],
    cardBackground: p[200],
    // Lines and effects
    border: p[800],
    tint: p[400],
    shadow: mode === 'light' ? p[600] : p[900],
    // Navigation
    tabIconDefault: p[500],
    tabIconSelected: p[800],
    // Actions
    accent: p[700],
    primaryBtnBackground: p[700],
    secondaryBtnBackground: p[400],
    buttonText: p[100],
    // Status
    success: StatusColors[mode].success,
    danger: StatusColors[mode].danger,
  };
}

export const Colors = {
  light: semanticColors('light'),
  dark: semanticColors('dark'),
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
