import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import HomeButton from './HomeButton';
import CreateSpotButton from './CreateSpotButton/CreateSpotButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav id="nav-bar">
      <NavLink id="home-link" to="/">
        <HomeButton />
      </NavLink>
      {isLoaded && (
        <div id="nav-actions">
          {sessionUser && <CreateSpotButton />}
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </nav>
  );
}

export default Navigation;