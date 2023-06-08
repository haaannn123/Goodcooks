import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import BookShelf from "./BookShelf";
import AddToShelfButton from "./AddNewShelf";
import "./ProfilePage.css";
import Footer from "../Footer";

const ProfilePage = () => {
  const user = useSelector((state) => state.session.user);

  if (!user) return null;


  return (
    <>
    <div className="profile-page-container">
      <div className="profile-info">
        {user.profile_img ? (
          <img src={user.profile_img} alt="user-profile" className="profile-img" />
        ) : (
          <img src="https://i.imgur.com/nqak9tT.png" alt="user-profile" className="profile-img" />
        )}
        <div className="names-names">
          <h1>{user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)}{" "}{user.last_name.charAt(0).toUpperCase() + user.last_name.slice(1)}</h1>
          <span className="username">@ {user.username}</span>
        </div>
      </div>
      <div className="divider">
            <hr className="silver-line"/>
          </div>
      <div className="user-bookshelf-info">
        <h2>{user.first_name.toUpperCase()}'S LIBRARY</h2>
        <NavLink to="/bookshelves/edit" className="see-all-button">
          See All <span className="arrow"><i class="fa-solid fa-chevron-right"></i></span>
        </NavLink>
      </div>
      <BookShelf firstName={user.first_name} lastName={user.last_name} />
      
    </div>
    <Footer />
    </>
  );
};
export default ProfilePage;
