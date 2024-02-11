// Uncomment the code below and write your tests
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  const mockInitialBalance = 1000;
  let mockInstanceBankAccount: BankAccount;
  let mockSecondInstanceBankAccount: BankAccount;

  beforeEach(() => {
    mockInstanceBankAccount = getBankAccount(mockInitialBalance);
    mockSecondInstanceBankAccount = getBankAccount(mockInitialBalance);
  });

  test('should create account with initial balance', () => {
    expect(mockInstanceBankAccount.getBalance()).toBe(mockInitialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() =>
      mockInstanceBankAccount.withdraw(mockInitialBalance + 1),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      mockInstanceBankAccount.transfer(
        mockInitialBalance + 1,
        mockSecondInstanceBankAccount,
      ),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() =>
      mockInstanceBankAccount.transfer(
        mockInitialBalance,
        mockInstanceBankAccount,
      ),
    ).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    mockInstanceBankAccount.deposit(100);
    expect(mockInstanceBankAccount.getBalance()).toBe(mockInitialBalance + 100);
  });

  test('should withdraw money', () => {
    mockInstanceBankAccount.withdraw(100);
    expect(mockInstanceBankAccount.getBalance()).toBe(mockInitialBalance - 100);
  });

  test('should transfer money', () => {
    mockInstanceBankAccount.transfer(100, mockSecondInstanceBankAccount);
    expect(mockInstanceBankAccount.getBalance()).toBe(mockInitialBalance - 100);
    expect(mockSecondInstanceBankAccount.getBalance()).toBe(
      mockInitialBalance + 100,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mockInitialBalance = 50;
    mockInstanceBankAccount.fetchBalance = jest
      .fn()
      .mockResolvedValue(mockInitialBalance);

    const balance = await mockInstanceBankAccount.fetchBalance();

    expect(balance).toEqual(mockInitialBalance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockNewBalance = 50;
    mockInstanceBankAccount.fetchBalance = jest
      .fn()
      .mockResolvedValue(mockNewBalance);

    await mockInstanceBankAccount.synchronizeBalance();
    expect(mockInstanceBankAccount.getBalance()).toBe(mockNewBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    mockInstanceBankAccount.fetchBalance = jest.fn().mockResolvedValue(null);

    await expect(
      async () => await mockInstanceBankAccount.synchronizeBalance(),
    ).rejects.toThrowError(SynchronizationFailedError);
  });
});
