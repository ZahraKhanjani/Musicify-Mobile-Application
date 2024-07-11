import concat from 'lodash/concat';
const initialState = {
  data: [],
  isLoadingPlaylists: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER_PLAYLISTS':
      return {
        ...state,
        data: action.data,
        isLoadingPlaylists: false,
      };
    case 'SET_IS_LOADING_PLAYLISTS':
      return {
        ...state,
        isLoadingPlaylists: action.isLoading,
      };
    case 'ADD_CREATED_PLAYLIST':
      return {
        ...state,
        data: concat(state.data, action.playlist),
      };
    case 'SIGN_OUT':
      return initialState;
    default:
      return state;
  }
}
