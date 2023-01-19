import { Timestamp } from "firebase/firestore";
import React from "react";
import { Chart, AxisOptions } from "react-charts";
import { Transaction } from "../../providers/transactions/transaction-data";
import { getAppColors } from "../../relic-ui/theme/theme";
import { useRTheme } from "../../relic-ui/theme/theme.hooks";

export const DashChart = (props: { transactions: Transaction[] }) => {
  const theme = useRTheme();
  const primaryAxis = React.useMemo(
    (): AxisOptions<Transaction> => ({
      getValue: (datum) => (datum.date as unknown as Timestamp).toDate(),
    }),
    []
  );
  const secondaryAxes = React.useMemo(
    (): AxisOptions<Transaction>[] => [
      {
        getValue: (datum) => datum.grandTotal,
      },
    ],
    []
  );

  return (
    <div className="w-full h-[400px] p-10 relative">
      <Chart<Transaction>
        options={{
          brush: {
            style: {
              fill: getAppColors().primary,
              stroke: getAppColors().primary,
              opacity: 0.2,
            },
          },
          defaultColors: [getAppColors().primary, getAppColors().primary],
          dark: theme.theme.themeMode === "dark",

          data: [
            {
              data: props.transactions,
              color: "red",
            },
          ],
          tooltip: {
            show: false,
          },
          getSeriesStyle: (series, status) => {
            return {
              color: getAppColors().primary,
            };
          },
          primaryAxis,
          secondaryAxes,
        }}
      />
    </div>
  );
};
