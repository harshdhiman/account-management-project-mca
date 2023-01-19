export type RelicInputRef = {
  get value(): any;
  set value(value: any);
  get numberValue(): number;
  get element(): HTMLElement | null;
  validate(): boolean;
  setError(error: string | null): void;
};
