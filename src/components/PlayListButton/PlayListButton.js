//@flow
import React from 'react';
import {pauseSong, setQueueAndPlay} from 'screens/Player/NewPlayer';
import {TouchableOpacity, View} from 'react-native';
import Pause from 'icons/Pause';
import Play from 'icons/Play';
import {connect} from 'react-redux';
import {COLOURS} from 'theme/constants';
type PropsType = {
  isPlaying: boolean,
  playingListId: string,
  listId: string,
  tracks: Array<Object>,
  navigation: any,
};

function PlayListButton(props: PropsType) {
  const {isPlaying, playingListId, listId, tracks} = props;
  const isListPlaying = listId === playingListId ? isPlaying : false;
  function playList() {
    if (tracks[0]) {
      setQueueAndPlay(tracks, tracks[0].id, listId);
    }
  }
  return (
    <TouchableOpacity
      style={{marginRight: 16}}
      onPress={isListPlaying ? pauseSong : playList}>
      <View>
        {isListPlaying ? (
          <Pause />
        ) : (
          <View
            style={{
              backgroundColor: COLOURS.white,
              height: 52,
              width: 52,
              borderRadius: 26,
            }}>
            <View
              style={{
                position: 'absolute',
                right: 3,
                left: 3,
                top: 3,
                bottom: 3,
                borderRadius: 26,
                backgroundColor: '#FF3636',
              }}
            />
            <Play
              size={90}
              style={{
                position: 'absolute',
                right: 0,
                left: 0,
                top: 0,
                bottom: 0,
              }}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

function mapStateToProps(state) {
  return {
    isPlaying: state.player.isPlaying,
    playingListId: state.player.currentListId,
  };
}

export default connect(
  mapStateToProps,
  null,
)(PlayListButton);
