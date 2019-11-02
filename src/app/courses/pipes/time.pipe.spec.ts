import { TimePipe } from './time.pipe';

describe('TimePipe', () => {
  const pipe = new TimePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return 109h 5 min', () => {
    const result = pipe.transform(6545);
    expect(result).toEqual('109h 5 min');
  });

  it('should return 45 min', () => {
    const result = pipe.transform(45);
    expect(result).toEqual('45 min');
  });

  it('should return 2h', () => {
    const result = pipe.transform(120);
    expect(result).toEqual('2h ');
  });
});
