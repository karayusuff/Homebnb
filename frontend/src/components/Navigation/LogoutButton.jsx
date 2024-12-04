// import { CiLogout } from "react-icons/ci";
import './Navigation.css';

const LogoutButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="logout-icon">
      {/* <CiLogout title="Logout" /> */}
      Logout
    </button>
  );
};

export default LogoutButton;
