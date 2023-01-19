export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function remap(
  value: number,
  fromLow: number,
  fromHigh: number,
  toLow: number,
  toHigh: number
): number {
  return toLow + (toHigh - toLow) * ((value - fromLow) / (fromHigh - fromLow));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export type MapType<T extends any> = { [key: string]: T };
export type RemoveTypes<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

export const ruppeeSymbol = "₹";

export const formatMoney = (
  amount: number,
  options?: { decimalCount: number; short?: boolean; long?: boolean }
) => {
  const shortFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    notation: "compact",
  });

  const longFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: options?.decimalCount ?? 0,
  });
  if (options?.short) {
    return shortFormatter.format(amount);
  }
  if (options?.long) return longFormatter.format(amount);
  // check if the amount is greater than 1 lakh
  if (amount >= 100000) {
    return shortFormatter.format(amount);
  }
  return longFormatter.format(amount);
};
