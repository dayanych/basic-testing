// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const mockValue = 123;

    expect(await resolveValue(mockValue)).toBe(mockValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const mockMessage = 'error message';

    expect(() => throwError(mockMessage)).toThrow(new Error(mockMessage));
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError(new Error('Oops!'));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(async () => await rejectCustomError()).rejects.toThrowError(
      new MyAwesomeError(),
    );
  });
});
