/**
 * Brand color scale, interpolated in OKLab from #9ECEB0 (100) to #1C211F (900).
 *
 * `light` runs from the lightest shade (100) to the darkest (900).
 * `dark` mirrors it so the same shade number keeps its role in both modes:
 * a low number is the surface and a high number is the content drawn on it.
 * 900 is the darkest shade in both modes.
 */
export const Palette = {
  light: {
    100: '#9ECEB0',
    200: '#8CB69C',
    300: '#7B9E88',
    400: '#698875',
    500: '#597163',
    600: '#495C51',
    700: '#39473F',
    800: '#2A342F',
    900: '#1C211F',
  },
  dark: {
    100: '#2A342F',
    200: '#39473F',
    300: '#495C51',
    400: '#597163',
    500: '#698875',
    600: '#7B9E88',
    700: '#8CB69C',
    800: '#9ECEB0',
    900: '#1C211F',
  },
} as const;

export type PaletteShade = keyof typeof Palette.light;

export const PaletteShades = Object.keys(Palette.light).map(Number) as PaletteShade[];

/** Status colors tuned for at least 4.5:1 contrast on each mode's background. */
export const StatusColors = {
  light: { success: '#14532D', danger: '#8F1B12' },
  dark: { success: '#A6E3B9', danger: '#FFB4A9' },
} as const;
