/**
 * Design token definitions.
 * All colour and visual values live here — update this file to retheme the site.
 */

export const theme = {
  // Gradient background colours (3-stop animated shift)
  gradientA: '#0a0e1a', // deep midnight navy
  gradientB: '#0d1b2a', // dark ocean blue
  gradientC: '#0f2137', // slate navy

  // Accent
  accent: '#5EEAD4',       // teal
  accentDim: '#2DD4BF',    // slightly saturated variant for hover states
  accentMuted: 'rgba(94, 234, 212, 0.15)', // for subtle backgrounds

  // Glass surface
  glassBackground: 'rgba(255, 255, 255, 0.07)',
  glassBorder: 'rgba(255, 255, 255, 0.12)',
  glassBlur: '16px',
  glassShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',

  // Text
  textPrimary: '#E2E8F0',   // slate-200
  textSecondary: '#94A3B8', // slate-400
  textMuted: '#64748B',     // slate-500

  // Surface
  surfaceElevated: 'rgba(255, 255, 255, 0.04)',
}

export default theme
