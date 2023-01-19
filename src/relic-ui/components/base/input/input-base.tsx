import { Interpolation, Theme } from "@emotion/react";
import React from "react";
import { RelicInputRef } from "./input-utils";

///
export type InputProps = React.ClassAttributes<HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement> & {
    css?: Interpolation<Theme>;
  };
export type RelicInputProps = {
  validator?: (value: string) => string | void;
  label?: string;
  leftNode?: React.ReactNode;
  rightNode?: React.ReactNode;
  onSubmit?: (value: string) => void;
};

export type CombinedRelicInputProps = InputProps & RelicInputProps;
///
///
///

export const useInputController = () => React.useRef<RelicInputRef>(null);

export const InputBase = React.forwardRef<
  RelicInputRef,
  CombinedRelicInputProps
>((props, ref) => {
  ///

  const { validator, label, leftNode, rightNode, onSubmit, ...rest } = props;

  ///
  ///

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [labelShown, setLabelShown] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useImperativeHandle(ref, () => ({
    get value() {
      return inputRef.current?.value || "";
    },
    set value(value) {
      if (inputRef.current) {
        inputRef.current.value = value;
      }
    },
    get numberValue() {
      return parseFloat(inputRef.current?.value || "0");
    },
    get element() {
      return inputRef.current;
    },
    validate() {
      setError(null);
      if (inputRef.current) {
        let res: string | null = null;
        if (props.disabled) {
          return true;
        }
        if (props.validator) {
          const r = props.validator(inputRef.current.value);
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
      return true;
    },
    setError(error: string | null) {
      setError(error);
    },
  }));

  React.useEffect(() => {
    if (inputRef.current) {
      const v = inputRef.current.value;
      if (!v) {
      }
      if (props.label) {
        setLabelShown(!!v);
      }
    }

    setTimeout(() => {
      if (inputRef.current) {
        const v = inputRef.current.value;
        if (props.label) {
          setLabelShown(!!v);
        }
      }
    }, 500);
  }, []);

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
        <input
          {...rest}
          ref={inputRef}
          className={`bg-transparent outline-none transition-all
             placeholder:text-surfaceVariant60 placeholder:opacity-80 w-full
            `}
          placeholder={labelShown ? props.placeholder : ""}
          onChange={(e) => {
            const val = e.target.value;
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
            props.onFocus && props.onFocus(e);
          }}
          onBlur={(e) => {
            if (props.label) {
              setLabelShown(!!e.target.value);
            }
            props.onBlur && props.onBlur(e);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              props.onSubmit && props.onSubmit(inputRef.current?.value || "");
            }
            props.onKeyDown && props.onKeyDown(e);
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
