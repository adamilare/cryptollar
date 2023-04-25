import { configureStore } from '@reduxjs/toolkit';
import { getCryptos } from '../redux/cryptosThunk';
import cryptoReducer from '../redux/CryptosSlice';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({
    data: {
      data: {},
    },
  })),
}));

describe('cryptoSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { cryptos: cryptoReducer },
    });
  });

  describe('crptoSlice', () => {
    it('should fetch cryptos successfully', async () => {
      const cryptos = [
        { id: 1, name: 'Bitcoin' },
        { id: 2, name: 'Ethereum' },
      ];
      const payload = { cryptos };
      const fulfilledAction = getCryptos.fulfilled(payload);
      await store.dispatch(fulfilledAction);
      const state = store.getState().cryptos;
      expect(state.cryptos).toEqual(cryptos);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
      expect(state.status).toBe(true);
    });
  });
});
