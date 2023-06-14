const GET_USER = 'session/GET_USER';

const getUser = (user) => ({
	type: GET_USER,
	payload: user
})

export const thunkGetUser = (userId) => async (dispatch) => {
	const res = await fetch(`/api/users/${userId}`)

	if (res.ok){
		const user = await res.json()
		dispatch(getUser(user))
	}
}

const initialState = {singleUser: {}}

export default function userReducer(state = initialState, action){
    switch(action.type){
        case GET_USER:
			return {singleUser: action.payload}
        default:
            return state;
    }
}
