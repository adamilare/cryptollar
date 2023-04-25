import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CryptoDetails from '../components/CryptoDetails';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({
    data: {
      data: {},
    },
  })),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

const initialState = {
  cryptos: {
    status: true,
  },
  cryptoDetail: {
    data: {
      id: 'bitcoin',
      icon: 'https://static.coinstats.app/coins/1650455588819.png',
      name: 'Bitcoin',
      symbol: 'BTC',
      rank: 1,
      price: 55000.0,
      priceBtc: 1,
      volume: 100000000.0,
      marketCap: 1000000000.0,
      availableSupply: 19355787,
      totalSupply: 21000000,
      priceChange1h: 0.26,
      priceChange1d: -2.0,
      priceChange1w: 5.0,
    },
    loading: false,
    error: null,
    status: true,
  },
};

const mockLocation = {
  pathname: '/cryptocurrency/bitcoin',
  search: '',
  hash: '',
  state: null,
  key: 'm1168m1o',
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('CryptoDetails', () => {
  beforeEach(() => {
    const store = mockStore({
      cryptos: initialState,
    });

    store.dispatch = jest.fn();

    render(
      <MemoryRouter initialEntries={[mockLocation]}>
        <Provider store={store}>
          <CryptoDetails />
        </Provider>
      </MemoryRouter>,
    );
  });

  it('renders the crypto details correctly', () => {
    const name = screen.getByRole('heading', { name: /Bitcoin/i });

    const price = screen.getByText('$55000.00');
    const volume = screen.getByText('$1B');

    expect(name).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    // expect(name).toBeInTheDocument();
    expect(volume).toBeInTheDocument();
  });
});
