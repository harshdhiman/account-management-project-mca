import { css } from "@emotion/react";
import React from "react";
import { TextShuffler } from "../../relic-ui/components/super/text-shuffler";
import { RTheme } from "../../relic-ui/theme/theme";
import { onMount } from "../../relic-ui/utils/hooks/effect-hook";
import { sleep } from "../../relic-ui/utils/misc";

export const SplashScreen = (props: { onComplete: () => void }) => {
  onMount(async () => {
    await sleep(100);
    props.onComplete();
  });

  return (
    <div className="h-full flex items-center justify-center">
      {/*  */}

      <div
        style={{
          backgroundImage: `url(${RTheme.getThemeImage()})`,
          height: "12vw",
          fontSize: "8vw",
        }}
        css={css`
          background-size: 400% 400%;
          animation: gradient 8s ease infinite;
          height: 100vh;
          @keyframes gradient {
            0% {
              background-position: 0% 50%;
              color: transparent;
            }
            50% {
              background-position: 100% 50%;
              color: #000;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
        className="py-6 px-4 rounded-2xl font-bold flex items-center justify-center
          
        "
      >
        <TextShuffler>AccountMan</TextShuffler>
      </div>

      {/*  */}
    </div>
  );
};
