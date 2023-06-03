const GET_REVIEW_BY_BOOK_ID = "reviews/GET_REVIEW_BY_BOOK_ID"

export const actionGetBookReviews = (reviews) => ({
    type: GET_REVIEW_BY_BOOK_ID,
    reviews
})

export const thunkGetBookReviews = (bookId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/books/${bookId}`)

    if (response.ok) {
        const reviews = await response.json()
        dispatch(actionGetBookReviews(reviews))
    }
}

const initialState = {bookReviews: {}}

const productReviewsReducer = (state = initialState, action) => {
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


export default productReviewsReducer
