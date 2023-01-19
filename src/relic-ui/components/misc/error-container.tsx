import React from "react";
import { getAppColors } from "../../theme/theme";
import { useRTheme } from "../../theme/theme.hooks";
import { CommonIcons } from "../../utils/icons";

import chroma from "chroma-js";

export const ErrorContainer = (props: {
  children?: React.ReactNode;
  errorTitle?: string;
  error?: string;
}) => {
  useRTheme();

  return (
    <div
      style={{
        backgroundColor: chroma(getAppColors().onErrorContainer)
          .alpha(0.1)
          .css(),
      }}
      className="flex flex-col items-center justify-center
         text-onErrorContainer rounded-2xl px-8 py-4 select-none"
    >
      {/*  */}
      <CommonIcons.Error size={60} />
      <h3 className="pt-4 font-semibold text-base">
        {props.errorTitle ?? "Error!"}
      </h3>
      <p className="pt-3">
        {props.error ?? "We caught an error, you might not be interested in..."}
      </p>
      {props.children}
    </div>
  );
};
