import React from "react";
import DataTable, { createTheme, TableProps } from "react-data-table-component";
import { getAppColors } from "../../theme/theme";
import { useRTheme } from "../../theme/theme.hooks";

export function RelicDataTable<T>(props: TableProps<T>) {
  const theme = useRTheme();
  function getColor(color: string) {
    return window
      .getComputedStyle(document.body)
      .getPropertyValue(color)
      .trim();
  }
  const dark = createTheme(
    "d1",
    {
      text: {
        primary: getColor("--md-sys-color-on-backgroud-dark"),
        secondary: getColor("--md-sys-color-on-backgroud-dark"),
      },
      background: {
        default: getColor("--md-sys-color-backgroud-dark"),
      },
      context: {
        background: getColor("--md-sys-color-backgroud-dark"),
        text: getColor("--md-sys-color-on-backgroud-dark"),
      },
      divider: {
        default: getColor("--md-sys-color-outline-dark"),
      },
      button: {
        default: "#2aa198",
        hover: "rgba(0,0,0,.08)",
        focus: "rgba(255,255,255,.12)",
        disabled: "rgba(255, 255, 255, .34)",
      },
      sortFocus: {
        default: getColor("--md-sys-color-on-backgroud-dark"),
      },
    },
    "dark"
  );
  const light = createTheme(
    "l1",
    {
      text: {
        primary: getColor("--md-sys-color-on-backgroud-light"),
        secondary: getColor("--md-sys-color-on-backgroud-light"),
      },
      background: {
        default: getColor("--md-sys-color-backgroud-light"),
      },
      context: {
        background: getColor("--md-sys-color-backgroud-light"),
        text: getColor("--md-sys-color-on-backgroud-light"),
      },
      divider: {
        default: getColor("--md-sys-color-outline-light"),
      },
      button: {
        default: "#2aa198",
        hover: "rgba(0,0,0,.08)",
        focus: "rgba(255,255,255,.12)",
        disabled: "rgba(255, 255, 255, .34)",
      },
      sortFocus: {
        default: getColor("--md-sys-color-on-backgroud-light"),
      },
    },
    "light"
  );

  return (
    <DataTable
      {...props}
      theme={theme.theme.themeMode === "dark" ? "d1" : "l1"}
      dense
    />
  );
}
