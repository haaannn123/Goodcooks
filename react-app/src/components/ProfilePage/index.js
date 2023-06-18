import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import BookShelf from "./BookShelf";
import { thunkGetUser } from "../../store/user";
import {thunkFollowUser, thunkIsFollowing, thunkUnfollowUser} from '../../store/follows'
import "./ProfilePage.css";

const ProfilePage = () => {
  const {userId} = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.singleUser)
  const isFollowing = useSelector(state => state.followsReducer.isFollowing.is_following)

  useEffect(() => {
    dispatch(thunkGetUser(userId))
    dispatch(thunkIsFollowing(userId))
  }, [dispatch, userId, user.id])

  const handleClick = () => {
    if (isFollowing === true){
      dispatch(thunkUnfollowUser(userId))
    } else {
      dispatch(thunkFollowUser(userId))
    }
  }

  if (!user) return null;

  return (
    <>
    <div className="profile-page-container page">
      <div className="profile-info">
        {user.profile_img ? (
          <img src={user.profile_img} alt="user-profile" className="profile-img" />
        ) : (
          <img src="https://i.imgur.com/nqak9tT.png" alt="user-profile" className="profile-img" />
        )}
        <div className="names-names">
            <h1 className="profile-page-user">{user.first_name} {user.last_name}</h1>
            <span className="username">@ {user.username}</span>
        </div>
        {/* {renderFollowButton()} */}
        <button className="follow-button" onClick={() => handleClick()}>{isFollowing ? "Unfollow": "Follow"}</button>
      </div>
      <div className="divider">
            <hr className="silver-line"/>
          </div>
      <div className="user-bookshelf-info">
        <h2 className="username-library">{user.first_name}'s Library</h2>
        <NavLink to="/bookshelves/edit" className="see-all-button">
          See All <span className="arrow"><i className="fa-solid fa-chevron-right"></i></span>
        </NavLink>
      </div>
      <BookShelf firstName={user.first_name} lastName={user.last_name} />
    </div>
    </>
  );
};
export default ProfilePage;
