import React from "react";
import "./fonts.css";
import { useRTheme } from "./theme.hooks";

import "./theme.css";
import "./packs/t1.css";

export const ThemeProvider = (props: { children: React.ReactNode }) => {
  const { preInit } = useRTheme();

  React.useEffect(() => {
    const initializer = async () => {
      preInit();
    };
    initializer();
  }, []);

  return (
    <div
      className="h-full
    text-sm
    "
    >
      {props.children}
    </div>
  );
};
