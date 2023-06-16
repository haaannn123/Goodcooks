const FOLLOW_USER = 'follows/FOLLOW_USER';
const UNFOLLOW_USER = 'follows/UNFOLLOW_USER';
const IS_CURR_USER_FOLLOWING = 'follows/IS_CURR_USER_FOLLOWING';

export const actionIsFollowing = (user) => ({
  type: IS_CURR_USER_FOLLOWING,
  user
})

export const actionFollowUser = (userId) => ({
    type: FOLLOW_USER,
    userId
});

export const actionUnfollowUser = (userId) => ({
    type: UNFOLLOW_USER,
    userId
})

export const thunkIsFollowing = (userTwo) => async (dispatch) => {
    const res = await fetch(`/api/follows/${userTwo}`)

    if (res.ok){
      const data = await res.json()
      dispatch(actionIsFollowing(data))
    }

}

export const thunkFollowUser = ( userId ) => async (dispatch) => {
    const res = await fetch(`/api/follows/${userId}`, {
      headers: { 'Content-Type': "application/json" },
      method: 'POST',
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(actionFollowUser(data));
      dispatch(thunkIsFollowing(userId))
    }
};

export const thunkUnfollowUser = (userId) => async (dispatch) => {
    const res = await fetch(`/api/follows/${userId}`, {
      method:'DELETE'
    })
    if (res.ok){
      const data = res.json()
      dispatch(actionUnfollowUser(data))
      dispatch(thunkIsFollowing(userId))
    }
}


const initialState = {following: {}, followingUsers: {}, isFollowing: {}}

const followsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case FOLLOW_USER:
            newState = {...state}
            newState.following = action.userId;
            newState.followingUsers[action.userId] = true;
            return newState;
        case UNFOLLOW_USER:
            newState = {...state}
            delete newState.following[action.userId]
            delete newState.followingUsers[action.userId]
            return newState;
        case IS_CURR_USER_FOLLOWING:
            newState = {...state}
            newState.isFollowing = action.user
            return newState;
        default: 
            return state;
    }
}

export default followsReducer;
