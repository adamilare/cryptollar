import { createSlice } from '@reduxjs/toolkit';
import { getCryptos, getCrypto } from './cryptosThunk';

const initialState = {
  cryptos: [],
  loading: false,
  error: null,
};

const searchCryptosHandler = (state, { payload }) => ({
  ...state,
  cryptos: state.cryptos.map((crypto) =>
    crypto.name.toLowerCase().includes(payload.toLowerCase())
      ? { ...crypto, filtered: true }
      : { ...crypto, filtered: false },
  ),
});

const cryptoSlice = createSlice({
  name: 'cryptos',
  initialState,
  reducers: {
    searchCryptos: searchCryptosHandler,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCryptos.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getCryptos.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        ...payload,
        error: null,
        status: true,
      }))
      .addCase(getCryptos.rejected, (state, { payload }) => ({
        ...state,
        error: payload,
        loading: false,
      }))
      .addCase(getCrypto.pending, (state) => ({
        ...state,
        cryptoDetail: { loading: true, error: null },
      }))
      .addCase(getCrypto.fulfilled, (state, { payload }) => ({
        ...state,
        cryptoDetail: {
          data: payload,
          loading: false,
          error: null,
          status: true,
        },
      }))
      .addCase(getCrypto.rejected, (state, { payload }) => ({
        ...state,
        cryptoDetail: { ...state.cryptoDetail, error: payload, loading: false },
      }));
  },
});

export default cryptoSlice.reducer;

export const { searchCryptos } = cryptoSlice.actions;
