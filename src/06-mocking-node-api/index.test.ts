// Uncomment the code below and write your tests
import fs from 'fs';
import path from 'path';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  const mockCallback = jest.fn();
  const mockTimeout = 1000;
  let spyTimeout: jest.SpyInstance;

  beforeEach((): void => {
    jest.useFakeTimers();
    spyTimeout = jest.spyOn(global, 'setTimeout');
  });

  test('should set timeout with provided callback and timeout', async () => {
    const callback = () => null;

    doStuffByTimeout(callback, mockTimeout);

    expect(spyTimeout).toHaveBeenCalledWith(callback, mockTimeout);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(mockCallback, mockTimeout);

    expect(mockCallback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(mockCallback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  const mockCallback = jest.fn();
  const mockInterval = 1000;
  let spyInterval: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();
    spyInterval = jest.spyOn(global, 'setInterval');
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(mockCallback, mockInterval);

    jest.advanceTimersByTime(mockInterval);

    expect(spyInterval).toHaveBeenCalledWith(
      expect.any(Function),
      mockInterval,
    );
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(mockCallback, mockInterval);

    expect(mockCallback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(mockInterval);
    jest.advanceTimersByTime(mockInterval);

    expect(mockCallback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  const mockPath = 'path.txt';
  const mockContent = 'content';
  let spyJoin: jest.SpyInstance;
  let spyReadFile: jest.SpyInstance;
  let spyExistsSync: jest.SpyInstance;

  beforeEach(() => {
    spyJoin = jest.spyOn(path, 'join');
    spyReadFile = jest.spyOn(fs.promises, 'readFile');
    spyExistsSync = jest.spyOn(fs, 'existsSync');
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(mockPath);

    expect(spyJoin).toHaveBeenCalledWith(__dirname, mockPath);
  });

  test('should return null if file does not exist', async () => {
    spyExistsSync.mockReturnValue(false);

    const result = await readFileAsynchronously(mockPath);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    spyExistsSync.mockReturnValue(true);
    spyReadFile.mockResolvedValue(Buffer.from(mockContent));

    const result = await readFileAsynchronously(mockPath);

    expect(result).toBe(mockContent);
  });
});
