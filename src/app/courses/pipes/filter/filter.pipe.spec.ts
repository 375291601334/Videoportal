import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  const pipe = new FilterPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return unfiltered items', () => {
    const result = pipe.transform([{name: 'test'}, {name: 'some name'}], 'name', '');
    expect(result).toEqual([{name: 'test'}, {name: 'some name'}]);
  });

  it('should return filtered items', () => {
    const result = pipe.transform([{name: 'test'}, {name: 'some name'}], 'name', 'test');
    expect(result).toEqual([{name: 'test'}]);
  });
});
