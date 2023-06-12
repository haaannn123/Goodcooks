const GET_REVIEW_BY_BOOK_ID = "reviews/GET_REVIEW_BY_BOOK_ID";
const RATING_BOOK = "reviews/RATING_BOOK";

export const actionGetBookReviews = (reviews) => ({
  type: GET_REVIEW_BY_BOOK_ID,
  reviews,
});

export const actionBookRating = (rating) => ({
  type: RATING_BOOK,
  rating,
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

export const thunkRateBook = (bookId, rating) => async (dispatch) => {
  const res = await fetch("/api/reviews/books/rate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ book_id: bookId, rating }),
  });

  if (res.ok) {
    rating = await res.json();
    dispatch(actionBookRating(rating));
  }
};

const initialState = { bookReviews: {}, rating: {} };

const bookReviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_REVIEW_BY_BOOK_ID:
      newState = { ...state };
      newState.bookReviews = action.reviews;
      return newState;
    case RATING_BOOK:
      newState = { ...state };
      newState.rating = action.rating;
      return newState;
    default:
      return state;
  }
};

export default bookReviewsReducer;
