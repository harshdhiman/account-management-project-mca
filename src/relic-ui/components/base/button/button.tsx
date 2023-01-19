import { css, Interpolation, Theme } from "@emotion/react";
import React from "react";
import { RiAddFill } from "react-icons/ri";
import { IoMdArrowRoundForward } from "react-icons/io";
import { getAppColors } from "../../../theme/theme";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { RotatingLines, TailSpin } from "react-loader-spinner";
import { useRTheme } from "../../../theme/theme.hooks";

export type ButtonProps = React.ClassAttributes<HTMLButtonElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    css?: Interpolation<Theme>;
  };

export type RelicButtonProps = {
  leftIcon?: React.ReactNode | "add";
  rightIcon?: React.ReactNode | "next";
  loading?: boolean | string;
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  padding?: string;
  innderPaddingLeft?: number;
  innderPaddingRight?: number;
  offsetContent?: boolean;
  loadingSpinnerSize?: number;
  width?: string | number;
};

type CombinedButtonProps = ButtonProps & RelicButtonProps;

export const TextButton = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className="cursor-pointer select-none text-primary hover:opacity-70 transition-all"
    >
      {props.children}
    </button>
  );
};

export const Button = (props: CombinedButtonProps) => {
  const theme = useRTheme();
  ///

  const {
    leftIcon,
    rightIcon,
    loading,
    bgColor,
    textColor,
    padding,
    innderPaddingLeft,
    innderPaddingRight,
    hoverBgColor,
    offsetContent,
    loadingSpinnerSize,
    width,
    ...rest
  } = props;

  ///

  // const [parent] = useAutoAnimate<HTMLButtonElement>();
  const disabled = props.disabled || props.loading != undefined;

  //

  var leftNode =
    props.leftIcon === "add" ? <RiAddFill size={15} /> : props.leftIcon;
  var rightNode =
    props.rightIcon === "next" ? <IoMdArrowRoundForward /> : props.rightIcon;

  if (props.loading !== undefined) {
    leftNode = (
      <RotatingLines
        strokeColor={getAppColors().onSurface}
        animationDuration="1"
        width={`${loadingSpinnerSize ?? 20}px`}
      />
    );
    rightNode = null;
  }

  const content = (
    <>
      {leftNode}
      {!(
        props.loading !== undefined && props.loading.toString().length === 0
      ) && (
        <span
          style={{
            paddingLeft: leftNode ? 0 : innderPaddingLeft === undefined ? 8 : 0,
            paddingRight: rightNode
              ? 0
              : innderPaddingRight === undefined
              ? 8
              : 0,
          }}
          className={`${
            (offsetContent === undefined ? true : offsetContent)
              ? "translate-y-[1px]"
              : ""
          } min-w-fit  w-full `}
        >
          {props.loading !== undefined
            ? props.loading?.toString() !== "true"
              ? props.loading
              : "Loading..."
            : props.children}
        </span>
      )}
      {rightNode}
    </>
  );

  return (
    <button
      {...rest}
      onClick={props.onClick}
      style={{
        backgroundColor: disabled
          ? getAppColors().surface20
          : bgColor || getAppColors().primary,
        color: props.loading
          ? getAppColors().onSurface
          : disabled
          ? getAppColors().surface50
          : textColor || getAppColors().onPrimary,
      }}
      css={css`
        opacity: ${disabled ? 0.5 : 1};
        cursor: ${disabled ? "not-allowed" : "pointer"};
        pointer-events: ${disabled ? "none" : "auto"};
        padding: ${padding};
        width: ${width};
        &:hover {
          background-color: ${hoverBgColor};
        }
      `}
      className={`select-none text-sm
         transition-all
        px-3 py-2 rounded-md font-semibold
        hover:opacity-80 active:opacity-100
        inline-flex items-center space-x-2
        relative  ${props.className ?? ""}
    `}
    >
      {content}
    </button>
  );
};
