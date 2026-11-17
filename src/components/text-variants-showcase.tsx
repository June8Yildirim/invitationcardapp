import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

/** Shows every ThemedText variant and its modifiers. */
export function TextVariantsShowcase() {
  return (
    <View style={styles.container}>
      <ThemedText type="overline">Headings</ThemedText>
      <ThemedText type="display">Display</ThemedText>
      <ThemedText type="h1">Heading 1</ThemedText>
      <ThemedText type="h2">Heading 2</ThemedText>
      <ThemedText type="h3">Heading 3</ThemedText>

      <ThemedText type="overline">Body</ThemedText>
      <ThemedText type="bodyLarge">Body large: an intro paragraph.</ThemedText>
      <ThemedText type="body">Body: standard reading text for descriptions.</ThemedText>
      <ThemedText type="caption">Caption: secondary details and timestamps</ThemedText>

      <ThemedText type="overline">UI</ThemedText>
      <ThemedText type="label">Label</ThemedText>
      <ThemedText type="button">Button text</ThemedText>
      <ThemedText type="code">const code = true;</ThemedText>

      <ThemedText type="overline">Emphasis</ThemedText>
      <ThemedText type="semiBold">Semi bold: emphasised body text</ThemedText>
      <ThemedText type="miniText">Mini text: compact supporting copy</ThemedText>

      <ThemedText type="overline">Cards</ThemedText>
      <ThemedText type="cardTitle">Card title</ThemedText>
      <ThemedText type="cardSubtitle">Card subtitle · Saturday, 14 June</ThemedText>
      <ThemedText type="cardBody">Card body: muted details about the event.</ThemedText>

      <ThemedText type="overline">Feedback</ThemedText>
      <ThemedText type="error">Error: please enter a valid email address</ThemedText>

      <ThemedText type="overline">Invitation</ThemedText>
      <ThemedText type="script" align="center">
        Emma & Liam
      </ThemedText>
      <ThemedText type="quote" align="center">
        “Together with their families, request the pleasure of your company.”
      </ThemedText>

      <ThemedText type="overline">Tones</ThemedText>
      <ThemedText tone="primary">Primary</ThemedText>
      <ThemedText tone="secondary">Secondary</ThemedText>
      <ThemedText tone="accent">Accent</ThemedText>
      <ThemedText tone="success">Success: RSVP received</ThemedText>
      <ThemedText tone="danger">Danger: this field is required</ThemedText>

      <ThemedText type="overline">Modifiers</ThemedText>
      <ThemedText type="body" weight="bold">
        Body with weight=&quot;bold&quot;
      </ThemedText>
      <ThemedText type="body" italic>
        Body with italic
      </ThemedText>
      <ThemedText type="body" align="right">
        Body with align=&quot;right&quot;
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two,
  },
});
