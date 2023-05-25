import { useSelector } from "react-redux";
import AccountBox from "../LogInBox";

const SplashPage = () => {
    const user = useSelector(state => state.session.user);

    return (
        user ? null :
        <div className="login-container">
            <img className="splash-page-image" src="https://i.imgur.com/7Ws3Wif.png" alt="splash-page" />
            <AccountBox className="login-landing-page-box" />
        </div>
    );
};

export default SplashPage;
