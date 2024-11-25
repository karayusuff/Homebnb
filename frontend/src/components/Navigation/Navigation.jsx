import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import HomeButton from './HomeButton';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const sessionLinks = sessionUser ? (
    <div className='nav-bar'>
        <ProfileButton user={sessionUser} />
        <LogoutButton onClick={logout} />
    </div>
  ) : (
    <div className='nav-bar'>
        <NavLink to="/signup">
          <SignupButton />
        </NavLink>
        <NavLink to="/login">
          <LoginButton />
        </NavLink>
    </div>
  );

  return (
    <nav className='nav-bar'>
        <NavLink to="/">
          <HomeButton />
        </NavLink>
      {isLoaded && sessionLinks}
    </nav>
  );
}

export default Navigation;