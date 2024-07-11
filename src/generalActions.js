export function setOfflineMode(offlineMode) {
  return {
    type: 'SET_OFFLINE_MODE',
    offlineMode,
  };
}
export function setConnectingToInternet(request = null) {
  return {
    type: 'SET_CONNECTING_MODE',
    request,
  };
}
export function unsetConnectingToInternet() {
  return {
    type: 'UNSET_CONNECTING_MODE',
  };
}
