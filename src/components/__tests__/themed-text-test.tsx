import { render, screen } from '@testing-library/react-native';

import { ThemedText } from '@/components/themed-text';

it('renders its children', async () => {
  await render(<ThemedText>You are invited</ThemedText>);

  expect(screen.getByText('You are invited')).toBeOnTheScreen();
});
