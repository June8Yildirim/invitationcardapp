import { StyleSheet, Text, View } from 'react-native';

import { Fonts } from '@/constants/theme';
import type { InvitationDetails } from '@/lib/invitation';

export function InvitationCard({ invitation }: { invitation: InvitationDetails }) {
  const { heading, eventName, date, time, place } = invitation;
  const when = [date, time].filter(Boolean).join(' · ');

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.eventName}>{eventName}</Text>
      {when ? <Text style={styles.detail}>{when}</Text> : null}
      {place ? <Text style={styles.detail}>{place}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 8,
    padding: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#C9A36A',
    backgroundColor: '#14110C',
  },
  heading: {
    fontSize: 12,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    color: '#C9A36A',
    textAlign: 'center',
  },
  eventName: { fontFamily: Fonts?.serif, fontSize: 24, color: '#F2E6CF', textAlign: 'center' },
  detail: { fontFamily: Fonts?.serif, fontSize: 15, color: '#C9A36A', textAlign: 'center' },
});
