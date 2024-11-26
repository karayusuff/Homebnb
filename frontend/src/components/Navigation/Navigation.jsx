import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import HomeButton from './HomeButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className="nav-bar">
      <NavLink to="/">
        <HomeButton />
      </NavLink>
      {isLoaded && (
        <nav>
          <ProfileButton user={sessionUser} />
        </nav>
      )}
    </nav>
  );
}

export default Navigation;