import { StyleSheet, View } from 'react-native';

import { PaletteScale, StatusSwatches, ThemeTokens } from '@/components/color-swatch';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

/** Shows the brand scale, status colors and semantic tokens for the current mode. */
export function ColorPaletteShowcase() {
  return (
    <View style={styles.container}>
      <ThemedText type="overline">Brand scale · #9ECEB0 → #1C211F</ThemedText>
      <PaletteScale />

      <ThemedText type="overline">Status</ThemedText>
      <StatusSwatches />

      <ThemedText type="overline">Theme tokens</ThemedText>
      <ThemeTokens />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.three,
  },
});
