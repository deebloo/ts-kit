import { Opaque } from '../public_api';

describe('Opaque', () => {
  it('should allow you to create unique tokens from a primitive type', () => {
    type MyId = Opaque<'MY_ID', string>;

    const id: MyId = <MyId>'102938348234';

    expect(id).toBe('102938348234');
  });
});
