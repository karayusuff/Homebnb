import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import HomeButton from './HomeButton';
import CreateSpotButton from './CreateSpotButton/CreateSpotButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className="nav-bar">
      <NavLink to="/">
        <HomeButton />
      </NavLink>
      {isLoaded && (
        <div className="nav-actions">
          {sessionUser && <CreateSpotButton />}
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </nav>
  );
}

export default Navigation;