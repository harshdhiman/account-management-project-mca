import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useCategories } from "../../../providers/products/category-data";
import {
  InventoryProduct,
  useProducts,
} from "../../../providers/products/product-data";
import { Unit } from "../../../providers/units/unit";
import { Button } from "../../../relic-ui/components/base/button/button";
import { Form, useRelicForm } from "../../../relic-ui/components/base/form";
import {
  InputBase,
  useInputController,
} from "../../../relic-ui/components/base/input/input-base";
import { SelectBase } from "../../../relic-ui/components/base/input/select";
import { Container } from "../../../relic-ui/components/misc/container";

export const AddProduct = () => {
  const { id } = useParams();

  const products = useProducts();
  const navigate = useNavigate();

  const categories = useCategories();

  const product = products.data?.find((p) => p.id === id);

  const formObj = useRelicForm({
    name: product?.name || "",
    description: product?.description || "",
    category: categories.data
      ? {
          value:
            categories.data?.find((c) => c.name === product?.category)?.id ??
            product?.category,
          label: product?.category,
        }
      : "",
    buyingPrice: product?.buyingPrice || 0,
    sellingPrice: product?.sellingPrice || 0,
    quantity: product?.quantity || 1,
    stock: product?.stock || 0,
    taxPerc: product?.taxPerc || 0,
    unit: {
      value: Unit.getUnit(product?.unit?.name ?? "").symbol,
      label: Unit.getUnit(product?.unit?.name ?? "").name,
    },
  });

  return (
    <div
      className="bg-surfaceVariant 
    text-onSurfaceVariant rounded-lg p-2 
    w-[300px]
    overflow-auto max-h-screen  flex flex-col"
    >
      <Form
        className="w-full"
        formHookObj={formObj}
        onSubmit={async (data) => {
          if (id) {
            // edit
            const p: InventoryProduct = {
              ...product!,
              ...data,
              category:
                categories.data?.find((c) => c.id === data.category)?.name ??
                "",
              unit: Unit.getUnit(data.unit as unknown as string),
            };
            await products.update(id, p);
          } else {
            // new
            const p: InventoryProduct = {
              ...data,
              category:
                categories.data?.find((c) => c.id === data.category)?.name ??
                "",
              unit: Unit.getUnit(data.unit as unknown as string),
            };
            await products.add(p);
          }
          navigate(-1);
        }}
      >
        <Container>
          <h1 className="px-2 py-2 ">Add Product</h1>
          {/*  */}
          <InputBase
            ref={formObj.fieldRefs.name}
            label="Name"
            placeholder="eg. Toaster"
            validator={(v) => {
              if (!v) return "required";
            }}
          />
          <InputBase
            ref={formObj.fieldRefs.description}
            label="Description"
            validator={(v) => {
              if (!v) return "required";
            }}
          />
          <SelectBase
            ref={formObj.fieldRefs.category}
            label="Category"
            options={
              categories.data?.map((c) => ({
                value: c.id!,
                label: c.name,
              })) || []
            }
            validator={(v) => {
              if (!v) return "required";
            }}
            placeholder="Select Category"
          />

          <div className="flex space-y-1 flex-col p-2 rounded-lg bg-black/20 my-2">
            <InputBase
              ref={formObj.fieldRefs.buyingPrice}
              label="Buying Price"
              validator={(v) => {
                if (!v) return "required";
                if (Number.isNaN(Number(v))) return "Invalid Value";
              }}
            />
            <div className="flex space-x-2">
              <InputBase
                ref={formObj.fieldRefs.sellingPrice}
                label="Selling Price"
                validator={(v) => {
                  if (!v) return "required";
                  if (Number.isNaN(Number(v))) return "Invalid Value";
                }}
              />
              <InputBase
                ref={formObj.fieldRefs.quantity}
                label="Per Unit"
                validator={(v) => {
                  if (!v) return "required";
                  if (Number.isNaN(Number(v))) return "Invalid Value";
                }}
              />
            </div>

            {/*  */}

            <SelectBase
              ref={formObj.fieldRefs.unit}
              label="Unit"
              options={Unit.units.map((c) => ({
                value: c.symbol,
                label: c.name,
              }))}
              validator={(v) => {
                if (!v) return "required";
              }}
              placeholder="Select Unit"
            />

            {/*  */}
          </div>

          <InputBase
            ref={formObj.fieldRefs.stock}
            label="Stock (Optional)"
            validator={(v) => {
              if (!v) return undefined;
              if (Number.isNaN(Number(v))) return "Invalid Stock";
            }}
          />

          <InputBase
            ref={formObj.fieldRefs.taxPerc}
            label="Tax Percentage"
            validator={(v) => {
              if (!v) return "required";
              if (Number.isNaN(Number(v))) return "Invalid Value";
            }}
          />
          <div className="pt-4 w-full">
            <Button
              loading={products.loadingAny !== false ? "Loading" : undefined}
              type="submit"
              className="w-full"
            >
              Save
            </Button>
          </div>
        </Container>
      </Form>
    </div>
  );
};
