import { CiHome } from "react-icons/ci";
import './Navigation.css'

// const HomeButton = () => {
//   return (
//     <div>
//       <CiHome className="nav-icon" title="Home" />
//     </div>
//   )
// };

const HomeButton = () => {
  return (
    <div id="home-link">
      <img id="home-logo" src="/homebnb-logo-transparent.png" title="Home" alt="homebnb-logo" />
    </div>
  )
};

export default HomeButton;