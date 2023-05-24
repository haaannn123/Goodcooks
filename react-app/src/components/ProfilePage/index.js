import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import BookShelf from "./BookShelf";
import EditShelf from './EditShelf'
import './ProfilePage.css'

const ProfilePage = () => {
  const user = useSelector((state) => state.session.user);
  if (!user.profile_img) return null;
  console.log(user);
  return (
    <>
      <img src={user.profile_img} alt="user-profile" />
      <h1>
        {user.first_name} {user.last_name}
      </h1>
      <h2>{user.first_name} {user.last_name}'s BookShelf</h2>
      <NavLink to="/bookshelves/edit">(Edit)</NavLink>
      <BookShelf firstName={user.first_name} lastName={user.last_name}/>
    </>
  );
};
export default ProfilePage;
