// type MyId = Opaque<'MY_ID', string>
export type Opaque<K, T> = T & { __TYPE__: K };
