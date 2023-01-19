import { RThemeColors, RThemeMode } from "./theme.types";

export function setThemeColorsToCSS(mode: RThemeMode) {
  const _cssVars: { [key: string]: string } = {
    "--mdc-primary": `var(--md-sys-color-primary-${mode})`,
    "--mdc-on-primary": `var(--md-sys-color-on-primary-${mode})`,
    "--mdc-primary-container": `var(--md-sys-color-primary-container-${mode})`,
    "--mdc-on-primary-container": `var(--md-sys-color-on-primary-container-${mode})`,
    "--mdc-secondary": `var(--md-sys-color-secondary-${mode})`,
    "--mdc-on-secondary": `var(--md-sys-color-on-secondary-${mode})`,
    "--mdc-secondary-container": `var(--md-sys-color-secondary-container-${mode})`,
    "--mdc-on-secondary-container": `var(--md-sys-color-on-secondary-container-${mode})`,
    "--mdc-tertiary": `var(--md-sys-color-tertiary-${mode})`,
    "--mdc-on-tertiary": `var(--md-sys-color-on-tertiary-${mode})`,
    "--mdc-tertiary-container": `var(--md-sys-color-tertiary-container-${mode})`,
    "--mdc-on-tertiary-container": `var(--md-sys-color-on-tertiary-container-${mode})`,
    "--mdc-error": `var(--md-sys-color-error-${mode})`,
    "--mdc-on-error": `var(--md-sys-color-on-error-${mode})`,
    "--mdc-error-container": `var(--md-sys-color-error-container-${mode})`,
    "--mdc-on-error-container": `var(--md-sys-color-on-error-container-${mode})`,
    "--mdc-outline": `var(--md-sys-color-outline-${mode})`,
    "--mdc-background": `var(--md-sys-color-background-${mode})`,
    "--mdc-on-background": `var(--md-sys-color-on-background-${mode})`,
    "--mdc-surface": `var(--md-sys-color-surface-${mode})`,
    "--mdc-on-surface": `var(--md-sys-color-on-surface-${mode})`,
    "--mdc-surface-variant": `var(--md-sys-color-surface-variant-${mode})`,
    "--mdc-on-surface-variant": `var(--md-sys-color-on-surface-variant-${mode})`,
    "--mdc-inverse-surface": `var(--md-sys-color-inverse-surface-${mode})`,
    "--mdc-inverse-on-surface": `var(--md-sys-color-inverse-on-surface-${mode})`,
  };

  /// Color Palette
  const addColorPallete = (pallete: string) => {
    for (let i = 10; i <= 100; i += 10) {
      _cssVars[
        `--mdc-palette-${pallete}${i}`
      ] = `var(--md-ref-palette-${pallete}${mode === "dark" ? i : 110 - i})`;
    }
  };

  addColorPallete("primary");
  addColorPallete("secondary");
  addColorPallete("tertiary");
  addColorPallete("neutral");
  addColorPallete("neutral-variant");

  const root = document.body;
  Object.keys(_cssVars).forEach((key) => {
    root.style.setProperty(key, _cssVars[key]);
  });
}

export function getThemeColorsFromCSS() {
  const root = document.body;
  function getColor(color: string) {
    return window.getComputedStyle(root).getPropertyValue(color).trim();
  }
  const appColors: RThemeColors = {
    primary: getColor("--mdc-primary"),
    onPrimary: getColor("--mdc-on-primary"),
    primaryContainer: getColor("--mdc-primary-container"),
    onPrimaryContainer: getColor("--mdc-on-primary-container"),
    secondary: getColor("--mdc-secondary"),
    onSecondary: getColor("--mdc-on-secondary"),
    secondaryContainer: getColor("--mdc-secondary-container"),
    onSecondaryContainer: getColor("--mdc-on-secondary-container"),
    tertiary: getColor("--mdc-tertiary"),
    onTertiary: getColor("--mdc-on-tertiary"),
    tertiaryContainer: getColor("--mdc-tertiary-container"),
    onTertiaryContainer: getColor("--mdc-on-tertiary-container"),
    error: getColor("--mdc-error"),
    onError: getColor("--mdc-on-error"),
    errorContainer: getColor("--mdc-error-container"),
    onErrorContainer: getColor("--mdc-on-error-container"),
    outline: getColor("--mdc-outline"),
    background: getColor("--mdc-background"),
    onBackground: getColor("--mdc-on-background"),
    surface: getColor("--mdc-surface"),
    onSurface: getColor("--mdc-on-surface"),
    surfaceVariant: getColor("--mdc-surface-variant"),
    onSurfaceVariant: getColor("--mdc-on-surface-variant"),
    inverseSurface: getColor("--mdc-inverse-surface"),
    inverseOnSurface: getColor("--mdc-inverse-on-surface"),
    //
    primary10: getColor("--mdc-palette-primary10"),
    primary20: getColor("--mdc-palette-primary20"),
    primary30: getColor("--mdc-palette-primary30"),
    primary40: getColor("--mdc-palette-primary40"),
    primary50: getColor("--mdc-palette-primary50"),
    primary60: getColor("--mdc-palette-primary60"),
    primary70: getColor("--mdc-palette-primary70"),
    primary80: getColor("--mdc-palette-primary80"),
    primary90: getColor("--mdc-palette-primary90"),
    primary100: getColor("--mdc-palette-primary100"),
    //
    secondary10: getColor("--mdc-palette-secondary10"),
    secondary20: getColor("--mdc-palette-secondary20"),
    secondary30: getColor("--mdc-palette-secondary30"),
    secondary40: getColor("--mdc-palette-secondary40"),
    secondary50: getColor("--mdc-palette-secondary50"),
    secondary60: getColor("--mdc-palette-secondary60"),
    secondary70: getColor("--mdc-palette-secondary70"),
    secondary80: getColor("--mdc-palette-secondary80"),
    secondary90: getColor("--mdc-palette-secondary90"),
    secondary100: getColor("--mdc-palette-secondary100"),
    //
    tertiary10: getColor("--mdc-palette-tertiary10"),
    tertiary20: getColor("--mdc-palette-tertiary20"),
    tertiary30: getColor("--mdc-palette-tertiary30"),
    tertiary40: getColor("--mdc-palette-tertiary40"),
    tertiary50: getColor("--mdc-palette-tertiary50"),
    tertiary60: getColor("--mdc-palette-tertiary60"),
    tertiary70: getColor("--mdc-palette-tertiary70"),
    tertiary80: getColor("--mdc-palette-tertiary80"),
    tertiary90: getColor("--mdc-palette-tertiary90"),
    tertiary100: getColor("--mdc-palette-tertiary100"),
    //
    surface10: getColor("--mdc-palette-neutral10"),
    surface20: getColor("--mdc-palette-neutral20"),
    surface30: getColor("--mdc-palette-neutral30"),
    surface40: getColor("--mdc-palette-neutral40"),
    surface50: getColor("--mdc-palette-neutral50"),
    surface60: getColor("--mdc-palette-neutral60"),
    surface70: getColor("--mdc-palette-neutral70"),
    surface80: getColor("--mdc-palette-neutral80"),
    surface90: getColor("--mdc-palette-neutral90"),
    surface100: getColor("--mdc-palette-neutral100"),
    //
    surfaceVariant10: getColor("--mdc-palette-neutral-variant10"),
    surfaceVariant20: getColor("--mdc-palette-neutral-variant20"),
    surfaceVariant30: getColor("--mdc-palette-neutral-variant30"),
    surfaceVariant40: getColor("--mdc-palette-neutral-variant40"),
    surfaceVariant50: getColor("--mdc-palette-neutral-variant50"),
    surfaceVariant60: getColor("--mdc-palette-neutral-variant60"),
    surfaceVariant70: getColor("--mdc-palette-neutral-variant70"),
    surfaceVariant80: getColor("--mdc-palette-neutral-variant80"),
    surfaceVariant90: getColor("--mdc-palette-neutral-variant90"),
    surfaceVariant100: getColor("--mdc-palette-neutral-variant100"),
  };

  return appColors;
}
