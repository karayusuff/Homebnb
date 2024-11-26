import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import HomeButton from './HomeButton';
import { CiLogin } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal'
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const sessionLinks = sessionUser ? (
    <div className="nav-bar">
      <ProfileButton user={sessionUser} />
    </div>
  ) : (
    <div className="nav-bar">
      <div>
        <OpenModalButton
          modalComponent={<LoginFormModal />}
          buttonText={<CiLogin title="Login" />}
        />
      </div>
      <div>
        <OpenModalButton
         modalComponent={<SignupFormModal />}
         buttonText={<CiEdit title="Signup" />}
        />   
      </div>
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