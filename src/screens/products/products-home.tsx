import React from "react";
import { Navigate } from "react-router-dom";
import { Sidebar } from "../../relic-ui/components/misc/sidebar";
import {
  RelicRoutes,
  RouteWithOutlet,
  RouteWithPopup,
} from "../../relic-ui/utils/routes";
import { AddCategoryForm } from "./category/add-category";
import { CategoryView } from "./category/category-view";
import { AddProduct } from "./view/add-product";
import { ProductView } from "./view/products-view";

export const ProductHome = () => {
  return (
    <div className="h-full">
      <Sidebar
        items={[
          {
            label: "View Products",
            path: "view",
          },
          {
            label: "Categories",
            path: "categories",
          },
        ]}
      >
        <RelicRoutes
          routes={{
            "": <Navigate to="view" />,
            view: {
              default: RouteWithOutlet(<ProductView />),
              "add-product": RouteWithPopup(<AddProduct />),
              "edit/:id": RouteWithPopup(<AddProduct />),
            },
            categories: {
              default: RouteWithOutlet(<CategoryView />),
              "add-category": RouteWithPopup(<AddCategoryForm />),
              "edit-category/:id": RouteWithPopup(<AddCategoryForm />),
            },
          }}
        />
      </Sidebar>
    </div>
  );
};
