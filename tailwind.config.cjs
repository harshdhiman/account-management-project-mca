/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        relic: ["relic", "gs", "Inter var", "sans-serif"],
        sans: ["gs", "Inter var", "sans-serif"],
      },
      colors: {
        primary: "var(--mdc-primary)",
        onPrimary: "var(--mdc-on-primary)",
        primaryContainer: "var(--mdc-primary-container)",
        onPrimaryContainer: "var(--mdc-on-primary-container)",
        secondary: "var(--mdc-secondary)",
        onSecondary: "var(--mdc-on-secondary)",
        secondaryContainer: "var(--mdc-secondary-container)",
        onSecondaryContainer: "var(--mdc-on-secondary-container)",
        tertiary: "var(--mdc-tertiary)",
        onTertiary: "var(--mdc-on-tertiary)",
        tertiaryContainer: "var(--mdc-tertiary-container)",
        onTertiaryContainer: "var(--mdc-on-tertiary-container)",
        error: "var(--mdc-error)",
        onError: "var(--mdc-on-error)",
        errorContainer: "var(--mdc-error-container)",
        onErrorContainer: "var(--mdc-on-error-container)",
        outline: "var(--mdc-outline)",
        background: "var(--mdc-background)",
        onBackground: "var(--mdc-on-background)",
        surface: "var(--mdc-surface)",
        onSurface: "var(--mdc-on-surface)",
        surfaceVariant: "var(--mdc-surface-variant)",
        onSurfaceVariant: "var(--mdc-on-surface-variant)",
        inverseSurface: "var(--mdc-inverse-surface)",
        inverseOnSurface: "var(--mdc-inverse-on-surface)",

        primaryLight: "var(--md-sys-color-primary-light)",
        onPrimaryLight: "var(--md-sys-color-on-primary-light)",
        primaryContainerLight: "var(--md-sys-color-primary-container-light)",
        onPrimaryContainerLight:
          "var(--md-sys-color-on-primary-container-light)",
        secondaryLight: "var(--md-sys-color-secondary-light)",
        onSecondaryLight: "var(--md-sys-color-on-secondary-light)",
        secondaryContainerLight:
          "var(--md-sys-color-secondary-container-light)",
        onSecondaryContainerLight:
          "var(--md-sys-color-on-secondary-container-light)",
        tertiaryLight: "var(--md-sys-color-tertiary-light)",
        onTertiaryLight: "var(--md-sys-color-on-tertiary-light)",
        tertiaryContainerLight: "var(--md-sys-color-tertiary-container-light)",
        onTertiaryContainerLight:
          "var(--md-sys-color-on-tertiary-container-light)",
        errorLight: "var(--md-sys-color-error-light)",
        onErrorLight: "var(--md-sys-color-on-error-light)",
        errorContainerLight: "var(--md-sys-color-error-container-light)",
        onErrorContainerLight: "var(--md-sys-color-on-error-container-light)",
        outlineLight: "var(--md-sys-color-outline-light)",
        backgroundLight: "var(--md-sys-color-background-light)",
        onBackgroundLight: "var(--md-sys-color-on-background-light)",
        surfaceLight: "var(--md-sys-color-surface-light)",
        onSurfaceLight: "var(--md-sys-color-on-surface-light)",
        surfaceVariantLight: "var(--md-sys-color-surface-variant-light)",
        onSurfaceVariantLight: "var(--md-sys-color-on-surface-variant-light)",
        inverseSurfaceLight: "var(--md-sys-color-inverse-surface-light)",
        inverseOnSurfaceLight: "var(--md-sys-color-inverse-on-surface-light)",
        //
        primaryDark: "var(--md-sys-color-primary-dark)",
        onPrimaryDark: "var(--md-sys-color-on-primary-dark)",
        primaryContainerDark: "var(--md-sys-color-primary-container-dark)",
        onPrimaryContainerDark: "var(--md-sys-color-on-primary-container-dark)",
        secondaryDark: "var(--md-sys-color-secondary-dark)",
        onSecondaryDark: "var(--md-sys-color-on-secondary-dark)",
        secondaryContainerDark: "var(--md-sys-color-secondary-container-dark)",
        onSecondaryContainerDark:
          "var(--md-sys-color-on-secondary-container-dark)",
        tertiaryDark: "var(--md-sys-color-tertiary-dark)",
        onTertiaryDark: "var(--md-sys-color-on-tertiary-dark)",
        tertiaryContainerDark: "var(--md-sys-color-tertiary-container-dark)",
        onTertiaryContainerDark:
          "var(--md-sys-color-on-tertiary-container-dark)",
        errorDark: "var(--md-sys-color-error-dark)",
        onErrorDark: "var(--md-sys-color-on-error-dark)",
        errorContainerDark: "var(--md-sys-color-error-container-dark)",
        onErrorContainerDark: "var(--md-sys-color-on-error-container-dark)",
        outlineDark: "var(--md-sys-color-outline-dark)",
        backgroundDark: "var(--md-sys-color-background-dark)",
        onBackgroundDark: "var(--md-sys-color-on-background-dark)",
        surfaceDark: "var(--md-sys-color-surface-dark)",
        onSurfaceDark: "var(--md-sys-color-on-surface-dark)",
        surfaceVariantDark: "var(--md-sys-color-surface-variant-dark)",
        onSurfaceVariantDark: "var(--md-sys-color-on-surface-variant-dark)",
        inverseSurfaceDark: "var(--md-sys-color-inverse-surface-dark)",
        inverseOnSurfaceDark: "var(--md-sys-color-inverse-on-surface-dark)",

        primary10: "var(--mdc-palette-primary10)",
        primary20: "var(--mdc-palette-primary20)",
        primary30: "var(--mdc-palette-primary30)",
        primary40: "var(--mdc-palette-primary40)",
        primary50: "var(--mdc-palette-primary50)",
        primary60: "var(--mdc-palette-primary60)",
        primary70: "var(--mdc-palette-primary70)",
        primary80: "var(--mdc-palette-primary80)",
        primary90: "var(--mdc-palette-primary90)",
        primary100: "var(--mdc-palette-primary100)",

        secondary10: "var(--mdc-palette-secondary10)",
        secondary20: "var(--mdc-palette-secondary20)",
        secondary30: "var(--mdc-palette-secondary30)",
        secondary40: "var(--mdc-palette-secondary40)",
        secondary50: "var(--mdc-palette-secondary50)",
        secondary60: "var(--mdc-palette-secondary60)",
        secondary70: "var(--mdc-palette-secondary70)",
        secondary80: "var(--mdc-palette-secondary80)",
        secondary90: "var(--mdc-palette-secondary90)",
        secondary100: "var(--mdc-palette-secondary100)",

        tertiary10: "var(--mdc-palette-tertiary10)",
        tertiary20: "var(--mdc-palette-tertiary20)",
        tertiary30: "var(--mdc-palette-tertiary30)",
        tertiary40: "var(--mdc-palette-tertiary40)",
        tertiary50: "var(--mdc-palette-tertiary50)",
        tertiary60: "var(--mdc-palette-tertiary60)",
        tertiary70: "var(--mdc-palette-tertiary70)",
        tertiary80: "var(--mdc-palette-tertiary80)",
        tertiary90: "var(--mdc-palette-tertiary90)",
        tertiary100: "var(--mdc-palette-tertiary100)",

        surface10: "var(--mdc-palette-neutral10)",
        surface20: "var(--mdc-palette-neutral20)",
        surface30: "var(--mdc-palette-neutral30)",
        surface40: "var(--mdc-palette-neutral40)",
        surface50: "var(--mdc-palette-neutral50)",
        surface60: "var(--mdc-palette-neutral60)",
        surface70: "var(--mdc-palette-neutral70)",
        surface80: "var(--mdc-palette-neutral80)",
        surface90: "var(--mdc-palette-neutral90)",
        surface100: "var(--mdc-palette-neutral100)",

        surfaceVariant10: "var(--mdc-palette-neutral-variant10)",
        surfaceVariant20: "var(--mdc-palette-neutral-variant20)",
        surfaceVariant30: "var(--mdc-palette-neutral-variant30)",
        surfaceVariant40: "var(--mdc-palette-neutral-variant40)",
        surfaceVariant50: "var(--mdc-palette-neutral-variant50)",
        surfaceVariant60: "var(--mdc-palette-neutral-variant60)",
        surfaceVariant70: "var(--mdc-palette-neutral-variant70)",
        surfaceVariant80: "var(--mdc-palette-neutral-variant80)",
        surfaceVariant90: "var(--mdc-palette-neutral-variant90)",
        surfaceVariant100: "var(--mdc-palette-neutral-variant100)",
      },
    },
  },
  plugins: [],
};