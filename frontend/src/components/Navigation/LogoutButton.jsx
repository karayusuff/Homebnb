import { CiLogout } from "react-icons/ci";
import './Navigation.css';

const LogoutButton = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <CiLogout className="nav-icon" title="Logout" />
    </div>
  );
};

export default LogoutButton;
