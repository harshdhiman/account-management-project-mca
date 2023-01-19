import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  Customer,
  useCustomers,
} from "../../../providers/customers/customer-data";
import { useProducts } from "../../../providers/products/product-data";
import {
  Transaction,
  TransactionProduct,
  transactionProductDataHeadings,
  useTransactions,
} from "../../../providers/transactions/transaction-data";
import { Unit } from "../../../providers/units/unit";
import { Button } from "../../../relic-ui/components/base/button/button";
import { IconButton } from "../../../relic-ui/components/base/button/icon-button";
import { Form, useRelicForm } from "../../../relic-ui/components/base/form";
import { InputBase } from "../../../relic-ui/components/base/input/input-base";
import { SelectBase } from "../../../relic-ui/components/base/input/select";
import { Container } from "../../../relic-ui/components/misc/container";
import { CommonIcons } from "../../../relic-ui/utils/icons";
import { formatMoney } from "../../../relic-ui/utils/misc";
import { QuickPopup } from "../../../relic-ui/utils/quick-popup";
import { DataViewer } from "../../../_components/data-viewer";
import { CustomerAdd } from "../../customers/view/customer-add";
import { TransactionProductAdd } from "./ts-product-add";

export const TransactionAdd = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const transactions = useTransactions();
  const transaction = transactions.data?.find((p) => p.id === id);

  const customers = useCustomers();
  const inventoryProducts = useProducts();

  const [customer, setCustomer] = useState<Customer | undefined>(
    customers.data?.find((p) => p.id === transaction?.customerId)
  );

  const [customerId, setCustomerId] = useState(transaction?.customerId ?? "");
  const [customerName, setCustomerName] = useState(
    transaction?.customerName ?? ""
  );
  const [customerPhone, setCustomerPhone] = useState(
    transaction?.customerPhone ?? ""
  );
  const [transactionProducts, setTransactionProducts] = useState<
    TransactionProduct[]
  >([]);

  //
  const total = transactionProducts.reduce(
    (acc, curr) => acc + curr.totalPrice,
    0
  );
  const tax = transactionProducts.reduce((acc, curr) => {
    const price = curr.netPrice - curr.totalPrice;
    return acc + price;
  }, 0);
  const netTotal = total + tax;
  //
  const [discount, setDiscount] = useState(transaction?.discount ?? 0);

  const grandTotal = netTotal - discount;
  //

  //   const [payment, setPayment] = useState(transaction?.payment ?? 0);
  //   const [change, setChange] = useState(transaction?.change ?? 0);
  //   const [paid, setPaid] = useState(transaction?.paid ?? false);

  const [date, setDate] = useState(transaction?.date ?? new Date());

  const onSubmit = async () => {
    const _customerId = customerId;
    const _customerName = customerName;
    const _customerPhone = customerPhone;
    const _transactionProducts = transactionProducts;
    const _discount = discount;
    const _date = date;

    const hasData =
      _customerId &&
      _customerName &&
      _customerPhone &&
      _transactionProducts.length > 0 &&
      _discount >= 0 &&
      _date;

    if (!hasData) {
      toast.error("Please fill all the fields");
      return;
    }

    var profit = _transactionProducts.reduce((acc, curr) => {
      const p = inventoryProducts.data?.find((p) => p.id === curr.productId);
      const originalPrice = Unit.calculatePrice(
        p?.buyingPrice ?? 0,
        p?.unit ?? Unit.getDefaultUnit(),
        curr.quantityPurchased,
        curr.quantityPerUnit
      );
      return acc + (curr.netPrice - originalPrice);
    }, 0);
    profit = profit - _discount;

    if (id) {
      // NO UPDATES
    } else {
      // new
      const p: Transaction = {
        date: _date,
        customerId: _customerId,
        customerName: _customerName,
        customerPhone: _customerPhone,
        products: _transactionProducts,
        total: total,
        tax: tax,
        discount: _discount,
        discountType: "amount",
        netTotal: netTotal,
        grandTotal: grandTotal,
        payment: grandTotal,
        change: 0,
        paid: true,
        profit: profit,
      };
      const nID = await transactions.add(p);
      await customers.update(_customerId, {
        ...customer!,
        transactions: [...(customer?.transactions ?? []), nID!],
      });

      // update inventory
      _transactionProducts.forEach(async (tp) => {
        const product = inventoryProducts.data?.find(
          (ip) => ip.id === tp.productId
        );
        if (product) {
          await inventoryProducts.update(product.id!, {
            ...product,
            stock: product.stock - tp.quantityPurchased,
          });
        }
      });
    }
    navigate(-1);
  };

  useEffect(() => {
    if (customerId) {
      const c = customers.data?.find((c) => c.id === customerId);
      setCustomer(c);
      setCustomerName(c?.name ?? "");
      setCustomerPhone(c?.phone ?? "");
    }
  }, [customers.data]);

  return (
    <div
      className="bg-surfaceVariant 
        text-onSurfaceVariant rounded-lg p-2 
        
        overflow-auto max-h-screen  flex flex-col"
    >
      <Container>
        <h1 className="px-2 py-2 ">Transaction</h1>

        {/* Top */}
        <div className="flex space-x-2">
          {/* Set  1 */}
          <div className="flex flex-col w-full p-3 bg-black/20 rounded-lg">
            <InputBase
              label="Date"
              validator={(v) => {
                if (!v) return "required";
              }}
              type={"date"}
              value={date.toISOString().split("T")[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
            />
            <div className="flex space-x-2 w-full items-end">
              <SelectBase
                className="w-full"
                label="Customer Name"
                validator={(v) => {
                  if (!v) return "required";
                }}
                value={
                  customer?.id
                    ? {
                        value: customer?.id ?? "",
                        label:
                          customer.name +
                          (customer.phone && ` (${customer.phone}) `),
                      }
                    : undefined
                }
                options={
                  customers.data?.map((c) => ({
                    value: c.id!,
                    label: c.name + (c.phone && ` (${c.phone}) `),
                  })) ?? []
                }
                onChange={(e) => {
                  const c = customers.data?.find((c) => c.id === e!.value);
                  setCustomer(c);
                  setCustomerId(c?.id ?? "");
                  setCustomerName(c?.name ?? "");
                  setCustomerPhone(c?.phone ?? "");
                }}
              />
              <div className="pt-4 h-full">
                <QuickPopup
                  id="customer-add"
                  popup={<CustomerAdd />}
                  height="100%"
                  onClose={(d) => {
                    console.log(d);
                    if (d) {
                      setCustomerId(d);
                    }
                  }}
                >
                  <Button className="h-full">
                    <CommonIcons.Add />
                  </Button>
                </QuickPopup>
              </div>
            </div>
            <InputBase
              label="Customer Phone"
              validator={(v) => {
                if (!v) return "required";
              }}
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </div>
          {/*  */}

          {/* Set  2 */}

          <div className="flex flex-col space-y-3 w-full p-3 bg-black/20 rounded-lg">
            <p className="">
              <span className="opacity-50 pr-1">Total</span>
              <span className="bg-primary text-onPrimary font-semibold rounded-sm px-1">
                {formatMoney(total)}
              </span>
              <span className="pl-1 opacity-70">
                @ {transactionProducts.length} items
              </span>
            </p>
            <p className="">
              <span className="opacity-50 pr-1">Tax</span>
              <span className=" font-semibold rounded-sm px-1">
                {formatMoney(tax)}
              </span>
            </p>
            <p className="">
              <span className="opacity-50 pr-1">After Tax</span>
              <span className="bg-primary text-base text-onPrimary font-semibold rounded-sm px-1">
                {formatMoney(netTotal)}
              </span>
            </p>
          </div>
          {/*  */}

          {/* Set  3 */}

          <div className="flex flex-col justify-between space-y-1 w-full p-3 bg-black/20 rounded-lg">
            <InputBase
              label="Discount"
              type={"number"}
              value={discount}
              onChange={(e) => setDiscount(+e.target.value)}
            />

            <div>
              <span className="opacity-50 pr-1 ">Grand Total</span>
              <p className="text-3xl pt-2">
                <span className="bg-tertiary text-onTertiary font-semibold rounded-sm px-1">
                  {formatMoney(grandTotal, {
                    decimalCount: 0,
                    long: true,
                  })}
                </span>
              </p>
            </div>
          </div>

          {/*  */}
        </div>

        {/*  */}

        {/* Products */}

        <div
          className="w-[900px] my-2 px-4 bg-black/20 rounded-lg
            min-h-[300px] max-h-[400px] overflow-auto
          "
        >
          <DataViewer
            data={transactionProducts}
            columnsHeadings={transactionProductDataHeadings}
            excludeColumns={[
              "productId",
              "description",
              "quantityPerUnit",
              "unit",
              "quantityPurchased",
            ]}
            renderRow={(p) => ({
              ...p,
              unit: p.unit.name,
              name: p.name + ` (${p.description})`,
              price: Unit.formatPrice(p.price, p.unit, p.quantityPerUnit),
              totalPrice:
                formatMoney(p.totalPrice) +
                ` (${Unit.format(p.quantityPurchased, p.unit)})`,
              netPrice: (
                <p className="bg-primary px-1 rounded-sm text-onPrimary font-semibold">
                  {formatMoney(p.netPrice)}
                </p>
              ),
              taxPerc:
                formatMoney(p.netPrice - p.totalPrice) + ` (${p.taxPerc}%)`,
            })}
            header={{
              zeroPadding: true,
              noSearch: false,
              trailing: (
                <>
                  <QuickPopup
                    id="add-product"
                    popup={
                      <TransactionProductAdd
                        inventoryProducts={inventoryProducts.data ?? []}
                        onProductAdd={(p) => {
                          setTransactionProducts((prev) => [...prev, p]);
                        }}
                      />
                    }
                  >
                    <Button>Add Product</Button>
                  </QuickPopup>
                </>
              ),
            }}
            searchFn={(v, d) =>
              d.filter(
                (p) =>
                  p.name.toLowerCase().includes(v.toLowerCase()) ||
                  p.description.toLowerCase().includes(v.toLowerCase()) ||
                  p.category
                    .toString()
                    .toLowerCase()
                    .includes(v.toLowerCase()) ||
                  p.price.toString().toLowerCase().includes(v.toLowerCase())
              )
            }
          />
        </div>

        {/*  */}

        <div className="pt-4 w-full">
          <Button
            loading={transactions.loadingAny !== false ? "Loading" : undefined}
            onClick={() => {
              onSubmit();
            }}
            type="button"
            className="w-full"
          >
            Save
          </Button>
        </div>
      </Container>
    </div>
  );
};
