import { css } from "@emotion/react";
import chroma from "chroma-js";
import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../auth/user-hook";
import { Container } from "../relic-ui/components/misc/container";
import { ThemeSwitcher } from "../relic-ui/components/misc/theme-switcher";
import { getAppColors } from "../relic-ui/theme/theme";
import { useRTheme } from "../relic-ui/theme/theme.hooks";
import { CommonIcons } from "../relic-ui/utils/icons";

export const QuickSettings = () => {
  const theme = useRTheme();
  const user = useUser();
  const navigate = useNavigate();

  return (
    <div className="w-[300px] h-[270px]  flex flex-col p-4 select-none">
      <div
        className="rounded-xl bg-surfaceVariant30 w-full px-3
         py-4 flex text-xs space-x-2 transition-all items-center
        "
      >
        <div className="rounded-full w-6 h-6 bg-surfaceVariant40"></div>
        <div className="flex flex-col pl-1">
          <div className="flex-1 text-base truncate">
            {user.data?.name ?? "---"}
          </div>
          <div className="text-xs leading-tight truncate">
            {user.data?.email ?? "---"}
          </div>
        </div>
      </div>

      <div className="flex pt-4 space-x-2">
        <QButton
          icon={
            theme.theme.themeMode === "dark" ? (
              <CommonIcons.Eye size={50} />
            ) : (
              <CommonIcons.NightSky size={50} />
            )
          }
          label={theme.theme.themeMode === "dark" ? "Go Light!" : "Go Dark!"}
          onClick={() => {
            theme.toggleThemeMode();
          }}
          bgColor={getAppColors().inverseSurface}
          textColor={getAppColors().inverseOnSurface}
        />
        <QButton
          icon={<CommonIcons.Logout size={50} />}
          label={"Logout"}
          onClick={() => {
            signOut(getAuth());
            navigate("/");
          }}
          bgColor={chroma("red").alpha(0.6).css()}
          textColor={"white"}
        />
      </div>

      <div className="bg-black/20 h-full w-full rounded-2xl mt-4"></div>
    </div>
  );
};

const QButton = (props: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  bgColor: string;
  textColor: string;
}) => {
  return (
    <div
      css={css`
        background-color: ${chroma(props.bgColor).alpha(1).css()};
        color: ${chroma(props.textColor).alpha(1).css()};
        opacity: 1;
        &:hover {
          opacity: 0.8;
        }
      `}
      className="
             min-h-[100px] max-h-[100px] w-full h-full
          rounded-2xl flex  items-center justify-center
        p-2 cursor-pointer transition-all relative"
      onClick={props.onClick}
    >
      <div className="flex flex-col pb-2 items-center">
        {props.icon}
        <p className="absolute bottom-[4px] text-[10px]">{props.label}</p>
      </div>
    </div>
  );
};
