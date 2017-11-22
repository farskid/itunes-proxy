import leadingZero from './leadingZero';

describe('leadingZero', () => {
  it('should add a zero before 0-9 numbers', () => {
    expect(leadingZero(9)).toBe('09');
  });
  it('should not add zero before numbers > 9', () => {
    expect(leadingZero(14)).toBe('14');
  });
  it('should convert integer to string', () => {
    expect(typeof leadingZero(245)).toBe('string');
  });
});
