import { Interpolation, Theme } from "@emotion/react";
import React, { RefAttributes, useEffect } from "react";
import { RelicInputRef } from "./input-utils";
import Select, { GroupBase, SingleValue } from "react-select";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";
import { getAppColors } from "../../../theme/theme";
import { useRTheme } from "../../../theme/theme.hooks";

///
export type SelectProps = {
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  onChange?: (
    value: SingleValue<{
      value: string;
      label: string;
    }>
  ) => void;
  value?: SingleValue<{
    value: string;
    label: string;
  }>;
};

export type RelicInputProps = {
  validator?: (value: string) => string | void;
  label?: string;
  leftNode?: React.ReactNode;
  rightNode?: React.ReactNode;
  onSubmit?: () => void;
};

export type CombinedRelicInputProps = SelectProps & RelicInputProps;
///
///
///

export const useInputController = () => React.useRef<RelicInputRef>(null);

export const SelectBase = React.forwardRef<
  RelicInputRef,
  CombinedRelicInputProps
>((props, ref) => {
  ///

  const { validator, label, leftNode, rightNode, onSubmit, ...rest } = props;

  ///
  ///

  // const inputRef = React.useRef<Select>(null);
  const [selectedOption, setSelectedOption] = React.useState<
    | SingleValue<{
        value: string;
        label: string;
      }>
    | undefined
  >(props.value);

  const [labelShown, setLabelShown] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  useRTheme();

  React.useImperativeHandle(ref, () => ({
    get value() {
      console.log("get value", selectedOption);

      return selectedOption?.value ?? "";
    },
    set value(value) {
      if (typeof value === "object") {
        setLabelShown(true);
        setSelectedOption(value);
      }
    },
    get numberValue() {
      return parseFloat(selectedOption?.value ?? "0");
    },
    get element() {
      return null;
    },
    validate() {
      setError(null);
      if (selectedOption) {
        let res: string | null = null;
        if (props.disabled) {
          return true;
        }
        if (props.validator) {
          const r = props.validator(selectedOption.value);
          if (r) {
            res = r;
          }
        }
        if (res == null) {
          return true;
        }
        setError(res);
        return false;
      }
      setError("Please select an option");
      return false;
    },
    setError(error: string | null) {
      setError(error);
    },
  }));

  React.useEffect(() => {
    if (selectedOption) {
      const v = selectedOption.value;
      if (!v) {
      }
      if (props.label) {
        setLabelShown(!!v);
      }
    }

    setTimeout(() => {
      if (selectedOption) {
        const v = selectedOption.value;
        if (props.label) {
          setLabelShown(!!v);
        }
      }
    }, 500);
  }, []);

  useEffect(() => {
    if (props.value) {
      setSelectedOption(props.value);
    }
  }, [props.value]);

  return (
    <div
      className={`
        transition-all relative  pt-4 
          ${labelShown ? "" : ""}
            ${props.className || ""}

            ${
              props.disabled
                ? "opacity-70 pointer-events-none select-none "
                : ""
            }
        `}
    >
      <div
        className={`px-2 py-[6px] rounded-md
      bg-surface20 text-onSurfaceVariant
      outline-none border-2 
      focus-within:border-surfaceVariant60
      border-surfaceVariant40
      transition-all flex items-center space-x-2 w-full
      `}
      >
        {props.leftNode}
        <Select
          {...rest}
          closeMenuOnSelect
          menuShouldScrollIntoView
          styles={{
            control: (provided, state) => ({
              ...provided,
              background: "transparent",
              border: "none",
              boxShadow: "none",
              outline: "none",
              padding: 0,
              minHeight: 0,
            }),
            valueContainer: (provided, state) => ({
              ...provided,
              padding: 0,
              color: getAppColors().onSurfaceVariant,
            }),
            placeholder: (provided, state) => ({
              ...provided,
              color: getAppColors().surfaceVariant60,
            }),
            input: (provided, state) => ({
              ...provided,
              padding: 0,
              margin: 0,
              color: getAppColors().onSurfaceVariant,
            }),
            singleValue: (provided, state) => ({
              ...provided,
              color: getAppColors().onSurface,
            }),
            indicatorsContainer: (provided, state) => ({
              ...provided,
              padding: 0,
            }),
            indicatorSeparator: (provided, state) => ({
              ...provided,
              padding: 0,
              backgroundColor: getAppColors().outline,
              width: 0,
              height: 0,
            }),
            dropdownIndicator: (provided, state) => ({
              ...provided,
              padding: 0,
            }),
            menu: (provided, state) => ({
              ...provided,
              background: getAppColors().surface,
              color: getAppColors().onSurface,
            }),
            option: (provided, state) => ({
              ...provided,
              //   ":hover": {
              //     background: getAppColors().surface40,
              //   },
              background: getAppColors().surface,
              color: getAppColors().onSurface,

              ...(state.isFocused && {
                background: getAppColors().surface40,
              }),

              ...(state.isSelected && {
                background: getAppColors().surfaceVariant40,
              }),

              ":active": {
                background: getAppColors().surfaceVariant40,
              },
            }),
          }}
          className={`bg-transparent outline-none transition-all
             placeholder:text-surfaceVariant60 placeholder:opacity-80 w-full
            `}
          placeholder={labelShown ? props.placeholder : ""}
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e);
            const val = e;
            if (props.label) {
              setLabelShown(!!val);
            }
            setError(null);
            props.onChange && props.onChange(e);
          }}
          onFocus={(e) => {
            if (props.label) {
              setLabelShown(true);
            }
            // props.onFocus && props.onFocus(e);
          }}
          onBlur={(e) => {
            if (props.label) {
              setLabelShown(!!selectedOption);
            }
            // props.onBlur && props.onBlur(e);
          }}
        />
        {labelShown && props.rightNode}
      </div>
      <label
        className={[
          `absolute top-0 flex items-center text-surfaceVariant60 opacity-90
              transition-all duration-200 ease-in-out pointer-events-none`,
          labelShown
            ? "text-xs left-1 "
            : `text-sm  pt-[25px] ${props.leftNode ? "left-8" : "left-3"} `,
        ].join(" ")}
      >
        {props.label}
      </label>
      {error && <div className="text-xs px-1 text-error mt-[2px]">{error}</div>}
    </div>
  );
});
