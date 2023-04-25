import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const CryptoItem = ({ item }) => {
  const {
    id, name, price, icon,
  } = item;
  const navigate = useNavigate();

  return (
    <li className="list-item">
      <button
        type="button"
        className="crypto-item"
        onClick={() => navigate(`/cryptocurrency/${id}`)}
      >
        <img src={icon} alt={`${name} logo`} />
        <div className="coin-info">
          <div className="coin-details">
            <h4 className="coin-name">{name}</h4>
            <div className="detail-row" />
            <div className="detail-row">
              <span>{`$${price.toFixed(2)}`}</span>
            </div>
          </div>
        </div>
        <span className="next-svg">
          <svg
            stroke="currentColor"
            fill="currentColor"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
            />
          </svg>
        </span>
      </button>
    </li>
  );
};

CryptoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    volume: PropTypes.number.isRequired,
    marketCap: PropTypes.number.isRequired,
    quote: PropTypes.number.isRequired,
  }).isRequired,
};

export default CryptoItem;
