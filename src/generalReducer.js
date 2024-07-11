const initialState = {
  offlineMode: false,
  connectingToInternet: false,
  stuckRequest: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_OFFLINE_MODE':
      return {
        ...state,
        offlineMode: action.offlineMode,
      };
    case 'SET_CONNECTING_MODE':
      return {
        ...state,
        connectingToInternet: true,
        stuckRequest: action.request,
      };
    case 'UNSET_CONNECTING_MODE':
      return {
        ...state,
        connectingToInternet: false,
        stuckRequest: null,
      };
    case 'SIGN_OUT':
      return initialState;
    default:
      return state;
  }
}
