import { Route, Routes } from "react-router-dom";
import { ContainerWithAutoAnimate } from "../relic-ui/components/misc/container";
import { LargeTabBar } from "../relic-ui/components/misc/large-tab-bar";
import { CommonIcons } from "../relic-ui/utils/icons";
import { NoPage } from "../_components/no-page";
import { CustomerHome } from "./customers/customer-home";
import { EmployeeHome } from "./employee/employee-home";
import { ExpensesHome } from "./expenses/expenses-home";
import { HomeHome } from "./home/home-home";
import { ProductHome } from "./products/products-home";
import { SettingsHome } from "./settings/settings-home";
import { TrasactionsHome } from "./transactions/transactions-home";

export const Home = () => {
  return (
    <LargeTabBar
      items={[
        {
          label: "Home",
          icon: <CommonIcons.HotMeal />,
          path: "/",
        },
        {
          label: "Products",
          icon: <CommonIcons.Boxes />,
          path: "/products",
        },
        {
          label: "Customers",
          icon: <CommonIcons.People />,
          path: "/customers",
        },
        {
          label: "Employees",
          icon: <CommonIcons.Employees />,
          path: "/employees",
        },
        {
          label: "Trasactions",
          icon: <CommonIcons.Money2 />,
          path: "/transactions",
        },
        {
          label: "Expenses",
          icon: <CommonIcons.Money3 />,
          path: "/expenses",
        },
        {
          label: "Reports",
          icon: <CommonIcons.Reports />,
          path: "/reports",
        },
        {
          label: "Settings",
          icon: <CommonIcons.Settings />,
          path: "/settings",
        },
      ]}
    >
      <Routes>
        <Route path="/" element={<HomeHome />} />
        <Route path="/products/*" element={<ProductHome />} />
        <Route path="/customers/*" element={<CustomerHome />} />
        <Route path="/employees/*" element={<EmployeeHome />} />
        <Route path="/transactions/*" element={<TrasactionsHome />} />
        <Route path="/settings/*" element={<SettingsHome />} />
        <Route path="/expenses/*" element={<ExpensesHome />} />
        <Route path="/reports/*" element={<NoPage />} />
      </Routes>
    </LargeTabBar>
  );
};
