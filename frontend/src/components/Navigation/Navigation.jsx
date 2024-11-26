import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import HomeButton from './HomeButton';
// import LoginButton from './LoginButton';
import { CiLogin } from "react-icons/ci";
// import SignupButton from './SignupButton';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
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
        <NavLink to="/signup">Sign Up</NavLink>
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


{/* <div className="nav-bar">
<NavLink to="/signup">
  <SignupButton />
</NavLink>
<NavLink to="/login">
  <LoginButton />
</NavLink>
</div> */}


{/* <div className="nav-bar">
<li>
  <OpenModalButton
    buttonText="Log In"
    modalComponent={<LoginFormModal />}
  />
</li>
<li>
  <NavLink to="/signup">Sign Up</NavLink>
</li>
</div> */}