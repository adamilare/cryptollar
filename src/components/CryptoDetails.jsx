import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { getCrypto } from '../redux/cryptosThunk';
import getValue from '../helpers/helperFuncs';

const CryptoDetails = () => {
  const location = useLocation();
  const cryptoId = location.pathname.split('/')[2];

  const dispatch = useDispatch();

  const { cryptoDetail } = useSelector((store) => store.cryptos);

  useEffect(() => {
    dispatch(getCrypto(cryptoId));
  }, [dispatch, cryptoId]);

  return (
    <section className="blue">
      {!cryptoDetail || !cryptoDetail.status ? (
        <div>
          <h2>Loading crypto ....</h2>
        </div>
      ) : (
        <div className="crypto-detail">
          <img
            src={cryptoDetail.data.icon}
            alt={`${cryptoDetail.data.name} logo`}
          />
          <h2>{cryptoDetail.data.name}</h2>
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{cryptoDetail.data.name}</td>
              </tr>
              <tr>
                <td>Rank</td>
                <td>{cryptoDetail.data.rank}</td>
              </tr>
              <tr>
                <td>Symbol</td>
                <td>{cryptoDetail.data.symbol}</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>{`$${cryptoDetail.data.price.toFixed(2)}`}</td>
              </tr>
              <tr>
                <td>Volume 24hr</td>
                <td>{`$${getValue(cryptoDetail.data.priceChange1d)}`}</td>
              </tr>
              <tr>
                <td>Hourly Price Change</td>
                <td>{`$${getValue(cryptoDetail.data.priceChange1h)}`}</td>
              </tr>

              <tr>
                <td>Market Capy</td>
                <td>{`$${getValue(cryptoDetail.data.marketCap)}`}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default CryptoDetails;
