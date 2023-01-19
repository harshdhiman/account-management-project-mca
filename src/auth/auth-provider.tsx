import React, { useEffect } from "react";
import { ContainerWithAutoAnimate } from "../relic-ui/components/misc/container";
import { onMount } from "../relic-ui/utils/hooks/effect-hook";
import { useRState } from "../relic-ui/utils/hooks/state-hook";
import { sleep } from "../relic-ui/utils/misc";
import { SplashScreen } from "../_components/misc/splash-screen";
import { useAuth } from "./auth-hook";

export const AuthProvider = (props: {
  children: React.ReactNode;
  noAuthChildren: React.ReactNode;
}) => {
  const auth = useAuth();
  const splashCompleted = useRState(false);
  const firstCheck = useRState(true);

  function onComplete() {
    splashCompleted.value = true;
    firstCheck.value = false;
  }

  return (
    <ContainerWithAutoAnimate className="h-full">
      {(() => {
        //
        if ((!splashCompleted.value || auth.loading) && firstCheck.value) {
          return <SplashScreen onComplete={onComplete} />;
        }

        //

        if (auth.user) {
          return props.children;
        }

        return props.noAuthChildren;
      })()}
    </ContainerWithAutoAnimate>
  );
};
