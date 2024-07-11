export function addToSearchHistory(query) {
  return {
    type: 'ADD_TO_SEARCH_HISTORY',
    query,
  };
}
export function clearSearchHistory() {
  return {
    type: 'CLEAR_SEARCH_HISTORY',
  };
}
export function removeFromSearchHistory(query) {
  return {
    type: 'REMOVE_FROM_SEARCH_HISTORY',
    query,
  };
}
