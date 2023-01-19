import React from "react";
import {
  Category,
  categoryDataHeadings,
  useCategories,
} from "../../../providers/products/category-data";
import { DataWaiter } from "../../../relic-ui/components/base/loader/data-waiter";
import { DataViewer } from "../../../_components/data-viewer";

export const CategoryView = () => {
  const categories = useCategories();

  return (
    <DataWaiter
      loading={categories.loading === "loadLoading"}
      error={categories.error}
    >
      <DataViewer<Category>
        data={categories.data!}
        searchFn={(v, d) =>
          d.filter((p) => p.name.toLowerCase().includes(v.toLowerCase()))
        }
        columnsHeadings={categoryDataHeadings}
        excludeColumns={["id"]}
        renderRow={(d) => d}
        //
        addButton={{
          text: "Add Category",
          navigate: "add-category",
        }}
        actions={{
          edit: (row) => ({ to: `edit-category/${row.id}` }),
          delete: (row) => {
            categories.remove(row.id!);
          },
        }}
      />
    </DataWaiter>
  );
};
