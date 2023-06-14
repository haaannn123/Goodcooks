import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetBookReviews } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import LeaveAReview from "./LeaveAReview";
import { dateParser } from "../../helper_functions/dateParser";
import "./Reviews.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const UserReviews = () => {
  const { bookId } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory()

  const reviews = useSelector((state) => state.bookReviewsReducer.bookReviews);
  const reviewsArr = Object.values(reviews).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkGetBookReviews(bookId));
  }, [dispatch, bookId]);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const renderRatings = (review) => {
    const maxRating = 5;
    const ratingIcons = [];
    for (let i = 0; i < maxRating; i++) {
      if (i < review.rating) {
        ratingIcons.push(<i key={i} className="fa-solid fa-star" id="special-star"></i>);
      } else {
        ratingIcons.push(<i key={i} className="fa-regular fa-star" id="special-star"></i>);
      }
    }
    return ratingIcons;
  };

  const closeMenu = () => setShowMenu(false);

  const hasReviews = reviewsArr.length > 0;
  const hasUserReviews = reviewsArr.some((review) => review.user_id === user.id);

  if (!reviews) return null;

  return (
    <div id="review">
      <h2 className="ratings-and-reviews">Ratings & Reviews</h2>
      {!hasUserReviews && (
        <div className="leave-a-review-container">
          <>
            <img src={user.profile_img} className="ratings-profile-img" alt="profile" />
            <div className="text-what-do-you-think">
              What do <i>you</i> think?
            </div>
            <OpenModalButton
              buttonText="Write a Review"
              onItemClick={closeMenu}
              className="write-a-review-button"
              modalComponent={<LeaveAReview bookId={bookId} />}
            />
            <hr className="grey-line" />
          </>
        </div>
      )}
      {hasReviews ? (
        reviewsArr.map((review) => (
          <div className="all-reviews-container">
            <div className="review-stars-date-container">
              <div key={review.id}>{renderRatings(review)}</div>
              <div className="review-date">
                {new Date(review.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            <p className="user-reviews-description">{review.review}</p>
            <div className="review-user-container">
              {review.User_info && (
                <div
                  className="user-user"
                  onClick={() => history.push(`/user/${review.user_id}`)}>
                  <img src={review.User_info.profile_img} alt="profile" className="image-for-reviews" />
                  <span>{review.User_info.first_name} {review.User_info.last_name}</span>
                </div>
              )}
              {review.user_id === user.id ? (
                <>
                  <button className="edit-review-button">{<i class="fa-solid fa-pen-fancy"></i>} Edit Review</button>
                  <button className="edit-review-button">Delete Review</button>
                </>
              ) : null}
            </div>
          </div>
        ))
      ) : (
        <p>No reviews yet</p>
      )}
    </div>
  );
};

export default UserReviews;
