import concat from 'lodash/concat';
import filter from 'lodash/filter';
const initialState = {
  favSongs: [],
  favAlbums: [],
  followedArtists: [],
  favPlaylists: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'FAV_SONG':
      return {
        ...state,
        favSongs: concat(state.favSongs, action.songId),
      };
    case 'UNFAV_SONG':
      return {
        ...state,
        favSongs: filter(state.favSongs, function(item) {
          return item !== action.songId;
        }),
      };
    case 'FAV_ALBUM':
      return {
        ...state,
        favAlbums: concat(state.favAlbums, action.albumId),
      };
    case 'UNFAV_ALBUM':
      return {
        ...state,
        favAlbums: filter(state.favAlbums, function(item) {
          return item !== action.albumId;
        }),
      };
    case 'FOLLOW_ARTIST':
      return {
        ...state,
        followedArtists: concat(state.followedArtists, action.artistId),
      };
    case 'UNFOLLOW_ARTIST':
      return {
        ...state,
        followedArtists: filter(state.followedArtists, function(item) {
          return item !== action.artistId;
        }),
      };
    case 'FAV_PLAYLIST':
      return {
        ...state,
        favPlaylists: concat(state.favPlaylists, action.playlistId),
      };
    case 'UNFAV_PLAYLIST':
      return {
        ...state,
        favPlaylists: filter(state.favPlaylists, function(item) {
          return item !== action.playlistId;
        }),
      };
    case 'SIGN_OUT':
      return initialState;
    default:
      return state;
  }
}
