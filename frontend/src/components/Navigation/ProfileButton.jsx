import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { PiUserListLight } from "react-icons/pi";
import { useNavigate, Link } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import LogoutButton from "./LogoutButton";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
    closeMenu();
    navigate('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={toggleMenu} className="profile-icon">
        <PiUserListLight title="Profile" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Hello, {user.firstName}!</li>
            <li>{user.email}</li>
            <li>
              <Link to="/spots/manage" onClick={closeMenu}>
                Manage Spots
              </Link>
            </li>
            <li>
              <button onClick={logout} className="logout-icon">
                <LogoutButton />
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;

