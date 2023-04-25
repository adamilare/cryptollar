import { configureStore } from '@reduxjs/toolkit';
import CryptosSlice from './CryptosSlice';

export default configureStore({
  reducer: {
    cryptos: CryptosSlice,
  },
});
