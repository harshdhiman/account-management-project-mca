import React, { useState } from "react";
import toast from "react-hot-toast";
import { InventoryProduct } from "../../../providers/products/product-data";
import { TransactionProduct } from "../../../providers/transactions/transaction-data";
import { Unit } from "../../../providers/units/unit";
import { Button } from "../../../relic-ui/components/base/button/button";
import { Form, useRelicForm } from "../../../relic-ui/components/base/form";
import { InputBase } from "../../../relic-ui/components/base/input/input-base";
import {
  SelectBase,
  useInputController,
} from "../../../relic-ui/components/base/input/select";
import { formatMoney } from "../../../relic-ui/utils/misc";

export const TransactionProductAdd = (props: {
  hide?: () => void;
  onProductAdd: (product: TransactionProduct) => void;
  inventoryProducts: InventoryProduct[];
}) => {
  const [product, setProduct] = useState<InventoryProduct | undefined>();

  //
  const productRef = useInputController();

  //
  const [quantity, setQuantity] = useState(1);
  const unit = product?.unit ?? Unit.getDefaultUnit();
  const price = product?.sellingPrice ?? 0;
  const quanPerUnit = product?.quantity ?? 1;
  const stock = product?.stock;

  const totalPrice = Unit.calculatePrice(price, unit, quantity, quanPerUnit);
  const tax = totalPrice * ((product?.taxPerc ?? 0) / 100);
  const netTotal = totalPrice + tax;

  //
  //
  function onsubmit() {
    if (!productRef.current?.validate()) return;
    //

    if (product?.stock) {
      if (product.stock < quantity) {
        toast.error("Insufficient stock");
        return;
      }
    }

    //
    const p: TransactionProduct = {
      productId: product?.id!,
      name: product?.name!,
      description: product?.description!,
      unit: product?.unit!,
      quantityPerUnit: product?.quantity!,
      quantityPurchased: quantity,
      price: product?.sellingPrice!,
      totalPrice: totalPrice,
      netPrice: netTotal,
      category: product?.category!,
      taxPerc: product?.taxPerc!,
    };
    props.onProductAdd(p);
    props.hide?.();
  }

  return (
    <div className="p-2 flex flex-col space-y-2">
      <div className="flex space-y-1 w-[300px] flex-col p-1 bg-black/20 rounded-lg">
        <SelectBase
          ref={productRef}
          label="Product"
          validator={(v) => {
            if (!v) return "required";
          }}
          options={
            props
              .inventoryProducts!.filter(
                (c) => c.stock.toString().length === 0 || c.stock >= 1
              )
              .map((c) => ({
                value: c.id!,
                label: c.name + ` (${c.description}) `,
              })) ?? []
          }
          onChange={(e) => {
            const p = props.inventoryProducts?.find((c) => c.id === e!.value);
            if (!p) return;
            setProduct(p);
          }}
        />

        <div className="flex space-x-2">
          <InputBase label="Price" disabled value={formatMoney(price)} />
          <InputBase
            label="Stock"
            disabled
            value={stock !== undefined ? stock : "---"}
          />
        </div>

        <div className="flex space-x-2">
          <InputBase
            label="Quantity"
            validator={(v) => {
              if (!v) return "required";
              if (isNaN(Number(v))) return "invalid number";
            }}
            type={"number"}
            value={quantity}
            max={stock}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          <InputBase label="Unit" disabled value={unit.name} />
        </div>
      </div>

      <div className="flex space-y-1 w-[300px] flex-col p-2 bg-black/20 rounded-lg ">
        <p className=" text-base">
          <span className="opacity-50">Total</span>{" "}
          <span className="bg-primary text-onPrimary font-semibold rounded-sm px-1">
            {formatMoney(totalPrice)}
          </span>
          <span className="pl-1 opacity-70">
            @ {Unit.format(quantity, unit)}
          </span>
        </p>
        <p className=" text-xs">
          <span className="opacity-50 pr-2">as per</span>
          <span>{Unit.formatPrice(price, unit, quanPerUnit)}</span>
        </p>
      </div>

      <div className="flex space-y-1 w-[300px] flex-col p-2 bg-black/20 rounded-lg ">
        <p className=" text-xs">
          <span className="opacity-50 pr-2">Tax</span>
          <span>{formatMoney(tax)}</span>
        </p>
        <p className=" text-base">
          <span className="opacity-50">Net Total</span>{" "}
          <span className="bg-primary text-lg text-onPrimary font-semibold rounded-sm px-1">
            {formatMoney(netTotal)}
          </span>
        </p>
      </div>

      <div className="flex space-y-1 w-[300px] flex-col p-1  rounded-lg">
        <Button type="button" onClick={onsubmit}>
          Add
        </Button>
        {/*  */}
      </div>
    </div>
  );
};
