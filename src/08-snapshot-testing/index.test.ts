// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const values = [1, 2, 3];
  const expectedLinkedLsit = {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: null,
          next: null,
        },
      },
    },
  };

  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(values)).toStrictEqual(expectedLinkedLsit);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(values)).toMatchSnapshot();
  });
});
