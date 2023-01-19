import React from "react";
import { CenterContainer } from "../relic-ui/components/misc/container";
const g = "https://c.tenor.com/40A4taEpX78AAAAd/tom-and-jerry-preparing.gif";
export const NoPage = () => {
  return (
    <CenterContainer>
      <div className="flex flex-col items-center justify-center pt-4 select-none pointer-events-none">
        <img
          width={400}
          height={400}
          className="object-cover w-[400px] h-[400px] rounded-2xl opacity-80"
          src={g}
          alt="Loading"
        />

        <div className="flex flex-col items-center justify-center pt-8">
          <p>{"It's not yet completed"}</p>
          <p className="text-xs opacity-70 italic pt-1">
            {"Something Hot is cooking up!"}
          </p>
        </div>
      </div>
    </CenterContainer>
  );
};
