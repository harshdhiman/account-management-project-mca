import { lerp } from "./misc";

export class Color {
  r: number;
  g: number;
  b: number;
  a: number;
  constructor(r: number, g: number, b: number, a: number = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  toHexString(a?: number): string {
    return Color.rgb2hex(this.r, this.g, this.b, a ?? this.a);
  }

  lerp(color: Color, mix: number): Color {
    const c = Color.lerpColor(this.toHexString(), color.toHexString(), mix);
    return Color.fromHex(c);
  }

  withOpacity(opacity: number): string {
    return Color.hexWithOpacity(this.toHexString(), opacity);
  }

  //
  //  SEMI STATIC
  //
  static getRandomColor(includeAlpha?: boolean): Color {
    return new Color(
      Math.random(),
      Math.random(),
      Math.random(),
      includeAlpha ? Math.random() : 1
    );
  }

  static fromHex(hex: string): Color {
    const rgb = Color.hex2rgb(hex);
    return new Color(rgb.r, rgb.g, rgb.b, rgb.a);
  }

  static fromRGB255(r: number, g: number, b: number, a: number = 1): Color {
    return new Color(r / 255, g / 255, b / 255, a);
  }

  static fromRGB(r: number, g: number, b: number, a: number = 1): Color {
    return new Color(r, g, b, a);
  }

  //
  //
  // STATIC FUNCTIONS
  //
  //

  // RGB TO HEX
  static rgb2hex(
    r: number = 1,
    g?: number,
    b?: number,
    opacity: number = 1
  ): string {
    const rb = ((r * 255) & 255).toString(16).padStart(2, "0");
    const gb = (((g ?? r) * 255) & 255).toString(16).padStart(2, "0");
    const bb = (((b ?? r) * 255) & 255).toString(16).padStart(2, "0");
    const ab = ((opacity * 255) & 255).toString(16).padStart(2, "0");
    return `#${rb}${gb}${bb}${ab}`;
  }

  // RGB TO HEX 255
  static rgb2hex255(
    r: number = 255,
    g?: number,
    b?: number,
    opacity: number = 1
  ): string {
    const rb = (r & 255).toString(16).padStart(2, "0");
    const gb = ((g ?? r) & 255).toString(16).padStart(2, "0");
    const bb = ((b ?? r) & 255).toString(16).padStart(2, "0");
    const ab = ((opacity * 255) & 255).toString(16).padStart(2, "0");
    return `#${rb}${gb}${bb}${ab}`;
  }

  // HEX TO RGB
  static hex2rgb(color: string): {
    r: number;
    g: number;
    b: number;
    a: number;
  } {
    const _color = color.slice(1).padEnd(8, "f");
    const _arr = [];
    for (let i = 0; i < 8; i += 2) _arr.push(_color.slice(i, i + 2));
    return {
      r: parseInt(_arr[0], 16),
      g: parseInt(_arr[1], 16),
      b: parseInt(_arr[2], 16),
      a: parseInt(_arr[3], 16),
    };
  }

  // HEX WITH ALPHA
  static hexWithOpacity(hexColor: string, opacity: number = 1): string {
    const ab = ((opacity * 255) & 255).toString(16).padStart(2, "0");
    return `${hexColor}${ab}`;
  }

  // LERP COLOR
  static lerpColor(color1: string, color2: string, mix: number): string {
    const a = Color.hex2rgb(color1);
    const b = Color.hex2rgb(color2);
    return Color.rgb2hex255(
      lerp(a.r, b.r, mix),
      lerp(a.g, b.g, mix),
      lerp(a.b, b.b, mix),
      lerp(a.a / 255, b.a / 255, mix)
    );
  }
}
