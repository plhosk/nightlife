export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'ATTENDING_COUNT_RESET':
      return {
        ...state,
        [action.yelpId]: -1,
      }
    case 'ATTENDING_COUNT_SUCCESS':
      return {
        ...state,
        [action.yelpId]: action.count,
      }
    case 'ATTENDING_COUNT_DECREMENT':
      return {
        ...state,
        [action.yelpId]: state[action.yelpId] - 1,
      }
    case 'BARS_SEARCH_EMPTY':
      return []
    default:
      return state
  }
}
