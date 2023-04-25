import getValue from '../helpers/helperFuncs';

describe('getValue', () => {
  it('rounds values correctly to two decimal places', () => {
    expect(getValue(500)).toEqual('500');
    expect(getValue(1234)).toEqual('1.23K');
    expect(getValue(567890)).toEqual('567.89K');
    expect(getValue(1234567)).toEqual('1.23M');
    expect(getValue(56789012)).toEqual('56.79M');
    expect(getValue(123456789)).toEqual('123.46M');
    expect(getValue(1234567890)).toEqual('1.23B');
    expect(getValue(12345678900)).toEqual('12.35B');
    expect(getValue(123456789000)).toEqual('123.46B');
    expect(getValue(1234567890000)).toEqual('1.23T');
  });
});
