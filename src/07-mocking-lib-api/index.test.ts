// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const relativePath = '/posts';
  const baseURL = 'https://jsonplaceholder.typicode.com';

  let mockedCreateAxios: jest.SpyInstance;
  let mockedGetAxios: jest.SpyInstance;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.runOnlyPendingTimers();
    mockedCreateAxios = jest.spyOn(axios, 'create');
    mockedGetAxios = jest.spyOn(axios.Axios.prototype, 'get');
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(mockedCreateAxios).toHaveBeenCalledWith({
      baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(mockedGetAxios).toHaveBeenCalled();
  });

  test('should return response data', async () => {
    mockedGetAxios.mockResolvedValue({ data: 'data' });

    const response = await throttledGetDataFromApi(relativePath);

    expect(response).toEqual('data');
  });
});
