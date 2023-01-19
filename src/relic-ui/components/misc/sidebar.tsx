import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimateSharedLayout, motion } from "framer-motion";
import { CommonIcons } from "../../utils/icons";
import { useUser } from "../../../auth/user-hook";
import { QuickPopup } from "../../utils/quick-popup";
import { QuickSettings } from "../../../_components/quick-settings";

export interface SideBarItem {
  label: string;
  path: string;
  alwaysActive?: boolean;
}

export const Sidebar = (props: {
  children: React.ReactNode;
  items: SideBarItem[];
  alignUp?: boolean;
  minWidth?: string | number;
}) => {
  const path = useLocation();
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex ">
      {/* Left Part */}

      <div
        style={{
          width: props.minWidth || "200px",
          minWidth: props.minWidth || "200px",
        }}
        className={`flex flex-col  ${
          props.alignUp ? "justify-start" : "justify-between"
        }`}
      >
        <div></div>
        <div className="flex flex-col">
          {props.items.map((item, index) => {
            const isActive =
              item.alwaysActive || path.pathname.split("/")[2] === item.path;

            return (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className={`select-none cursor-pointer px-4 py-2  transition-all flex items-center space-x-1
              ${isActive ? " text-primary " : " opacity-80 "}
              `}
              >
                {isActive && (
                  <motion.div layoutId="sidebar-active" className="">
                    <CommonIcons.Next />
                  </motion.div>
                )}
                <div className="transition-all">{item.label}</div>
              </div>
            );
          })}
        </div>

        {/* Bottom */}

        <div className="p-2">
          <QuickPopup
            id="user-card"
            popup={<QuickSettings />}
            offsetTop={-220}
            offsetLeft={130}
          >
            <UserCard />
          </QuickPopup>
        </div>
      </div>
      {/* Right Part */}
      <div className="flex-1">{props.children}</div>
    </div>
  );
};

function UserCard() {
  const user = useUser();

  return (
    <div
      className="rounded-xl bg-surface20 w-full px-3 py-4 flex text-xs space-x-2 select-none cursor-pointer
    hover:bg-surface30 transition-all group
    "
    >
      <div className="rounded-full w-4 h-4 bg-surface"></div>
      <div className="flex-1 truncate">{user.data?.name}</div>
      <div className="pr-1 group-hover:opacity-70 opacity-0 transition-all">
        <CommonIcons.Settings size={14} />
      </div>
    </div>
  );
}
