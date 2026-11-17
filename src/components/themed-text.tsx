import { Platform, StyleSheet, Text, type TextProps, type TextStyle } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Typographic variants. The original types (default, title, small, ...) are unchanged;
 * the rest extend the scale for headings, body copy, labels and invitation-style text.
 */
export type ThemedTextType =
  // Original variants
  | 'default'
  | 'title'
  | 'small'
  | 'smallBold'
  | 'subtitle'
  | 'link'
  | 'linkPrimary'
  | 'code'
  // Headings
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  // Body
  | 'bodyLarge'
  | 'body'
  | 'caption'
  // UI
  | 'label'
  | 'overline'
  | 'button'
  // Emphasis
  | 'semiBold'
  | 'miniText'
  // Cards
  | 'cardTitle'
  | 'cardSubtitle'
  | 'cardBody'
  // Feedback
  | 'error'
  // Decorative
  | 'script'
  | 'quote';

/** Semantic color tones; a shorthand over `themeColor`. */
export type ThemedTextTone = 'primary' | 'secondary' | 'accent' | 'success' | 'danger';

export type ThemedTextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export type ThemedTextProps = TextProps & {
  type?: ThemedTextType;
  /** Raw theme color key. Takes precedence over `tone`. */
  themeColor?: ThemeColor;
  tone?: ThemedTextTone;
  /** Overrides the weight built into the variant. */
  weight?: ThemedTextWeight;
  align?: TextStyle['textAlign'];
  italic?: boolean;
};

const toneToColor: Record<ThemedTextTone, ThemeColor> = {
  primary: 'text',
  secondary: 'textSecondary',
  accent: 'accent',
  success: 'success',
  danger: 'danger',
};

const weightToFontWeight: Record<ThemedTextWeight, TextStyle['fontWeight']> = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

/** Variants that default to a non-primary color when no tone/themeColor is given. */
const defaultColorForType: Partial<Record<ThemedTextType, ThemeColor>> = {
  caption: 'textSecondary',
  overline: 'textSecondary',
  quote: 'textSecondary',
  cardBody: 'textSecondary',
  linkPrimary: 'accent',
  error: 'danger',
};

export function ThemedText({
  style,
  type = 'default',
  themeColor,
  tone,
  weight,
  align,
  italic,
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();
  const colorKey =
    themeColor ?? (tone ? toneToColor[tone] : undefined) ?? defaultColorForType[type] ?? 'text';

  return (
    <Text
      accessibilityRole={isHeading(type) ? 'header' : undefined}
      style={[
        { color: theme[colorKey] },
        styles[type],
        weight && { fontWeight: weightToFontWeight[weight] },
        align && { textAlign: align },
        italic && styles.italic,
        style,
      ]}
      {...rest}
    />
  );
}

function isHeading(type: ThemedTextType) {
  return type === 'display' || type === 'title' || type === 'h1' || type === 'h2' || type === 'h3';
}

const styles = StyleSheet.create({
  // Original variants
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 500,
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 700,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 500,
  },
  title: {
    fontSize: 48,
    fontWeight: 600,
    lineHeight: 52,
  },
  subtitle: {
    fontSize: 32,
    lineHeight: 44,
    fontWeight: 600,
  },
  link: {
    lineHeight: 30,
    fontSize: 14,
  },
  linkPrimary: {
    lineHeight: 30,
    fontSize: 14,
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
  },

  // Headings
  display: {
    fontSize: 56,
    lineHeight: 60,
    fontWeight: 700,
    letterSpacing: -1,
  },
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: 700,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 600,
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 600,
  },

  // Body
  bodyLarge: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: 400,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 400,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 400,
  },

  // UI
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 600,
  },
  overline: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 600,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  button: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 600,
    letterSpacing: 0.2,
  },

  // Emphasis
  semiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 600,
  },
  miniText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 400,
  },

  // Cards
  cardTitle: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: 700,
  },
  cardSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 400,
  },
  cardBody: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 400,
  },

  // Feedback
  error: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 500,
  },

  // Decorative (invitation-style)
  script: {
    fontFamily: Fonts.serif,
    fontSize: 36,
    lineHeight: 44,
    fontStyle: 'italic',
    fontWeight: 400,
  },
  quote: {
    fontFamily: Fonts.serif,
    fontSize: 18,
    lineHeight: 28,
    fontStyle: 'italic',
  },

  italic: {
    fontStyle: 'italic',
  },
});
