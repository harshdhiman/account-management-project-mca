import React from "react";
import { useRTheme } from "../../theme/theme.hooks";

export const ThemeSwitcher = () => {
  const theme = useRTheme();

  return (
    <div>
      <button onClick={() => theme.toggleThemeMode()}>Theme</button>
    </div>
  );
};
