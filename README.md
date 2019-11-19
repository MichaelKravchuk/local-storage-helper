# Local Storage Helper

It helps you to work with LocalStorage 

[![npm version](https://badge.fury.io/js/local-storage-helper.svg)](http://badge.fury.io/js/local-storage-helper)
[![GitHub issues](https://img.shields.io/github/issues/MichaelKravchuk/local-storage-helper.svg)](https://github.com/MichaelKravchuk/local-storage-helper/issues)
[![GitHub stars](https://img.shields.io/github/stars/MichaelKravchuk/local-storage-helper.svg)](https://github.com/MichaelKravchuk/local-storage-helper/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/MichaelKravchuk/local-storage-helper/master/LICENSE)


## Usage

**Step 1:** Install local-storage-helper

```sh
npm install local-storage-helper --save
```

**Step 2:** Set up application prefix

```ts
import { LocalStorageHelper } from 'local-storage-helper';

LocalStorageHelper.setAppPrefix('yourPrefix');
```

**Step 3:** Start using

```ts
   const account = new LocalStorageHelper('account');
   account.save(someData);
```

## Methods

| Method         | Type   | Description
|----------------|--------|------------
| save | (new (options: any) => T &#124; any) => void | This method save data to LocalStorage
| restoreAs | (Type?: new (options: any) => T) => T &#124; any | This method get data from LocalStorage, and can automatically convert to Class instance

## Static Methods

| Method      | Type   | Description
|----------------|--------|------------
| setAppPrefix | (value: string) => void | This method will set a prefix to your keys in LocalStorage

## Example with RxJs

```ts

class Account {
    ...
}

class AccountService {
  private readonly subAccount: BehaviorSubject<Account>;
  private readonly accountStorage: LocalStorageHelper<Account> = new LocalStorageHelper<Account>('account');

  constructor() {
    this.subAccount = new BehaviorSubject(this.accountStorage.restoreAs(Account));
    this.subAccount.subscribe((account => this.accountStorage.save(account)));
  }

  public get account(): Account {
    return this.subAccount.getValue();
  }

  public set account(value: Account) {
    this.subAccount.next(value);
  }

  public clear(): void {
    this.account = null;
  }
}

```




## License
[MIT](https://choosealicense.com/licenses/mit/)
