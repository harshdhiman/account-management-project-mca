import React, { useEffect, useRef, useState } from "react";
import { useInterval } from "../../utils/hooks/misc-hook";
import { useRState } from "../../utils/hooks/state-hook";

export const TextShuffler = (props: { children: string }) => {
  const [text, setText] = useState("");
  const shuffledText = useRState("");

  const nextCharIn = useRef(0);
  const currentChar = useRef(0);
  useInterval(() => {
    if (currentChar.current! === props.children.length) {
      shuffledText.value = "";
      return true;
    } else {
      if (nextCharIn.current! >= 3) {
        nextCharIn.current! = 0;
        setText(props.children.slice(0, currentChar.current! + 1));
        currentChar.current!++;
      }
      nextCharIn.current!++;
      let shuffledTextValue = "";
      let last = props.children.length;
      //   let last = (currentChar.current! + 1) % (props.children.length + 1);
      for (let i = currentChar.current!; i < last; i++) {
        shuffledTextValue += String.fromCharCode(
          Math.floor(Math.random() * 26) + 97
        );
      }
      shuffledText.value = shuffledTextValue;
    }
  }, 50);

  return (
    <div className="flex  items-center justify-center select-none ">
      <div className="">{text}</div>
      {shuffledText.value.split("").map((char, index) => {
        return (
          <div key={index} className="font-mono">
            {char}
          </div>
        );
      })}
    </div>
  );
};
