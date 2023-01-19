// make a unit class which supports unit conversion and unit formatting

import { formatMoney, ruppeeSymbol } from "../../relic-ui/utils/misc";

export interface Unit {
  name: string;
  symbol: string;
  factor: number;
}

export namespace Unit {
  export function convert(value: number, from: Unit, to: Unit): number {
    return (value * from.factor) / to.factor;
  }

  // format a value in this unit
  export function format(value: number, unit: Unit): string {
    return value + " " + unit.symbol;
  }

  export function calculatePrice(
    price: number,
    unit: Unit,
    quantity: number,
    quantityPerUnit: number
  ): number {
    return price * (quantity / quantityPerUnit) * unit.factor;
  }

  // define some units
  export const units: Unit[] = [
    { name: "Piece", symbol: "pc", factor: 1 },
    //
    { name: "Gram", symbol: "g", factor: 1 },
    { name: "Kilogram", symbol: "kg", factor: 1000 },
    //
    { name: "Pound", symbol: "lb", factor: 453.592 },
    { name: "Ounce", symbol: "oz", factor: 28.3495 },
    //
    { name: "Milliliter", symbol: "ml", factor: 1 },
    { name: "Liter", symbol: "l", factor: 1000 },
    //
    { name: "Cup", symbol: "cup", factor: 236.588 },
    { name: "Tablespoon", symbol: "tbsp", factor: 14.7868 },
    { name: "Teaspoon", symbol: "tsp", factor: 4.92892 },
    //
    { name: "Millimeter", symbol: "mm", factor: 1 },
    { name: "Centimeter", symbol: "cm", factor: 10 },
    { name: "Meter", symbol: "m", factor: 1000 },
    { name: "Inch", symbol: "in", factor: 25.4 },
    { name: "Foot", symbol: "ft", factor: 304.8 },
    //
  ];

  // get a unit by name or code
  export function getUnit(nameOrCode: string): Unit {
    for (let i = 0; i < units.length; i++) {
      if (units[i].name == nameOrCode || units[i].symbol == nameOrCode) {
        return units[i];
      }
    }
    return units[0];
  }

  // get the default unit for a given category
  export function getDefaultUnit(
    category?: "weight" | "volume" | "length"
  ): Unit {
    switch (category) {
      case "weight":
        return Unit.getUnit("kg")!;
      case "volume":
        return Unit.getUnit("l")!;
      case "length":
        return Unit.getUnit("m")!;
      default:
        return Unit.getUnit("pc")!;
    }
  }

  export function formatPrice(
    price: number,
    unit: Unit,
    quantity: number
  ): string {
    // if quantity is 1 and unit is piece, then don't show the unit
    if (quantity == 1 && unit.symbol == getDefaultUnit().symbol) {
      return formatMoney(price);
    }
    if (quantity == 1) {
      return `${formatMoney(price)} / ${unit.symbol}`;
    }
    return `${formatMoney(price)} / ${quantity} ${unit.symbol}`;
  }
}
