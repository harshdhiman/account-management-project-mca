import chroma from "chroma-js";
import React, { useEffect, useState } from "react";
import { ConditionalStyles, TableColumn } from "react-data-table-component";
import { NavigateOptions, useNavigate } from "react-router-dom";
import { Button } from "../relic-ui/components/base/button/button";
import { IconButton } from "../relic-ui/components/base/button/icon-button";
import {
  InputBase,
  useInputController,
} from "../relic-ui/components/base/input/input-base";
import { Container } from "../relic-ui/components/misc/container";
import { RelicDataTable } from "../relic-ui/components/misc/data-table";
import { getAppColors } from "../relic-ui/theme/theme";
import { CommonIcons } from "../relic-ui/utils/icons";

export function DataViewer<T>(props: {
  data: T[];
  sortFinderCol?: keyof T;
  defaultSortField?: keyof T | number;
  defaultSortAsc?: boolean;
  searchFn: (v: string, data: T[]) => T[];
  columnsHeadings: { [key in keyof T]: string };
  excludeColumns?: (keyof T)[];
  renderRow: (data: T) => { [key in keyof T]: any };
  //
  addButton?: {
    text: string;
    onClick?: () => void;
    navigate?: string;
    noBack?: boolean;
  };
  actions?: {
    edit?: (row: T) => { to: string; options?: NavigateOptions | undefined };
    delete?: (row: T) => void;
    trailing?: (row: T) => React.ReactNode;
  };
  conditionalRowStyles?: ConditionalStyles<{ [key in keyof T]: any }>[];
  conditionalCellStyles?: (colHead: keyof T) => ConditionalStyles<T>[];
  header?: {
    noSearch: boolean;
    zeroPadding: boolean;
    trailing?: React.ReactNode;
  };
  print?: boolean;
}) {
  const navigate = useNavigate();

  const searchController = useInputController();
  const [displayList, setDisplayList] = useState<T[]>([]);

  function search(v: string) {
    const list = props.searchFn(v, props.data);
    setDisplayList(list);
  }

  useEffect(() => {
    if (props.data) {
      search(searchController.current?.value ?? "");
    }
  }, [props.data]);

  return (
    <Container>
      <div
        style={{
          padding: props.header?.zeroPadding ? 0 : undefined,
        }}
        className="flex justify-between items-end p-4 pr-6"
      >
        {!props.header?.noSearch && (
          <InputBase
            ref={searchController}
            placeholder="..."
            className="w-full max-w-[300px]"
            label="Search"
            onChange={(e) => search(e.target.value)}
          />
        )}
        {props.header?.trailing}
        {props.addButton && (
          <Button
            leftIcon="add"
            onClick={() => {
              if (props.addButton?.navigate) {
                navigate(props.addButton.navigate);
              }
              if (props.addButton?.onClick) {
                props.addButton.onClick();
              }
            }}
          >
            {props.addButton.text}
          </Button>
        )}
      </div>

      {props.data && (
        <RelicDataTable
          defaultSortFieldId={(props.defaultSortField as any) ?? undefined}
          defaultSortAsc={props.defaultSortAsc}
          sortFunction={(rows, selector, direction) => {
            return rows.sort((a, b) => {
              const va = selector(a);
              const vb = selector(b);
              const originalA = props.data.find(
                (e) =>
                  (e as any)[props.sortFinderCol] ===
                  (a as any)[props.sortFinderCol]
              );
              const originalB = props.data.find(
                (e) =>
                  (e as any)[props.sortFinderCol] ===
                  (b as any)[props.sortFinderCol]
              );
              // find key from value
              const k = Object.keys(a).find((k) => (a as any)[k] === va);
              var sort = 1;
              if (originalA && originalB && k) {
                const oa = (originalA as any)[k];
                const ob = (originalB as any)[k];

                if (typeof oa === "string") {
                  sort = oa.localeCompare(ob);
                } else if (typeof oa === "number") {
                  sort = oa - ob;
                } else {
                  sort = oa.toString().localeCompare(ob.toString());
                }
              }
              return direction === "asc" ? sort : -sort;
            });
          }}
          columns={[
            ...Object.keys(props.columnsHeadings)
              .filter((e) => {
                if (props.excludeColumns) {
                  return !props.excludeColumns.includes(e as keyof T);
                }
                return true;
              })
              .map((e) => {
                return {
                  name: (props.columnsHeadings as any)[e],
                  selector: (row) => {
                    return (row as any)[e];
                  },
                  conditionalCellStyles: props.conditionalCellStyles?.(
                    e as any
                  ),
                  maxWidth: props.sortFinderCol ? "180px" : undefined,
                  sortable: props.sortFinderCol ? true : false,
                } as TableColumn<T>;
              }),
            ...(props.actions
              ? [
                  {
                    name: "Actions",
                    cell: (row) => (
                      <div className="flex items-center">
                        {
                          // trailing
                          props.actions?.trailing?.(row)
                        }
                        {props.actions?.edit && (
                          <IconButton
                            onClick={() => {
                              if (props.actions?.edit) {
                                const { to, options } = props.actions.edit(row);
                                navigate(to, options);
                              }
                            }}
                          >
                            <CommonIcons.Edit />
                          </IconButton>
                        )}
                        {props.actions?.delete && (
                          <IconButton
                            onClick={() => {
                              if (props.actions?.delete) {
                                props.actions.delete(row);
                              }
                            }}
                          >
                            <CommonIcons.Delete
                              color={chroma("red").alpha(0.8).css()}
                            />
                          </IconButton>
                        )}
                      </div>
                    ),
                    button: true,
                  } as TableColumn<T>,
                ]
              : []),
          ]}
          data={displayList.map((e) => {
            return props.renderRow(e);
          })}
          striped={props.print !== true}
          onRowClicked={(row) => {}}
          conditionalRowStyles={props.conditionalRowStyles}
          pagination={props.print !== true}
        />
      )}
    </Container>
  );
}
