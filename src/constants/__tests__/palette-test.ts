import { Palette, PaletteShades } from '@/constants/palette';
import { Colors } from '@/constants/theme';

it('runs the light scale from #9ECEB0 to #1C211F', () => {
  expect(PaletteShades).toEqual([100, 200, 300, 400, 500, 600, 700, 800, 900]);
  expect(Palette.light[100]).toBe('#9ECEB0');
  expect(Palette.light[900]).toBe('#1C211F');
});

it('mirrors the light scale in dark mode, keeping 900 as the darkest shade', () => {
  for (const shade of [100, 200, 300, 400, 500, 600, 700, 800] as const) {
    expect(Palette.dark[shade]).toBe(Palette.light[(900 - shade) as typeof shade]);
  }
  expect(Palette.dark[900]).toBe(Palette.light[900]);
});

it('defines the same theme tokens for both modes', () => {
  expect(Object.keys(Colors.dark).sort()).toEqual(Object.keys(Colors.light).sort());
});
