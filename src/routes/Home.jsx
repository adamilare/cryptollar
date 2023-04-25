import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCryptos } from '../redux/cryptosThunk';
import CryptoItem from '../components/CryptoItem';

const Home = () => {
  const dispatch = useDispatch();
  const { cryptos, status } = useSelector((store) => store.cryptos);

  const filtered = cryptos.filter((item) => item.filtered);

  useEffect(() => {
    if (!status) dispatch(getCryptos());
  }, [status, dispatch]);

  return (
    <section>
      {!status ? (
        <div>
          <h2>Loading ....</h2>
        </div>
      ) : (
        <ul>
          {filtered.map((item) => (
            <CryptoItem key={item.id} item={item} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default Home;
