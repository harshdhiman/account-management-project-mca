const _debugCache = true;

type CacheData = {
  data: any;
  loaderFn: (data: any) => Promise<any>;
  args?: any;
};

export class GlobalFirebaseCache {
  private static _instance: GlobalFirebaseCache;

  private _cache: { [key: string]: CacheData } = {};

  private constructor() {}

  public static get instance(): GlobalFirebaseCache {
    if (!GlobalFirebaseCache._instance) {
      GlobalFirebaseCache._instance = new GlobalFirebaseCache();
    }
    return GlobalFirebaseCache._instance;
  }

  public get(key: string): any {
    const cacheData = this._cache[key];
    if (cacheData) {
      if (_debugCache) console.log("READING FROM CACHE " + key);
      return cacheData.data;
    }
    return null;
  }

  public set(
    key: string,
    value: any,
    loaderFn: (data: any) => Promise<any>,
    args?: any
  ): void {
    this._cache[key] = {
      data: value,
      loaderFn: loaderFn,
      args: args,
    };
  }

  public clearAll(): void {
    this._cache = {};
  }

  public clear(key: string): void {
    delete this._cache[key];
  }

  public async invalidate(key: string): Promise<any> {
    const cacheData = this._cache[key];
    if (cacheData) {
      const data = await cacheData.loaderFn(cacheData.args);
      cacheData.data = data;
      return data;
    }
    return null;
  }
}

export const fireCache = GlobalFirebaseCache.instance;
