import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkEditReview, thunkGetBookReviews} from "../../store/reviews";
import { useModal } from "../../context/Modal";

const EditReviewModal = ({reviewId, star, prevReview, bookId}) => { 
  console.log('STAR:', star)
  console.log('PRV REVIEW:', prevReview)
  const dispatch = useDispatch();
  const [stars, setStar] = useState(star);
  const [hoverNumber, setHoverNumber] = useState(0);
  const [review, setReview] = useState(prevReview)
  const [errors, setErrors] = useState({});
  const {closeModal} = useModal()

  const handleSubmit = (e) => {
    e.preventDefault();

    let err = {};
    if (review.length < 30) {
      err.review = "Please write at least 30 characters";
    }

    if (Object.keys(err).length) {
      return setErrors(err);
    }
    const newReview = {
      rating: stars,
      review: review,
    };

    dispatch(thunkEditReview(reviewId, newReview, bookId));
    closeModal()
  };

  const getStarClass = (number) => {
    if (number <= hoverNumber) {
      return "material-symbols-outlined fill";
    }
    if (number <= stars) {
      return "material-symbols-outlined fill";
    } else {
      return "material-symbols-outlined";
    }
  };

  const handleClick = (num) => {
    setStar(num);
  };

  return (
    <form onSubmit={handleSubmit} className="leave-a-review-container">
      <p className="errors">{errors.review}</p>
      <div className="review-label">What did you think?</div>
      <div className="stars-container">
        <span
          onClick={() => handleClick(1)}
          onMouseEnter={() => setHoverNumber(1)}
          onMouseLeave={() => setHoverNumber(0)}
          className={getStarClass(1)}
        >
          star
        </span>
        <span
          onClick={() => handleClick(2)}
          onMouseEnter={() => setHoverNumber(2)}
          onMouseLeave={() => setHoverNumber(0)}
          className={getStarClass(2)}
        >
          star
        </span>
        <span
          onClick={() => handleClick(3)}
          onMouseEnter={() => setHoverNumber(3)}
          onMouseLeave={() => setHoverNumber(0)}
          className={getStarClass(3)}
        >
          star
        </span>
        <span
          onClick={() => handleClick(4)}
          onMouseEnter={() => setHoverNumber(4)}
          onMouseLeave={() => setHoverNumber(0)}
          className={getStarClass(4)}
        >
          star
        </span>
        <span
          onClick={() => handleClick(5)}
          onMouseEnter={() => setHoverNumber(5)}
          onMouseLeave={() => setHoverNumber(0)}
          className={getStarClass(5)}
        >
          star
        </span>
      </div>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        id="review"
        rows="10"
        cols="40"
        required
        placeholder="Please write at least 30 characters..."
      />
      <button className="review-post-button" type="submit">
        Post
      </button>
    </form>
  );
};

export default EditReviewModal;
