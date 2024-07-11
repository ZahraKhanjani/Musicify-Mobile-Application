import {store} from '../../store';
import get from 'lodash/get';
import {ProfileApi} from 'api/index';

export function setIsLoadingPlaylists(isLoading) {
  return {
    type: 'SET_IS_LOADING_PLAYLISTS',
    isLoading,
  };
}
export function setPlaylists(data) {
  return {
    type: 'SET_USER_PLAYLISTS',
    data,
  };
}
export function addCreatedPlaylist(playlist) {
  return {
    type: 'ADD_CREATED_PLAYLIST',
    playlist,
  };
}

export function getAndSetPlaylists(
  currentPage = 0,
  totalPages = 1,
  playlists = [],
) {
  if (currentPage < totalPages) {
    store.dispatch(setIsLoadingPlaylists(true));
    ProfileApi.getPlaylists(currentPage + 1)
      .then(res => {
        const _currentPage = get(res, 'data.meta.pagination.current_page', 1);
        const _totalPages = get(res, 'data.meta.pagination.total_pages', 1);
        const _playlists = [...playlists, ...get(res, 'data.data', [])];
        if (_currentPage === _totalPages) {
          store.dispatch(setPlaylists(_playlists));
        } else {
          getAndSetPlaylists(_currentPage, _totalPages, _playlists);
        }
      })
      .catch(e => {
        store.dispatch(setIsLoadingPlaylists(false));
        console.log({e});
      });
  }
}
