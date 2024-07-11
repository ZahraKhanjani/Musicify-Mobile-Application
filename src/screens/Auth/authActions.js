export function restoreToken(token, isLoggedIn) {
  return {
    type: 'RESTORE_TOKEN',
    token,
    isLoggedIn,
  };
}
export function initializedApp(initInfo) {
  return {
    type: 'INITIALIZED_APP',
    initInfo,
  };
}
export function setProfileInfo(profileInfo) {
  return {
    type: 'SET_PROFILE_INFO',
    profileInfo,
  };
}
export function signIn(token, isLoggedIn) {
  return {
    type: 'SIGN_IN',
    token,
    isLoggedIn,
  };
}
export function signOut() {
  return {
    type: 'SIGN_OUT',
  };
}
