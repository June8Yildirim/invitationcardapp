import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

/** Shows every ThemedButton variant, tone, size and state. */
export function ButtonVariantsShowcase() {
  const [loading, setLoading] = useState(false);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <View style={styles.container}>
      <ThemedText type="overline">Variants</ThemedText>
      <View style={styles.row}>
        <ThemedButton onPress={() => {}}>Primary</ThemedButton>
        <ThemedButton type="secondary" onPress={() => {}}>
          Secondary
        </ThemedButton>
        <ThemedButton type="border" onPress={() => {}}>
          Border
        </ThemedButton>
        <ThemedButton type="text" onPress={() => {}}>
          Text
        </ThemedButton>
        <ThemedButton type="shadow" onPress={() => {}}>
          Shadow
        </ThemedButton>
      </View>

      <ThemedText type="overline">Tones</ThemedText>
      <View style={styles.row}>
        <ThemedButton tone="accent" onPress={() => {}}>
          Accent
        </ThemedButton>
        <ThemedButton tone="neutral" onPress={() => {}}>
          Neutral
        </ThemedButton>
        <ThemedButton tone="success" onPress={() => {}}>
          Accept
        </ThemedButton>
        <ThemedButton tone="danger" type="border" onPress={() => {}}>
          Decline
        </ThemedButton>
      </View>

      <ThemedText type="overline">Sizes</ThemedText>
      <View style={styles.row}>
        <ThemedButton size="small" onPress={() => {}}>
          Small
        </ThemedButton>
        <ThemedButton size="medium" onPress={() => {}}>
          Medium
        </ThemedButton>
        <ThemedButton size="large" onPress={() => {}}>
          Large
        </ThemedButton>
      </View>

      <ThemedText type="overline">Shape & states</ThemedText>
      <View style={styles.row}>
        <ThemedButton rounded onPress={() => {}}>
          Rounded
        </ThemedButton>
        <ThemedButton disabled onPress={() => {}}>
          Disabled
        </ThemedButton>
        <ThemedButton loading={loading} onPress={simulateLoading}>
          {loading ? 'Sending…' : 'Tap to load'}
        </ThemedButton>
      </View>
      <ThemedButton fullWidth rounded size="large" onPress={() => {}}>
        Full width RSVP
      </ThemedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.three,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
});
