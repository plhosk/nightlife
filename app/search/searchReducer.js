export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'BARS_SEARCH_REQUEST':
      return {
        lastSearch: action.search,
        fetching: true,
      }
    case 'BARS_SEARCH_EMPTY':
    case 'BARS_SEARCH_ERROR':
    case 'BARS_SEARCH_SUCCESS':
      return {
        ...state,
        fetching: false,
      }
    case 'LOGIN_SUCCESS':
    case 'USER_OBJECT_SUCCESS':
      if (action.user.lastSearch.length > 0) {
        return {
          ...state,
          lastSearch: action.user.lastSearch,
        }
      }
      return state
    default:
      return state
  }
}
