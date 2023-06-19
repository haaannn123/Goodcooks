const GET_SEARCH_RESULTS = "GET_SEARCH_RESULTS";

export const getSearchResults = (results) => ({
    type: GET_SEARCH_RESULTS,
    results
})


export const thunkGetResults = (queryString) => async (dispatch) => {
    const res = await fetch('/api/books/', {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
            query: queryString
        })
    })

    if (res.ok) {
        const searchResults = await res.json();
        dispatch(getSearchResults(searchResults))
    }
};

const initialState = { results: {} }

const resultsReducer = (state = initialState, action) => {
    let newState;

    switch(action.type) {
        case GET_SEARCH_RESULTS:
            newState = {...state }
            newState.results = action.results
            return newState;
        default: 
            return state;
    };
};

export default resultsReducer;