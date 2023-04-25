import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const listUrl = 'https://api.coinstats.app/public/v1/coins/';

const formatCryptos = (data) =>
  data.map(
    ({
      id,
      name,
      symbol,
      price,
      volume,
      marketCap,
      priceChange1h,
      priceChange1d,
      icon,
    }) => ({
      id,
      name,
      symbol,
      price,
      volume,
      marketCap,
      priceChange1h,
      priceChange1d,
      icon,
      filtered: true,
    }),
  );

const formatCryptoDetail = ({
  id,
  name,
  symbol,
  price,
  volume,
  marketCap,
  priceChange1h,
  priceChange1d,
  icon,
}) => ({
  id,
  name,
  symbol,
  price,
  volume,
  marketCap,
  priceChange1h,
  priceChange1d,
  icon,
});

const getCrypto = createAsyncThunk(
  'crptos/getCrypto',
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${listUrl}/${id}`, {
        mode: 'cors',
      });

      const crypto = formatCryptoDetail(data.coin);

      return fulfillWithValue(crypto);
    } catch (error) {
      return rejectWithValue({ ...error.response.data });
    }
  },
);

const getCryptos = createAsyncThunk(
  'crptos/getCryptos',
  async (name, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(listUrl, {
        mode: 'cors',
      });

      const refinedData = formatCryptos(data.coins);

      return fulfillWithValue({ cryptos: refinedData });
    } catch (error) {
      return rejectWithValue({ ...error.response.data });
    }
  },
);

export { getCryptos, getCrypto };
