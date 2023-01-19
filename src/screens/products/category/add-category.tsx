import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Category,
  useCategories,
} from "../../../providers/products/category-data";
import { Button } from "../../../relic-ui/components/base/button/button";
import { Form, useRelicForm } from "../../../relic-ui/components/base/form";
import { InputBase } from "../../../relic-ui/components/base/input/input-base";
import { Container } from "../../../relic-ui/components/misc/container";

export const AddCategoryForm = () => {
  const { id } = useParams();

  const categories = useCategories();
  const navigate = useNavigate();

  const category = categories.data?.find((p) => p.id === id);

  const formObj = useRelicForm({
    name: category?.name || "",
    description: category?.description || "",
  });

  return (
    <div className="bg-surfaceVariant text-onSurfaceVariant rounded-lg p-2 overflow-auto max-h-screen  flex flex-col">
      <Form
        formHookObj={formObj}
        onSubmit={async (data) => {
          if (id) {
            // this is and edit
            const p: Category = {
              ...category,
              ...data,
            };
            await categories.update(id, p);
          } else {
            // this is a new data
            const p: Category = {
              ...data,
            };
            await categories.add(p);
          }
          navigate(-1);
        }}
      >
        <Container>
          <h1 className="px-2 py-2 ">Add Category</h1>
          {/*  */}
          <InputBase
            ref={formObj.fieldRefs.name}
            label="Category Name"
            placeholder="eg. Electronics"
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
          <div className="pt-4 w-full">
            <Button
              loading={categories.loadingAny !== false ? "Loading" : undefined}
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
