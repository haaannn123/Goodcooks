import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import BookShelf from "./BookShelf";
import "./ProfilePage.css";
import Footer from "../Footer";
import { useEffect , useState } from "react";
import { thunkGetUser } from "../../store/user";
import {thunkFollowUser, thunkIsFollowing, thunkUnfollowUser} from '../../store/follows'
import { useParams } from "react-router-dom"

const ProfilePage = () => {
  const {userId} = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.singleUser)
  const currentUser = useSelector(state => state.session.user.id)
  const isFollowing = useSelector(state => state.followsReducer.isFollowing.is_following)
  console.log('current user:', currentUser)
  console.log('user:', user)


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

  const renderFollowButton = () => {
    if (currentUser !== user.id){
      return <button className="follow-button" onClick={() => handleClick(user.id)}>{isFollowing ? "Unfollow": "Follow"}</button>
    }
  }

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
            <h1>{user.first_name} {user.last_name}</h1>
            <span className="username">@ {user.username}</span>
        </div>
        {/* {renderFollowButton()} */}
        <button className="follow-button" onClick={() => handleClick()}>{isFollowing ? "Unfollow": "Follow"}</button>
      </div>
      <div className="divider">
            <hr className="silver-line"/>
          </div>
      <div className="user-bookshelf-info">
        <h2>{user.first_name}'S LIBRARY</h2>
        <NavLink to="/bookshelves/edit" className="see-all-button">
          See All <span className="arrow"><i className="fa-solid fa-chevron-right"></i></span>
        </NavLink>
      </div>
      <BookShelf firstName={user.first_name} lastName={user.last_name} />
    </div>
    <Footer />
    </>
  );
};
export default ProfilePage;
