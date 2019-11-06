import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  const pipe = new OrderByPipe();
  const items = [
    { id: 1 },
    { id: 0 },
    { id: 2 },
    { id: 1 },
  ];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort items by id', () => {
    expect(pipe.transform(items, 'id', true)).toEqual([{ id: 2 }, { id: 1 }, { id: 1 }, { id: 0 }]);
  });

  it('should sort items by id with desc order', () => {
    expect(pipe.transform(items, 'id', false)).toEqual([{ id: 0 }, { id: 1 }, { id: 1 }, { id: 2 }]);
  });
});
