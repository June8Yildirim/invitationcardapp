import { fireEvent, render, screen } from '@testing-library/react-native';

import CardsScreen from '@/app/index';
import { cardDesigns } from '@/components/cards/card-designs';

jest.mock('@/components/durin-gate/durin-gate', () => ({
  DurinGate: ({ children }: { children: React.ReactNode }) => children,
}));
jest.mock('@/components/durin-gate/gate-thumbnail', () => ({
  GateThumbnail: () => null,
}));
jest.mock('expo-symbols', () => ({ SymbolView: () => null }));
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

it('gives every design a unique id', () => {
  const ids = cardDesigns.map((design) => design.id);
  expect(new Set(ids).size).toBe(ids.length);
});

it('previews a card when its row is touched, and closes again', async () => {
  await render(<CardsScreen />);
  expect(screen.queryByText('Your event name')).toBeNull();

  await fireEvent.press(screen.getByLabelText(`Preview ${cardDesigns[0].name}`));
  expect(screen.getByText('Your event name')).toBeOnTheScreen();

  await fireEvent.press(screen.getByLabelText('Close preview'));
  expect(screen.queryByText('Your event name')).toBeNull();
});
