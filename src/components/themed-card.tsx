import { type ReactNode } from 'react';
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type CardVariant = 'filled' | 'outlined' | 'elevated';
export type CardPadding = 'none' | 'small' | 'medium' | 'large';

export type ThemedCardProps = Omit<PressableProps, 'children' | 'style'> & {
  variant?: CardVariant;
  padding?: CardPadding;
  title?: string;
  subtitle?: string;
  /** Edge-to-edge content above the body, e.g. an image. */
  media?: ReactNode;
  /** Content below the body, e.g. buttons. */
  footer?: ReactNode;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const paddingSizes: Record<CardPadding, number> = {
  none: 0,
  small: Spacing.two,
  medium: Spacing.three,
  large: Spacing.four,
};

export function ThemedCard({
  variant = 'filled',
  padding = 'medium',
  title,
  subtitle,
  media,
  footer,
  children,
  style,
  onPress,
  ...rest
}: ThemedCardProps) {
  const theme = useTheme();
  const pressable = Boolean(onPress);
  const inset = paddingSizes[padding];

  const variantStyle: ViewStyle =
    variant === 'outlined'
      ? { backgroundColor: theme.background, borderColor: theme.border, borderWidth: 1 }
      : variant === 'elevated'
        ? { ...styles.elevated, backgroundColor: theme.cardBackground, shadowColor: theme.shadow }
        : { backgroundColor: theme.cardBackground };

  const body = (
    <View style={[styles.body, { padding: inset }]}>
      {title || subtitle ? (
        <View style={styles.header}>
          {title ? <ThemedText type="cardTitle">{title}</ThemedText> : null}
          {subtitle ? (
            <ThemedText type="cardSubtitle" tone="secondary">
              {subtitle}
            </ThemedText>
          ) : null}
        </View>
      ) : null}
      {typeof children === 'string' ? (
        <ThemedText type="cardBody">{children}</ThemedText>
      ) : (
        children
      )}
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </View>
  );

  return (
    <Pressable
      accessibilityRole={pressable ? 'button' : undefined}
      disabled={!pressable}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variantStyle,
        pressed && pressable && styles.pressed,
        style,
      ]}
      {...rest}
    >
      {media ? <View style={styles.media}>{media}</View> : null}
      {body}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'stretch',
    borderRadius: Spacing.three,
    overflow: 'hidden',
  },
  elevated: {
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'visible',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  media: {
    overflow: 'hidden',
    borderTopLeftRadius: Spacing.three,
    borderTopRightRadius: Spacing.three,
  },
  body: {
    gap: Spacing.two,
  },
  header: {
    gap: Spacing.half,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
});
