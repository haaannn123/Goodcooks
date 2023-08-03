import { useSelector } from "react-redux";
import AccountBox from "../AccountBox";
import "./SplashPage.css";
import Footer from "../Footer";

const SplashPage = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <div className="splash-page-container">
      {user ? null : (
        <div className="login-container">
          <img className="splash-page-image" src="https://i.imgur.com/8y4rp0M.png" alt="splash-page" />
          <AccountBox />
        </div>
      )}
    </div>
  );
};

export default SplashPage;
