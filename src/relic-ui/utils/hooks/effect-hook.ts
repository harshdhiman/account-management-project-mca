import React from "react";

export const onMount = (callback: () => void | Promise<void>) => {
  React.useEffect(() => {
    callback();
  }, []);
};
