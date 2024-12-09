import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { PiUserListLight } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
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

  const navigateToManageSpots = () => {
    navigate('/spots/manage');
    setShowMenu(false);
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div id="profile-container">
      <button onClick={toggleMenu} id="profile-icon">
        <PiUserListLight title="Profile" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li className="user-info">Hello, {user.firstName}!</li>
            <li className="user-info">{user.email}</li>
            <li className="menu-divider"></li>
            <li className="menu-item" onClick={navigateToManageSpots}>
                Manage Spots
            </li>
            <li className="menu-divider"></li>
            <li onClick={logout} className="menu-item">
                Log out
            </li>
          </>
        ) : (
          <>
            <li className="menu-item">
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li className="menu-divider"></li>
            <li className="menu-item">
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;

