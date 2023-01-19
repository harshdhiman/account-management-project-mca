import React, { useRef } from "react";
import { RelicInputRef } from "./input/input-utils";

export type RelicInputType = string | number | { value: string; label: string };

export function parseFormData(data: any) {
  const parsedData = {};
  Object.keys(data).map((key) => {
    const value = (data as any)[key];
    if (typeof value === "string") {
      if (value.match(/^[0-9]+$/)) {
        (parsedData as any)[key] = Number(value);
      } else {
        (parsedData as any)[key] = value;
      }
    } else {
      (parsedData as any)[key] = value;
    }
  });
  return parsedData;
}

export interface RelicFormHookObj<T = { [key: string]: RelicInputType }> {
  formRef: React.RefObject<RelicFormRef>;
  fieldRefs: { [key in keyof T]: React.RefObject<RelicInputRef> };
  fields: T;
}

export function useRelicForm<T = { [key: string]: RelicInputType }>(
  fields: T
): RelicFormHookObj<T> {
  const formRef = React.useRef<RelicFormRef>(null);
  const refs = {} as { [key in keyof T]: React.RefObject<RelicInputRef> };
  //
  for (const key in fields) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    refs[key] = React.useRef<RelicInputRef>(null);
  }
  //
  return {
    formRef,
    fieldRefs: refs,
    fields,
  } as RelicFormHookObj<T>;
}

///
///
///

export type RelicFormRef = {
  validateForm(): boolean;
  submitForm(): void;
};

interface _Props<T = { [key: string]: RelicInputType }> {
  formHookObj?: RelicFormHookObj<T>;
  children: React.ReactNode;
  className?: string;
  autoValidate?: boolean;
  onSubmit?: (data: T, event?: React.FormEvent<HTMLFormElement>) => void;
  // disabled?: boolean;
}
function _Form<T = { [key: string]: RelicInputType }>(
  props: _Props<T>,
  ref: React.ForwardedRef<RelicFormRef>
) {
  const allRef = useRef<HTMLFormElement>(null);
  React.useImperativeHandle(props.formHookObj?.formRef, () => ({
    validateForm() {
      let valid = true;
      for (const key in props.formHookObj?.fieldRefs) {
        const _v =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (props.formHookObj?.fieldRefs as any)[key].current?.validate() ??
          true;

        valid = valid && _v;
      }
      return valid;
    },
    submitForm() {
      if (props.onSubmit) {
        if (
          (props.autoValidate ?? true) &&
          !props.formHookObj?.formRef.current?.validateForm()
        ) {
          return;
        }

        const data = {} as T;
        for (const key in props.formHookObj?.fieldRefs) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (data as any)[key] = (props.formHookObj?.fieldRefs as any)[
            key
          ].current?.value;
        }
        const parsedData = parseFormData(data);
        //
        if (props.onSubmit) {
          props.onSubmit(parsedData as T, undefined);
        }
      }
      // allRef.current!.dispatchEvent(new Event('submit'));
    },
  }));

  React.useEffect(() => {
    for (const key in props.formHookObj?.fieldRefs) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const f = (props.formHookObj?.fieldRefs as any)[
        key
      ] as React.RefObject<RelicInputRef>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (f.current && (props.formHookObj?.fields as any)[key]) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        f.current.value = (props.formHookObj?.fields as any)[key];
      }
    }
  }, [props.formHookObj?.fieldRefs, props.formHookObj?.fields]);

  return (
    <form
      className={props.className}
      ref={allRef}
      onSubmit={(e) => {
        e.preventDefault();

        if (
          (props.autoValidate ?? true) &&
          !props.formHookObj?.formRef.current?.validateForm()
        ) {
          return;
        }

        const data = {} as T;
        for (const key in props.formHookObj?.fieldRefs) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (data as any)[key] = (props.formHookObj?.fieldRefs as any)[
            key
          ].current?.value;
        }
        const parsedData = parseFormData(data);
        //
        if (props.onSubmit) {
          props.onSubmit(parsedData as T, e);
        }
      }}
    >
      {props.children}
    </form>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Form = React.forwardRef(_Form) as <T = { [key: string]: any }>(
  props: _Props<T> & { ref?: React.ForwardedRef<RelicFormRef> }
) => ReturnType<typeof _Form>;
