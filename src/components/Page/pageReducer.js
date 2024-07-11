const initialState = {
  home: null,
  search: null,
  playlist: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_PAGE_DATE':
      return {
        ...state,
        [action.pageId]: action.pageData,
      };
    case 'SIGN_OUT':
      return initialState;
    default:
      return state;
  }
}
