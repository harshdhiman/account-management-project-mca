import React from "react";
import { Navigate } from "react-router-dom";
import { Sidebar } from "../../relic-ui/components/misc/sidebar";
import { RelicRoutes, RouteWithOutlet } from "../../relic-ui/utils/routes";
import { SettingsProfile } from "./settings-profile";

export const SettingsHome = () => {
  return (
    <div className="h-full">
      <Sidebar
        items={[
          {
            label: "Profile",
            path: "profile",
          },
        ]}
      >
        <RelicRoutes
          routes={{
            "": <Navigate to="profile" />,
            profile: {
              default: RouteWithOutlet(<SettingsProfile />),
              //   add: RouteWithPopup(<TransactionAdd />),
            },
          }}
        />
      </Sidebar>
    </div>
  );
};
