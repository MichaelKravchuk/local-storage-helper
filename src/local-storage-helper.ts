export class LocalStorageHelper<T extends new (options: any) => T> {
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


  public save(data: new (options: any) => T | any): void {
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


  public restoreAs(Type?: new (options: any) => T): T | null {
    const data: string | null = localStorage.getItem(this.key);

    if (!data) {
      return null;
    } else if (!Type) {
      return JSON.parse(data);
    }

    return new Type(JSON.parse(data));
  }
}
