import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Palette, PaletteShades, StatusColors } from '@/constants/palette';
import { Colors, Spacing, type ThemeColor } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTheme } from '@/hooks/use-theme';

export type ColorSwatchProps = {
  color: string;
  label: string;
};

/** One color chip with its name and hex value. */
export function ColorSwatch({ color, label }: ColorSwatchProps) {
  const theme = useTheme();

  return (
    <View style={styles.swatch} accessibilityLabel={`${label}, ${color}`}>
      <View style={[styles.chip, { backgroundColor: color, borderColor: theme.border }]} />
      <ThemedText type="label" numberOfLines={1}>
        {label}
      </ThemedText>
      <ThemedText type="caption" numberOfLines={1}>
        {color}
      </ThemedText>
    </View>
  );
}

/** The brand scale for the current color scheme. */
export function PaletteScale() {
  const mode = useColorScheme() === 'dark' ? 'dark' : 'light';

  return (
    <View style={styles.grid}>
      {PaletteShades.map((shade) => (
        <ColorSwatch key={shade} label={String(shade)} color={Palette[mode][shade]} />
      ))}
    </View>
  );
}

/** Every semantic theme token for the current color scheme. */
export function ThemeTokens() {
  const theme = useTheme();
  const tokens = Object.keys(Colors.light) as ThemeColor[];

  return (
    <View style={styles.grid}>
      {tokens.map((token) => (
        <ColorSwatch key={token} label={token} color={theme[token]} />
      ))}
    </View>
  );
}

/** Status colors for the current color scheme. */
export function StatusSwatches() {
  const mode = useColorScheme() === 'dark' ? 'dark' : 'light';

  return (
    <View style={styles.grid}>
      <ColorSwatch label="success" color={StatusColors[mode].success} />
      <ColorSwatch label="danger" color={StatusColors[mode].danger} />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  swatch: {
    width: 88,
    gap: Spacing.half,
  },
  chip: {
    height: 48,
    borderRadius: Spacing.two,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: Spacing.one,
  },
});
