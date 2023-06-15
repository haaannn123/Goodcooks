const GET_REVIEW_BY_BOOK_ID = "reviews/GET_REVIEW_BY_BOOK_ID";
const NEW_REVIEW = "reviews/NEW_REVIEW";
const EDIT_REVIEW = 'reviews/EDIT_REVIEW'
const DELETE_REVIEW = 'review/DELETE_REVIEW'

export const actionGetBookReviews = (reviews) => ({
  type: GET_REVIEW_BY_BOOK_ID,
  reviews,
});

export const actionNewRating = (reviews) => ({
  type: NEW_REVIEW,
  reviews,
});

export const actionEditReview = (reviews) => ({
  type: EDIT_REVIEW,
  reviews
})

export const actionDeleteReview = (review) => ({
  type: DELETE_REVIEW,
  review
})

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
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const newReview = await res.json();
    dispatch(actionNewRating(newReview));
    dispatch(thunkGetBookReviews(bookId))
  }
};

export const thunkEditReview = (reviewId, review, bookId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}/update`, {
    headers: {'Content-Type': 'application/json'},
    method:'PUT',
    body: JSON.stringify(review)
  })

  if (res.ok){
    const reviewData = res.json();
    dispatch(actionEditReview(reviewData))
    dispatch(thunkGetBookReviews(bookId))
  }
}


export const thunkDeleteReview = (reviewId, bookId) => async dispatch => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE'
  })

  if (response.ok) {
      dispatch(actionDeleteReview(reviewId))
      dispatch(thunkGetBookReviews(bookId))
  }
}

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
    case EDIT_REVIEW:
      newState = {...state};
      newState.bookReviews[action.reviews] = action.reviews;
      return newState;
    case DELETE_REVIEW:
      newState = {...state}
      delete newState.bookReviews[action.review]
      return newState;
    default:
      return state;
  }
};

export default bookReviewsReducer;
