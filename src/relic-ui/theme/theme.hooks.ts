import { useAtom } from "jotai";
import { RTheme } from "./theme";
import { RColorSchemeMode, RThemeMode } from "./theme.types";

export const useRTheme = () => {
  const [theme, setTheme] = useAtom(RTheme.themeAtom);

  const setThemeMode = (mode: RThemeMode) => {
    RTheme.setThemeMode(mode, theme.colorSchemeMode);
    setTheme({
      themeMode: mode,
      colorSchemeMode: theme.colorSchemeMode,
    });
  };

  const setColorSchemeMode = (colorScheme: RColorSchemeMode) => {
    RTheme.setThemeMode(theme.themeMode!, colorScheme);
    setTheme({
      themeMode: theme.themeMode,
      colorSchemeMode: colorScheme,
    });
  };

  const toggleThemeMode = () => {
    setThemeMode(theme.themeMode === "light" ? "dark" : "light");
  };

  const preInit = () => {
    RTheme.preInit();
    if (theme.themeMode == null) {
      setTheme({
        themeMode: RTheme.getCurrentThemeMode(),
        colorSchemeMode: RTheme.getCurrentColorSchemeMode(),
      });
    } else {
      setThemeMode(theme.themeMode);
    }
  };

  return {
    theme,
    setThemeMode,
    setColorSchemeMode,
    toggleThemeMode,
    preInit,
  };
};
