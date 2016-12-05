export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'USER_OBJECT_SUCCESS':
      return {
        user: action.user,
      }
    case 'ATTENDING_ADD_SUCCESS':
      return {
        ...state,
        user: {
          ...state.user,
          attending: action.yelpId,
        },
      }
    case 'LOGOUT_SUCCESS':
      return {}
    default:
      return state
  }
}
