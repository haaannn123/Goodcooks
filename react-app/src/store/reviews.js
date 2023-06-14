const GET_REVIEW_BY_BOOK_ID = "reviews/GET_REVIEW_BY_BOOK_ID";
const NEW_REVIEW = "reviews/NEW_REVIEW";

export const actionGetBookReviews = (reviews) => ({
  type: GET_REVIEW_BY_BOOK_ID,
  reviews,
});

export const actionNewRating = (reviews) => ({
  type: NEW_REVIEW,
  reviews,
});

const normalizingReviewsData = (reviews) => {
  let normalizedData = {};

  reviews.forEach((review) => {
    normalizedData[review.id] = review;
  });
  return normalizedData;
};

export const thunkGetBookReviews = (bookId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/books/${bookId}`);

  if (response.ok) {
    const reviews = await response.json();
    const normalizedData = normalizingReviewsData(reviews);
    dispatch(actionGetBookReviews(normalizedData));
  }
};

export const thunkRateBook = (bookId, review) => async (dispatch) => {
  const res = await fetch(`/api/reviews/books/${bookId}/new`, {
    headers: { "Content-type": "application/json" },
    method: "POST",
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const newReview = await res.json();
    dispatch(actionNewRating(newReview));
    dispatch(thunkGetBookReviews(bookId))
  }
};

const initialState = { bookReviews: {} };

const bookReviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_REVIEW_BY_BOOK_ID:
      newState = { ...state };
      newState.bookReviews = action.reviews;
      return newState;
    case NEW_REVIEW:
      newState = { ...state };
      newState.bookReviews = action.reviews;
      return newState;
    default:
      return state;
  }
};

export default bookReviewsReducer;
