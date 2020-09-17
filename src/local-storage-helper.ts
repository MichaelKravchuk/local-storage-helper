export class LocalStorageHelper<T = any> {
  protected static APP_PREFIX: string;
  protected readonly key: string;


  constructor(storageKey: string) {
    if (!LocalStorageHelper.APP_PREFIX) {
      throw new Error(`App prefix wasn\`t set! \n Set it by using: LocalStorageHelper.setAppPrefix('yourPrefix')`);
    } else {
      this.key = `${LocalStorageHelper.APP_PREFIX}:${storageKey}`;
    }
  }


  public static setAppPrefix(value: string): void {
      LocalStorageHelper.APP_PREFIX = value;
  }


  public static clearAll(): void {
    const regExp = new RegExp(LocalStorageHelper.APP_PREFIX + ':');
    Object.keys(localStorage).forEach(key => {
      if (regExp.test(key)){
        localStorage.removeItem(key);
      }
    })
  }


  public save(data: T | any): void {
    if (!data) {
      return localStorage.removeItem(this.key);
    }

    // @ts-ignore
    if (typeof data.toJSON === 'function') {
        // @ts-ignore
        localStorage.setItem(this.key, JSON.stringify(data.toJSON()));
      } else {
        localStorage.setItem(this.key, JSON.stringify(data));
      }
  }


  public restoreAs(Type?: T | any, ignoreNoData = false): T | null {
    const data: string | null = localStorage.getItem(this.key);

    if (!data) {
      if (Type && ignoreNoData) {
        return new Type(JSON.parse(data));
      }
      return null;
    } else if (!Type) {
      return JSON.parse(data);
    }

    return new Type(JSON.parse(data));
  }
}
