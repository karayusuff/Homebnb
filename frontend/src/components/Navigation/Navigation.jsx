import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import HomeButton from './HomeButton';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const sessionLinks = sessionUser ? (
    <div className="nav-bar">
      <ProfileButton user={sessionUser} />
    </div>
  ) : (
    <div className="nav-bar">
      <NavLink to="/signup">
        <SignupButton />
      </NavLink>
      <NavLink to="/login">
        <LoginButton />
      </NavLink>
    </div>
  );

  return (
    <nav className="nav-bar">
      <NavLink to="/">
        <HomeButton />
      </NavLink>
      {isLoaded && sessionLinks}
    </nav>
  );
}

export default Navigation;