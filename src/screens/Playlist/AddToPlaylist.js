import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from 'react-native';
import get from 'lodash/get';
import homeBg from 'assets/homeBg.png';
import {useSafeArea} from 'react-native-safe-area-context';
import {Icon, Loading, NewPlaylistModal} from 'components/index';
import {getAndSetPlaylists, addCreatedPlaylist} from './playlistsActions';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {PlaylistApi} from 'api/index';

function AddToPlaylist(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const {track} = props.route.params;
  const {playlists, isLoadingPlaylists} = props;
  const insets = useSafeArea();
  function onClose() {
    props.navigation.pop();
  }
  function openModal() {
    setModalVisible(true);
  }
  function closeModal() {
    setModalVisible(false);
  }
  function renderItem({item}) {
    return (
      <TouchableOpacity
        onPress={addToPlaylist(item?.playlist?.id)}
        style={styles.playlist}>
        <FastImage
          source={{
            uri: get(item, 'playlist.image.medium.url', ''),
          }}
          style={styles.playlistImage}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.playlistInfo}>
          <Text style={styles.playlistName}>
            {get(item, 'playlist.name', 'Unknown')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  function addToPlaylist(playlistId) {
    return function() {
      PlaylistApi.addSongToPlaylist(playlistId, track.id)
        .then(() => {
          setModalVisible(false);
          onClose(); //todo show global modal and update playlists
        })
        .catch(e => {
          console.log({e}); //todo
        });
    };
  }
  useEffect(() => {
    if (playlists.length === 0) {
      getAndSetPlaylists();
    }
  }, [playlists.length]);
  return (
    <ImageBackground
      source={homeBg}
      style={[styles.container, {paddingTop: insets.top}]}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 26,
        }}>
        <TouchableOpacity onPress={onClose}>
          <Icon name="close" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={openModal} style={styles.playlist}>
        <View style={styles.playlistImage}>
          <Icon
            style={{alignSelf: 'center'}}
            name="add"
            size={36}
            color="#93959E"
          />
        </View>
        <Text style={styles.addNewText}>Create New Playlist</Text>
      </TouchableOpacity>
      {isLoadingPlaylists ? (
        <View style={{marginTop: 32, alignItems: 'center'}}>
          <Loading size={40} />
        </View>
      ) : (
        <FlatList
          data={playlists.filter(item => item?.playlist?.user_id)}
          renderItem={renderItem}
        />
      )}
      <NewPlaylistModal
        defaultValue={get(track, 'name', '')}
        visible={modalVisible}
        onClose={closeModal}
        trackId={track?.id}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
  },
  playlist: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  addNewText: {
    color: '#93959E',
    fontSize: 17,
    marginLeft: 12,
    alignSelf: 'center',
  },
  playlistName: {
    color: 'white',
    fontSize: 17,
  },
  playlistSubtitle: {
    color: '#C7C7C7',
    fontSize: 13,
  },
  playlistInfo: {
    marginLeft: 12,
    alignSelf: 'center',
  },
  playlistImage: {
    width: 75,
    height: 58,
    backgroundColor: '#2E3244',
    borderRadius: 7,
    justifyContent: 'center',
  },
});
function mapStateToProps(state) {
  return {
    playlists: state.playlists.data,
    isLoadingPlaylists: state.playlists.isLoadingPlaylists,
  };
}

export default connect(
  mapStateToProps,
  {addCreatedPlaylist},
)(AddToPlaylist);
