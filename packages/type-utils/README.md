# TypeUtils

Utility Types to help you be more productive

#### Installation:

```BASH
npm i @ts-kit/type-utils
```

#### Opaque:

```TS
type MyId = Opaque<'MY_ID', string>;

const id: MyId = <MyId>'102938348234';
```
