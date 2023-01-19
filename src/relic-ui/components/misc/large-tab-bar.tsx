import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeSwitcher } from "./theme-switcher";

export type LargeTabBarItem = {
  label: string;
  icon: React.ReactNode;
  path: string;
};

export const LargeTabBar = (props: {
  items: LargeTabBarItem[];
  children: React.ReactNode;
}) => {
  const path = useLocation();

  return (
    <div className="h-full flex flex-col overflow-hidden select-none">
      <div className="flex mx-2 py-4 pb-6 overflow-x-auto overflow-y-hidden">
        {props.items.map((item, i) => {
          const isSelected =
            path.pathname.split("/")[1] === item.path.split("/")[1];
          return <Item key={item.path} item={item} selected={isSelected} />;
        })}
      </div>
      <div className="h-full flex flex-col">{props.children}</div>
    </div>
  );
};

const Item = (props: { item: LargeTabBarItem; selected: boolean }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(props.item.path);
      }}
      style={{
        width: 160,
        height: 90,
        minWidth: 160,
        minHeight: 90,
      }}
      className={`mx-[4px]  px-4 py-3 rounded-xl border-2 border-surfaceVariant flex flex-col relative
        cursor-pointer transition-all hover:bg-surfaceVariant
        ${
          props.selected
            ? "bg-surfaceVariant text-onSurfaceVariant drop-shadow-lg"
            : ""
        }
      `}
    >
      <div className="font-semibold">{props.item.label}</div>

      <div
        className={`absolute bottom-0 right-0 px-3 py-2 text-2xl opacity-60 ${
          props.selected ? "text-primary" : ""
        }`}
      >
        {props.item.icon}
      </div>
    </div>
  );
};
