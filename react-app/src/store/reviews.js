const GET_REVIEW_BY_BOOK_ID = "reviews/GET_REVIEW_BY_BOOK_ID"

export const actionGetBookReviews = (reviews) => ({
    type: GET_REVIEW_BY_BOOK_ID,
    reviews
})

const normalizingReviewsData = (reviews) => {
    let normalizedData = {};

    reviews.forEach(review => {
        normalizedData[review.id] = review;
    });
    return normalizedData;
}

export const thunkGetBookReviews = (bookId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/books/${bookId}`)

    if (response.ok) {
        const reviews = await response.json()
        const normalizedData = normalizingReviewsData(reviews)
        dispatch(actionGetBookReviews(normalizedData))
    }
}

const initialState = {bookReviews: {}}

const bookReviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_REVIEW_BY_BOOK_ID:
            newState = {...state}
            newState.bookReviews= action.reviews
            return newState;
        default:
            return state
    }
}


export default bookReviewsReducer
