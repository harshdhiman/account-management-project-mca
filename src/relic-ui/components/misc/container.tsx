import { Interpolation, Theme } from "@emotion/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import React from "react";

type HTMLProps = React.ClassAttributes<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement> & {
    css?: Interpolation<Theme>;
  };

export const Container = (props: HTMLProps) => (
  <div {...props} className={props.className || "flex flex-col"} />
);

export const ContainerRow = (props: HTMLProps) => (
  <div {...props} className={props.className || "flex flex-row"} />
);

export const ContainerWithAutoAnimate = (props: HTMLProps) => {
  const [parent] = useAutoAnimate<HTMLDivElement>();
  return (
    <div
      {...props}
      ref={parent}
      className={props.className || "flex flex-col"}
    />
  );
};

export const CenterContainer = (props: HTMLProps) => (
  <div
    {...props}
    className={
      props.className || "flex h-full flex-col items-center justify-center"
    }
  />
);
