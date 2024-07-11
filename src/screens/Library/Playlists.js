//@flow
import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';
import {
  Icon,
  Text,
  NewPlaylistModal,
  Playlist,
  Loading,
} from 'components/index';
import {
  getAndSetPlaylists,
  addCreatedPlaylist,
} from '../Playlist/playlistsActions';
import {connect} from 'react-redux';
import {ModalsNames} from 'navigation/routeNames';
import NavigationService from 'navigation/NavigationService';
import {ITEM_HEIGHTS} from 'theme/constants';

type PropsType = {
  navigation: any,
  playlists: Array<Object>,
  containerStyle: ?Object,
  isLoadingPlaylists: boolean,
  defaultValue?: string,
  trackId?: string,
};

function Playlists({
  playlists,
  containerStyle,
  isLoadingPlaylists,
  defaultValue,
  trackId,
}: PropsType) {
  const [modalVisible, setModalVisible] = useState(false);
  function openModal() {
    setModalVisible(true);
  }
  function closeModal() {
    setModalVisible(false);
  }
  function onPressMorePlaylist(playlist) {
    NavigationService.navigate(ModalsNames.PlaylistMore, {playlist});
    // PlaylistApi.deletePlaylist(playlistId).then(getAndSetPlaylists);
  }
  function renderItem({item}) {
    return item?.playlist ? (
      <Playlist
        onPressMore={onPressMorePlaylist}
        playlist={item?.playlist}
        viewType="list"
      />
    ) : null;
  }
  useEffect(() => {
    getAndSetPlaylists();
  }, []);
  const getItemLayout = (data, index) => ({
    length: ITEM_HEIGHTS.LIST_PLAYLIST,
    offset: ITEM_HEIGHTS.LIST_PLAYLIST * index,
    index,
  });
  return (
    <View style={[styles.container, containerStyle || {}]}>
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
          getItemLayout={getItemLayout}
          ListFooterComponent={<View style={{height: 100}} />}
          data={playlists}
          renderItem={renderItem}
        />
      )}
      <NewPlaylistModal
        trackId={trackId}
        defaultValue={defaultValue}
        visible={modalVisible}
        onClose={closeModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    backgroundColor: 'transparent',
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
    profileInfo: state.auth.profileInfo,
  };
}

export default connect(
  mapStateToProps,
  {addCreatedPlaylist},
)(Playlists);
