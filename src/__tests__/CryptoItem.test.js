import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CryptoItem from '../components/CryptoItem';

const mockItem = {
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
};

describe('CryptoItem', () => {
  render(
    <BrowserRouter>
      <CryptoItem item={mockItem} />
    </BrowserRouter>,
  );
  it('renders correctly with item props', () => {
    const coinName = screen.getByText('Bitcoin');
    const price = screen.getByText('$55000.00');
    expect(coinName).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });
});
