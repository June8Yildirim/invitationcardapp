import { StyleSheet, View } from 'react-native';

import { ThemedButton } from '@/components/themed-button';
import { ThemedCard } from '@/components/themed-card';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** Shows every ThemedCard variant and slot. */
export function CardVariantsShowcase() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ThemedCard title="Filled" subtitle={'variant="filled" (default)'}>
        Card body text uses the cardBody style and the secondary text color.
      </ThemedCard>

      <ThemedCard variant="outlined" title="Outlined" subtitle="Border, no fill">
        Good for lists of items on a busy background.
      </ThemedCard>

      <ThemedCard variant="elevated" title="Elevated" subtitle="Fill plus a soft shadow">
        Draws attention to the most important card on a screen.
      </ThemedCard>

      <ThemedCard
        variant="elevated"
        padding="large"
        media={
          <View style={[styles.media, { backgroundColor: theme.tint }]}>
            <ThemedText type="script" style={{ color: theme.buttonText }}>
              Emma & Liam
            </ThemedText>
          </View>
        }
        title="Wedding celebration"
        subtitle="Saturday, 14 June · 4:00 PM"
        footer={
          <>
            <ThemedButton size="small" rounded onPress={() => {}}>
              Accept
            </ThemedButton>
            <ThemedButton size="small" rounded type="border" onPress={() => {}}>
              Decline
            </ThemedButton>
          </>
        }
      >
        Join us at the Old Mill for dinner and dancing.
      </ThemedCard>

      <ThemedCard
        variant="outlined"
        padding="small"
        onPress={() => {}}
        accessibilityLabel="Open invitation"
      >
        <ThemedText type="label">Pressable card</ThemedText>
        <ThemedText type="caption">Pass onPress to make the whole card tappable.</ThemedText>
      </ThemedCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.three,
  },
  media: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
