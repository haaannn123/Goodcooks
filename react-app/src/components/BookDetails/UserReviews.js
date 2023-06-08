import { useEffect } from 'react';
import './Reviews.css'
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetBookReviews } from '../../store/reviews';
import { NavLink } from 'react-router-dom';

const UserReviews = () => {
    const dispatch = useDispatch()

    const reviews = useSelector(state => state.bookReviewsReducer.bookReviews)
    console.log('REVIEWS HERE', reviews)

    useEffect(() => {
        dispatch(thunkGetBookReviews)
    }, [dispatch])

    const renderRatings = (review) => {
        const maxRating = 5;
        const ratingIcons = [];
        for (let i = 0; i < maxRating; i++) {
          if (i < review.rating) {
            ratingIcons.push(<i key={i} className="fa-solid fa-star" id="special-star"></i>);
          } else {
            ratingIcons.push(<i key={i} className="fa-solid fa-star" id="special-star"></i>);
          }
        }
        return ratingIcons;
      };

    return (
        <div id="review">
            <h2 className="ratings-and-reviews">Ratings & Reviews</h2>
            {Object.values(reviews).length === 0 ? (
                <p>No reviews yet.</p>
            ) : (
                Object.values(reviews).map(review => (
                    <>
                        <div>
                            {renderRatings(review)}
                        </div>
                        <p>{review.review}</p>
                        <div className="review-user-container">
                            <img
                                src={review.User_info.profile_img}
                                alt="profile"
                                className="image-for-reviews"/>
                            <span>{review.User_info.first_name} {review.User_info.last_name}</span>
                        </div>
                    </>
                ))
            )}
        </div>
    )
}

export default UserReviews;
