const initialState = {
  token: null,
  uuid: null,
  initInfo: {},
  profileInfo: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        token: action.token,
        uuid: action.uuid,
      };
    case 'INITIALIZED_APP':
      return {
        ...state,
        initInfo: action.initInfo,
      };
    case 'SET_PROFILE_INFO':
      return {
        ...state,
        profileInfo: action.profileInfo,
      };
    case 'SIGN_IN':
      return {
        ...state,
        token: action.token,
        uuid: action.uuid,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        token: null,
        uuid: null,
      };
    default:
      return state;
  }
}
