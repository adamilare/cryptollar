import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import Home from '../routes/Home';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({
    data: {
      data: {},
    },
  })),
}));

const mockLocation = {
  pathname: '/',
  search: '',
  hash: '',
  state: null,
  key: '',
};

describe('Home', () => {
  const mockStore = configureStore();
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      cryptos: {
        cryptos: [
          {
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
            filtered: true,
          },
        ],
        status: true,
      },
    });

    component = render(
      <MemoryRouter initialEntries={[mockLocation]}>
        <Provider store={store}>
          <Home />
        </Provider>
      </MemoryRouter>,
    );
  });

  it('should render crypto items when status is fulfilled', async () => {
    const { container } = component;

    const cryptoItems = container.querySelectorAll('ul li');

    expect(cryptoItems.length).toBe(1);
    expect(cryptoItems[0].textContent).toMatch(/Bitcoin/);
    expect(cryptoItems[0].textContent).toMatch(/55000/);
    expect(cryptoItems[0].textContent).not.toMatch(/Ethereum/);
  });
});
