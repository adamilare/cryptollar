import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BsChevronLeft } from 'react-icons/bs';
import { searchCryptos } from '../../redux/CryptosSlice';

const NavBar = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const onTextChange = (e) => {
    dispatch(searchCryptos(e.target.value));
  };

  const getNavClass = () =>
    location.pathname.match('cryptocurrency') ? 'detail' : 'home';

  return (
    <nav className={getNavClass()}>
      <NavLink to="/home" className="nav-home">
        <BsChevronLeft /> Home
      </NavLink>
      {!location.pathname.match('cryptocurrency') && (
        <div className="nav-search">
          <input onChange={onTextChange} type="text" placeholder="Search" />
        </div>
      )}
      {location.pathname.includes('cryptocurrency') && <h1>Coin Info</h1>}
      <div />
    </nav>
  );
};

export default NavBar;
