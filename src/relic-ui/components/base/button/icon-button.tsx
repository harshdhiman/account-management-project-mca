import React from "react";
import { getAppColors } from "../../../theme/theme";
import { RemoveTypes } from "../../../utils/misc";
import { Button, ButtonProps, RelicButtonProps } from "./button";

type RelicIconButtonProps = RemoveTypes<
  RelicButtonProps,
  RelicButtonProps["leftIcon"] | RelicButtonProps["rightIcon"] | "loading"
> &
  ButtonProps;

export const IconButton = (
  props: RelicIconButtonProps & {
    loading?: boolean;
  }
) => {
  return (
    <Button
      {...props}
      padding={props.padding || "8px"}
      innderPaddingLeft={0}
      innderPaddingRight={0}
      bgColor="transparent"
      textColor="inherit"
      hoverBgColor={getAppColors().surfaceVariant}
      offsetContent={false}
      loading={props.loading ? "" : undefined}
      loadingSpinnerSize={14}
    >
      {props.children}
    </Button>
  );
};
