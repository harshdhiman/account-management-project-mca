import React from "react";
import { Container } from "../../misc/container";

const gif_wait = "https://c.tenor.com/RG-yObB_TeQAAAAd/chill-cute.gif";
const gif_mrbean = "https://c.tenor.com/2WtBkf2YI00AAAAd/bean-mr.gif";

export const GifLoader = ({
  hideText = false,
  ...props
}: {
  mainText?: string;
  subText?: string;
  hideText?: boolean;
}) => {
  return (
    <div className="flex flex-col items-center justify-center pt-4 select-none pointer-events-none">
      <img
        width={100}
        height={100}
        className="object-cover w-[100px] h-[100px] rounded-2xl opacity-80"
        src={gif_wait}
        alt="Loading"
      />
      {!hideText && (
        <div className="flex flex-col items-center justify-center pt-8">
          <p>{props.mainText ?? "Loading..."}</p>
          <p className="text-xs opacity-70 italic pt-1">
            {props.subText ?? "Something Hot is cooking up!"}
          </p>
        </div>
      )}
    </div>
  );
};
