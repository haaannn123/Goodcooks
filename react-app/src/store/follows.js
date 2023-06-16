// const FOLLOW_USER = 'follows/FOLLOW_USER';
// const UNFOLLOW_USER = 'follows/UNFOLLOW_USER';

// export const actionFollowUser = (userId) => ({
//     type: FOLLOW_USER,
//     userId
// });

// export const actionUnfollowUser = (userId) => ({
//     type: UNFOLLOW_USER,
//     userId
// })

// export const thunkFollowUser = (userOne, userTwo) => async (dispatch) => {
//   try {
//     const res = await fetch(`/api/follows/${userOne}/${userTwo}`, {
//       headers: { 'Content-Type': "application/json" },
//       method: 'POST',
//     });

//     if (res.ok) {
//       const data = await res.json();
//       dispatch(actionFollowUser(data));
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const thunkUnfollowUser = (userOne, userTwo) => async (dispatch) => {
//     const res = await fetch(`/api/follows/${userOne}/${userTwo}`, {
//       method:'DELETE'
//     })
//     if (res.ok){
//       const data = res.json()
//       dispatch(actionUnfollowUser(data))
//     }
// }


// const initialState = {following: {}, followingUsers: {}}

// const followsReducer = (state = initialState, action) => {
//     let newState;
//     switch(action.type){
//         case FOLLOW_USER:
//             newState = {...state}
//             newState.following = action.userId;
//             newState.followingUsers[action.userId] = true;
//             return newState;
//         case UNFOLLOW_USER:
//             newState = {...state}
//             delete newState.following[action.userId]
//             delete newState.followingUsers[action.userId]
//             return newState;
//         default: 
//             return state;
//     }
// }

// export default followsReducer;
