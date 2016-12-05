export default function errorReducer(state = '', action) {
  switch (action.type) {
    case 'SHOW_ERROR_MESSAGE':
      return action.error
    case 'HIDE_ERROR_MESSAGE':
    case 'NAVIGATE':
    case 'BARS_SEARCH_REQUEST':
      return ''
    default:
      return state
  }
}
