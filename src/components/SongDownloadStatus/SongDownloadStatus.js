// @flow
import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {UIActivityIndicator} from 'react-native-indicators';
import filter from 'lodash/filter';
import Download from 'icons/Download';

type PropsType = {
  songId: string,
  currentlySavingSong?: string,
  size?: number,
  loaderSize?: number,
  savedSongs: Array<string>,
  isInModal?: boolean,
};

function SongDownloadStatus(props: PropsType) {
  if (props.songId === props.currentlySavingSong) {
    return (
      <View style={{marginRight: 4}}>
        <UIActivityIndicator color="white" size={props.loaderSize || 15} />
      </View>
    );
  }
  if (
    filter(props.savedSongs, function(item) {
      return item.id === props.songId;
    }).length > 0
  ) {
    return (
      <View style={props.isInModal ? {} : {marginRight: 4}}>
        <Download size={props.size || 18} color="red" />
      </View>
    );
  }
  if (filter(props.savingQueue, ['id', props.songId]).length > 0) {
    return (
      <View style={{marginRight: 4}}>
        <Download size={props.size || 18} />
      </View>
    );
  }
  return props.isInModal ? (
    <View>
      <Download size={props.size || 18} />
    </View>
  ) : (
    <View />
  );
}

function mapStateToProps(state) {
  return {
    savedSongs: state.savedSongs.savedSongs,
    currentlySavingSong: state.savedSongs.currentlySavingSong,
    savingQueue: state.savedSongs.savingQueue,
  };
}

export default connect(
  mapStateToProps,
  null,
)(SongDownloadStatus);
