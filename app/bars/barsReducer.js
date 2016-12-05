export default function reducer(state = [], action) {
  switch (action.type) {
    case 'BARS_SEARCH_SUCCESS':
      return action.bars
    case 'BARS_SEARCH_EMPTY':
      return []
    default:
      return state
  }
}
