import concat from 'lodash/concat';
import filter from 'lodash/filter';
import sortedUniq from 'lodash/sortedUniq';
const initialState = {
  searchHistory: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_SEARCH_HISTORY':
      return {
        ...state,
        searchHistory: sortedUniq(concat(state.searchHistory, action.query)),
      };
    case 'CLEAR_SEARCH_HISTORY':
      return {
        ...state,
        searchHistory: [],
      };
    case 'REMOVE_FROM_SEARCH_HISTORY':
      return {
        ...state,
        searchHistory: filter(state.searchHistory, function(item) {
          return item !== action.query;
        }),
      };
    case 'SIGN_OUT':
      return initialState;
    default:
      return state;
  }
}
