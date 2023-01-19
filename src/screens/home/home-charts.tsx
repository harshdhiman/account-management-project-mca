import { Timestamp } from "firebase/firestore";
import React from "react";
import { useCustomers } from "../../providers/customers/customer-data";
import { useProducts } from "../../providers/products/product-data";
import { useTransactions } from "../../providers/transactions/transaction-data";
import { GifLoader } from "../../relic-ui/components/base/loader/gif-loader";
import { CenterContainer } from "../../relic-ui/components/misc/container";
import { ErrorContainer } from "../../relic-ui/components/misc/error-container";
import { CommonIcons } from "../../relic-ui/utils/icons";
import { formatMoney } from "../../relic-ui/utils/misc";
import { DashChart } from "./dash-chart";

export const HomeCharts = () => {
  const transactions = useTransactions();
  const products = useProducts();
  const customers = useCustomers();

  if (transactions.loadingAny || products.loadingAny || customers.loadingAny) {
    return (
      <CenterContainer>
        <GifLoader />
      </CenterContainer>
    );
  }

  if (
    !transactions.data?.length ||
    !products.data?.length ||
    !customers.data?.length
  ) {
    return (
      <CenterContainer>
        <h1>No Data</h1>
      </CenterContainer>
    );
  }

  const last30Days = transactions.data!.filter((t) => {
    const date = (t.date as unknown as Timestamp).toDate();
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays <= 30;
  });

  const stockBuyValue = products.data!.reduce((acc, p) => {
    return acc + p.stock * p.buyingPrice;
  }, 0);
  const stockValue = products.data!.reduce((acc, p) => {
    return acc + p.stock * p.sellingPrice;
  }, 0);

  const soldLast30Days = last30Days.reduce((acc, t) => {
    return acc + t.grandTotal;
  }, 0);

  const profitLast30Days = soldLast30Days - stockBuyValue;

  return (
    <div className="flex flex-col p-4 justify-center h-full pb-10">
      {/* Strip */}

      <div className="flex justify-center ">
        <Item
          label="Sold in last 30 Days"
          icon={<CommonIcons.Money size={40} />}
        >
          <p>{formatMoney(soldLast30Days)}</p>
          <p className="text-xs px-1 opacity-50">
            {formatMoney(soldLast30Days, {
              decimalCount: 0,
              long: true,
            })}
          </p>
        </Item>
        <Item label="Stock Value" icon={<CommonIcons.Boxes size={40} />}>
          <p>{formatMoney(stockValue)}</p>
          <p className="text-xs px-1 opacity-50">
            {formatMoney(stockValue, {
              decimalCount: 0,
              long: true,
            })}
          </p>
        </Item>

        <Item
          label="PROFIT In Last 30 Days"
          icon={<CommonIcons.TrendingUp size={40} />}
        >
          <div className="text-tertiary">
            <p>{formatMoney(profitLast30Days)}</p>
            <p className="text-xs px-1 opacity-50">
              {formatMoney(profitLast30Days, {
                decimalCount: 0,
                long: true,
              })}
            </p>
          </div>
        </Item>
        <Item label="Customers" icon={<CommonIcons.People size={40} />}>
          <div className="">
            <p>{customers.data!.length}</p>
            <p className="text-xs px-1 opacity-50">--</p>
          </div>
        </Item>
      </div>

      {/*  */}

      <DashChart transactions={transactions.data!} />
    </div>
  );
};

const Item = (props: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div
      style={{
        width: 300,
        height: 160,
        minWidth: 300,
        minHeight: 160,
      }}
      className={`mx-[4px]   px-4 py-3 rounded-xl border-[2px] border-surfaceVariant20 flex flex-col relative`}
    >
      {props.icon}
      <div className="uppercase opacity-80 pt-3">{props.label}</div>
      <div className="text-4xl text-primary pt-4">{props.children}</div>
    </div>
  );
};
