import { Outlet, Route, Routes } from "react-router-dom";
import { PopupMaker } from "./popup";

// TYPES

export type RelicRouteChildrenType = {
  default: JSX.Element;
  [key: string]: JSX.Element;
};
export type RelicRoutesType = {
  [key: string]: JSX.Element | RelicRouteChildrenType;
};

//

// Adds Outlet to the current Route's Component
export function RouteWithOutlet(Component: JSX.Element) {
  return (
    <>
      {Component}
      <Outlet />
    </>
  );
}

export function RouteWithPopup(Component: JSX.Element) {
  return <PopupMaker>{Component}</PopupMaker>;
}

// Relic Routes
export const RelicRoutes = (props: { routes: RelicRoutesType }) => {
  return (
    <Routes>
      {Object.keys(props.routes).map((key) => {
        const El = props.routes[key];
        if ((El as RelicRouteChildrenType).default) {
          const routesChildren = El as RelicRouteChildrenType;
          const routePath = !key.endsWith("/*") ? `${key}/*` : key;
          return (
            <Route key={key} path={routePath} element={routesChildren.default}>
              {Object.keys(routesChildren)
                .filter((k) => k !== "default")
                .map((key) => {
                  return (
                    <Route key={key} path={key} element={routesChildren[key]} />
                  );
                })}
            </Route>
          );
        }
        return <Route key={key} path={key} element={El as JSX.Element} />;
      })}
    </Routes>
  );
};
