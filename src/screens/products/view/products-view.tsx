import {
  InventoryProduct,
  productsDataHeadings,
  useProducts,
} from "../../../providers/products/product-data";
import { Unit } from "../../../providers/units/unit";
import { DataWaiter } from "../../../relic-ui/components/base/loader/data-waiter";
import { CommonIcons } from "../../../relic-ui/utils/icons";
import { formatMoney } from "../../../relic-ui/utils/misc";
import { DataViewer } from "../../../_components/data-viewer";

export const ProductView = () => {
  const products = useProducts();

  return (
    <DataWaiter
      loading={products.loading === "loadLoading"}
      error={products.error}
    >
      <DataViewer<InventoryProduct>
        data={products.data!}
        searchFn={(v, d) =>
          d.filter((p) => p.name.toLowerCase().includes(v.toLowerCase()))
        }
        columnsHeadings={productsDataHeadings}
        excludeColumns={["id", "unit", "quantity"]}
        renderRow={(d) => ({
          ...d,
          taxPerc:
            d.taxPerc +
            "% " +
            `(${formatMoney(d.sellingPrice * (d.taxPerc / 100))})`,
          buyingPrice: Unit.formatPrice(d.buyingPrice, d.unit, d.quantity),
          sellingPrice: (
            <div className="flex space-x-2 items-center text-green-500">
              <p className="text-onBackground">
                {Unit.formatPrice(d.sellingPrice, d.unit, d.quantity)}
              </p>
              {d.buyingPrice < d.sellingPrice && <CommonIcons.TrendingUp />}
              <p>
                (
                {formatMoney(d.sellingPrice - d.buyingPrice, {
                  decimalCount: 0,
                  short: true,
                })}
                )
              </p>
            </div>
          ),
          quantity: d.quantity + " " + d.unit.name,
          stock:
            d.stock.toString().length > 0
              ? d.stock +
                ` (${formatMoney(d.stock * d.sellingPrice, {
                  decimalCount: 0,
                  short: true,
                })})`
              : "---",
        })}
        //
        addButton={{
          text: "Add Product",
          navigate: "add-product",
        }}
        //
        actions={{
          edit: (row) => ({ to: `edit/${row.id}` }),
          delete: (row) => {
            products.remove(row.id!);
          },
        }}
        //
        conditionalCellStyles={(e) => {
          return [
            {
              when: (row) => {
                if (e !== "stock") return false;
                const stk = products.data!.find((p) => p.id === row.id)!.stock;
                return stk.toString().length > 0 ? stk <= 3 : false;
              },
              style: {
                color: "red",
              },
            },
          ];
        }}
      />
    </DataWaiter>
  );
};
