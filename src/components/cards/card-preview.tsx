import { SymbolView } from 'expo-symbols';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { type CardDesign, previewInvitation } from './card-designs';

/** Plays a card full screen. Mounted fresh each time, so it always starts from the beginning. */
export function CardPreview({ design, onClose }: { design?: CardDesign; onClose: () => void }) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={!!design} animationType="fade" onRequestClose={onClose}>
      <View style={styles.screen}>
        {design ? <design.Preview invitation={previewInvitation} /> : null}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close preview"
          hitSlop={8}
          onPress={onClose}
          style={({ pressed }) => [
            styles.close,
            { top: insets.top + 8 },
            pressed && styles.closePressed,
          ]}
        >
          {Platform.OS === 'ios' ? (
            <SymbolView name="xmark" size={16} tintColor="#D8E6FF" />
          ) : (
            <Text style={styles.closeLabel}>✕</Text>
          )}
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0B0E12' },
  close: {
    position: 'absolute',
    left: 12,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: 'rgba(11, 14, 18, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(216, 230, 255, 0.35)',
  },
  closePressed: { opacity: 0.6 },
  closeLabel: { fontSize: 16, color: '#D8E6FF' },
});
