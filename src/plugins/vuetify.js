import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const darkTheme = {
  dark: true,
  colors: {
    background:  '#0a0e1a',
    surface:     '#0d1b2a',
    primary:     '#5EEAD4',
    'primary-darken-1': '#2DD4BF',
    secondary:   '#94A3B8',
    error:       '#F87171',
    warning:     '#FBBF24',
    info:        '#60A5FA',
    success:     '#34D399',
  },
}

const lightTheme = {
  dark: false,
  colors: {
    background:  '#F8FAFC',
    surface:     '#FFFFFF',
    primary:     '#0D9488',
    'primary-darken-1': '#0F766E',
    secondary:   '#475569',
    error:       '#DC2626',
    warning:     '#D97706',
    info:        '#2563EB',
    success:     '#059669',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: darkTheme,
      light: lightTheme,
    },
  },
  defaults: {
    VBtn: {
      variant: 'flat',
      rounded: 'lg',
    },
    VCard: {
      rounded: 'xl',
      elevation: 0,
    },
  },
})
