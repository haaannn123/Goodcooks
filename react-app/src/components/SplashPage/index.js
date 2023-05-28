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
          <img className="splash-page-image" src="https://i.imgur.com/7Ws3Wif.png" alt="splash-page" />
          <AccountBox />
          {/* <div className="testing">
            <div className="splash-page-info">
              <h2>About Goodcooks</h2>
              <p>
                Welcome to Goodcooks, the perfect destination for all your culinary adventures! My interactive platform is designed to
                provide users with a delightful experience as they dive into the world of cookbooks. At Goodcooks, you'll find a wide
                selection of captivating cookbooks just waiting to be explored. And if you happen to miss your favorite cookbook, don't
                worry! You have the power to contribute and expand the collection by adding it to the list.
              </p>
            </div>
            <div className="splash-page-info">
              <p>
                Goodcooks allows you to connect and share your culinary
                journeys with your friends. Inspired by the concept of Goodreads, the renowned social media platform for book lovers,
                Goodcooks provides a similar space where you can connect with fellow food enthusiasts, exchange cookbook
                recommendations, and keep your friends updated on your latest culinary endeavors. So whether you're seeking new
                recipes, yearning to expand your cookbook collection, or simply looking to connect with like-minded food lovers,
                Goodcooks is here to make your culinary exploration a delightful and social experience.
              </p>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default SplashPage;
