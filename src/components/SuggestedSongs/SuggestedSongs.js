import React from 'react';
import {TouchableOpacity, View, FlatList} from 'react-native';
import {connect} from 'react-redux';
import slice from 'lodash/slice';
import {skipToSong} from 'screens/Player/NewPlayer';
import {Track} from 'components/index';
import {ITEM_HEIGHTS} from 'theme/constants';

function SuggestedSongs(props) {
  const {songsList, currentSongIndex} = props;
  function renderTrack({item}) {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => {
          skipToSong(item.id);
        }}>
        <Track viewType="searchList" track={item} />
      </TouchableOpacity>
    );
  }
  function itemSeparatorComponent() {
    return (
      <View
        style={{
          borderTopColor: '#181F3B',
          borderTopWidth: 1,
        }}
      />
    );
  }
  const getItemLayout = (data, index) => ({
    length: ITEM_HEIGHTS.LIST,
    offset: ITEM_HEIGHTS.LIST * index,
    index,
  });
  return (
    <FlatList
      getItemLayout={getItemLayout}
      style={{paddingHorizontal: 18}}
      data={slice(songsList, currentSongIndex + 1)}
      renderItem={renderTrack}
      ItemSeparatorComponent={itemSeparatorComponent}
    />
  );
}
function mapStateToProps(state) {
  return {
    currentSongIndex: state.player.currentSongIndex,
    songsList: state.player.songsList,
  };
}
export default connect(
  mapStateToProps,
  null,
)(SuggestedSongs);
