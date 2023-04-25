import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import NavBar from '../components/layout/NavBar';

const mockStore = configureStore([]);

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({
    data: {
      data: {},
    },
  })),
}));

describe('NavBar', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('renders the correct text in the Home link', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/home']}>
          <NavBar />
        </MemoryRouter>
      </Provider>,
    );

    expect(getByText('Home')).toBeInTheDocument();
  });

  it('dispatches searchCryptos when input value changes on the home page', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/home']}>
          <NavBar />
        </MemoryRouter>
      </Provider>,
    );

    const input = getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'Bitcoin' } });

    expect(store.getActions()).toEqual([
      { type: 'cryptos/searchCryptos', payload: 'Bitcoin' },
    ]);
  });

  it('renders the Coin Info text on the crypto detail page', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/cryptocurrency/bitcoin']}>
          <NavBar />
        </MemoryRouter>
      </Provider>,
    );

    expect(getByText('Coin Info')).toBeInTheDocument();
  });
});
