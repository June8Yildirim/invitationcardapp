import { type ReactNode } from 'react';
import {
  ActivityIndicator,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  Pressable,
  type PressableProps,
  type StyleProp,
  StyleSheet,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Colors, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** Visual style of the button. */
export type ButtonVariant = 'primary' | 'secondary' | 'border' | 'text' | 'shadow';
/** Color family. `accent` is the brand color; `neutral` follows the text color. */
export type ButtonTone = 'accent' | 'neutral' | 'success' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export type ThemedButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  type?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  /** Pill-shaped corners. */
  rounded?: boolean;
  /** Stretch to the parent's width. */
  fullWidth?: boolean;
};

type Palette = (typeof Colors)['light' | 'dark'];

function toneColor(tone: ButtonTone, theme: Palette) {
  return tone === 'neutral' ? theme.text : theme[tone];
}

function getButtonColors(type: ButtonVariant, tone: ButtonTone, theme: Palette) {
  const base = toneColor(tone, theme);
  const filledText = tone === 'neutral' ? theme.background : theme.buttonText;

  switch (type) {
    case 'primary':
    case 'shadow':
      return {
        background: base,
        border: base,
        text: filledText,
        ripple: 'rgba(255,255,255,0.3)',
      };
    case 'secondary':
      return {
        background: theme.backgroundElement,
        border: theme.backgroundElement,
        text: base,
        ripple: theme.backgroundSelected,
      };
    case 'border':
      return {
        background: 'transparent',
        border: tone === 'neutral' ? theme.backgroundSelected : base,
        text: base,
        ripple: theme.backgroundSelected,
      };
    case 'text':
      return {
        background: 'transparent',
        border: 'transparent',
        text: base,
        ripple: theme.backgroundElement,
      };
  }
}

const sizeStyles = {
  small: {
    paddingVertical: Spacing.one + Spacing.half,
    paddingHorizontal: Spacing.three,
    minHeight: 36,
  },
  medium: { paddingVertical: Spacing.two, paddingHorizontal: Spacing.four, minHeight: 44 },
  large: { paddingVertical: Spacing.three, paddingHorizontal: Spacing.five, minHeight: 56 },
} satisfies Record<ButtonSize, ViewStyle>;

const labelStyles = {
  small: { fontSize: 14, lineHeight: 18 },
  medium: { fontSize: 16, lineHeight: 20 },
  large: { fontSize: 18, lineHeight: 24 },
} satisfies Record<ButtonSize, TextStyle>;

export function ThemedButton({
  type = 'primary',
  tone = 'accent',
  size = 'medium',
  children,
  style,
  textStyle,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  rounded = false,
  fullWidth = false,
  onPressIn,
  onPressOut,
  onLayout,
  ...rest
}: ThemedButtonProps) {
  const theme = useTheme();
  const colors = getButtonColors(type, tone, theme);
  const inactive = disabled || loading;

  // Ripple that grows from the touch point.
  const width = useSharedValue(0);
  const height = useSharedValue(0);
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const scale = useSharedValue(0);
  const rippleOpacity = useSharedValue(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    width.set(event.nativeEvent.layout.width);
    height.set(event.nativeEvent.layout.height);
    onLayout?.(event);
  };

  const handlePressIn = (event: GestureResponderEvent) => {
    centerX.set(event.nativeEvent.locationX);
    centerY.set(event.nativeEvent.locationY);
    rippleOpacity.set(1);
    scale.set(0);
    scale.set(withTiming(1, { duration: 500 }));
    onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    rippleOpacity.set(withTiming(0, { duration: 300 }));
    onPressOut?.(event);
  };

  const rippleStyle = useAnimatedStyle(() => {
    const radius = Math.sqrt(width.get() ** 2 + height.get() ** 2);
    return {
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius,
      opacity: rippleOpacity.get(),
      transform: [
        { translateX: centerX.get() - radius },
        { translateY: centerY.get() - radius },
        { scale: scale.get() },
      ],
    };
  });

  const label =
    typeof children === 'string' || typeof children === 'number' ? (
      <ThemedText
        type="button"
        numberOfLines={1}
        style={[styles.label, labelStyles[size], { color: colors.text }, textStyle]}
      >
        {children}
      </ThemedText>
    ) : (
      children
    );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: inactive, busy: loading }}
      disabled={inactive}
      onLayout={handleLayout}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.base,
        sizeStyles[size],
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
        },
        type === 'border' && styles.bordered,
        type === 'text' && styles.textButton,
        type === 'shadow' && [styles.shadow, { shadowColor: colors.background }],
        rounded && styles.rounded,
        fullWidth && styles.fullWidth,
        inactive && styles.inactive,
        style,
      ]}
      {...rest}
    >
      {!inactive && (
        <Animated.View
          pointerEvents="none"
          style={[styles.ripple, { backgroundColor: colors.ripple }, rippleStyle]}
        />
      )}
      <View style={[styles.content, iconPosition === 'right' && styles.contentReversed]}>
        {loading ? <ActivityIndicator size="small" color={colors.text} /> : icon}
        {label}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Spacing.three,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  bordered: {
    borderWidth: 1.5,
  },
  textButton: {
    borderWidth: 0,
    paddingHorizontal: Spacing.two,
  },
  shadow: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'visible',
  },
  rounded: {
    borderRadius: 999,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  inactive: {
    opacity: 0.5,
  },
  ripple: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  contentReversed: {
    flexDirection: 'row-reverse',
  },
  label: {
    textAlign: 'center',
  },
});
