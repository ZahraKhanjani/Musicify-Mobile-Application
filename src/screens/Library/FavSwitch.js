// @flow
import React from 'react';
import get from 'lodash/get';
import indexOf from 'lodash/indexOf';
import {TouchableOpacity, View} from 'react-native';
import Like from 'icons/Like';
import {connect} from 'react-redux';
import {
  favSong,
  unfavSong,
  favAlbum,
  unfavAlbum,
  favPlaylist,
  unfavPlaylist,
} from './libraryActions';
import {getAndSetPlaylists} from '../Playlist/playlistsActions';
import {ProfileApi} from 'api/index';

type PropsType = {
  item: Object,
  type: string,
  favSongs: Array<string>,
  favAlbums: Array<string>,
  favPlaylists: Array<string>,
  style?: Object,
  size?: number,
};

function FavSwitch(props: PropsType) {
  const {item, type, style, size} = props;
  const likedListName = {
    song: 'favSongs',
    album: 'favAlbums',
    playlist: 'favPlaylists',
  };
  const likeFunctionName = {
    song: 'favSong',
    album: 'favAlbum',
    playlist: 'favPlaylist',
  };
  const unlikeFunctionName = {
    song: 'unfavSong',
    album: 'unfavAlbum',
    playlist: 'unfavPlaylist',
  };
  const isFav =
    get(item, 'is_favorite', false) ||
    indexOf(props[likedListName[type]], item.id) >= 0;
  function toggleFav() {
    if (!isFav) {
      props[likeFunctionName[type]](item.id);
      ProfileApi[likeFunctionName[type]](item.id).then(() => {
        if (type === 'playlist') {
          getAndSetPlaylists();
        }
      });
    } else {
      props[unlikeFunctionName[type]](item.id);
      ProfileApi[unlikeFunctionName[type]](item.id).then(() => {
        if (type === 'playlist') {
          getAndSetPlaylists();
        }
      });
    }
  }
  return (
    <TouchableOpacity style={style || {}} onPress={toggleFav}>
      <View
        style={{
          alignSelf: 'center',
          color: 'white',
        }}>
        <Like filled={isFav} height={size || 18} width={size || 20.72} />
      </View>
    </TouchableOpacity>
  );
}
function mapStateToProps(state) {
  return {
    favSongs: state.library.favSongs,
    favAlbums: state.library.favAlbums,
    favPlaylists: state.library.favPlaylists,
  };
}

export default connect(
  mapStateToProps,
  {
    favSong,
    unfavSong,
    favAlbum,
    unfavAlbum,
    favPlaylist,
    unfavPlaylist,
  },
)(FavSwitch);
