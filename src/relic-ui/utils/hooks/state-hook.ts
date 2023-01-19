import { useState } from "react";

export const useRState = <T>(initialState: T) => {
  const [state, setState] = useState(initialState);
  const updateState = (newState: T) => {
    setState(newState);
  };
  return {
    get value() {
      return state;
    },
    set value(newState: T) {
      updateState(newState);
    },
  };
};
