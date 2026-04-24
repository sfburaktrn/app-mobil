export const tokens = {
  color: {
    bg: '#071C12',
    // Dark "glass" surface so text stays readable on any photo/background.
    surface: 'rgba(6, 21, 14, 0.72)',
    surfaceStrong: 'rgba(6, 21, 14, 0.82)',
    border: 'rgba(245,230,200,0.14)',
    borderStrong: 'rgba(245,230,200,0.22)',
    text: '#F5E6C8',
    textMuted: 'rgba(245,230,200,0.82)',
    textFaint: 'rgba(245,230,200,0.62)',
    gold: '#D4AF37',
    deepGreen: '#0B2E1C',
  },
  radius: {
    md: 16,
    lg: 18,
    xl: 22,
  },
  space: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 18,
    xl: 24,
  },
  font: {
    title: { fontSize: 28, fontWeight: '800' as const },
    h1: { fontSize: 34, fontWeight: '800' as const },
    body: { fontSize: 16 },
    small: { fontSize: 13 },
  },
} as const;

