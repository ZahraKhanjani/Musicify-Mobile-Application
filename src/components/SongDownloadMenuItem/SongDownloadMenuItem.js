// @flow
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {UIActivityIndicator} from 'react-native-indicators';
import {Text} from 'components/index';
import {
  saveSongRequest,
  unsaveSongRequest,
} from '../SavedSongs/savedSongsActions';
import filter from 'lodash/filter';
import Download from 'icons/Download';

type PropsType = {
  song: Object,
  currentlySavingSong?: string,
  savedSongs: Array<string>,
  savingQueue: Array<string>,
  saveSongRequest: Function,
  unsaveSongRequest: Function,
};

function SongDownloadMenuItem(props: PropsType) {
  if (props.song.id === props.currentlySavingSong) {
    return (
      <TouchableOpacity
        onPress={() => {
          props.unsaveSongRequest(props.song);
        }}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <UIActivityIndicator color="white" size={20} />
          </View>
          <Text style={styles.actionText}>Cancel</Text>
        </View>
      </TouchableOpacity>
    );
  }
  if (
    filter(props.savedSongs, function(item) {
      return item.id === props.song.id;
    }).length > 0
  ) {
    return (
      <TouchableOpacity
        onPress={() => {
          props.unsaveSongRequest(props.song);
        }}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Download size={26} color="red" />
          </View>
          <Text style={styles.actionText}>Remove From Downloads</Text>
        </View>
      </TouchableOpacity>
    );
  }
  if (filter(props.savingQueue, ['id', props.song.id]).length > 0) {
    return (
      <TouchableOpacity
        onPress={() => {
          props.unsaveSongRequest(props.song);
        }}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Download size={26} />
          </View>
          <Text style={styles.actionText}>Waiting For Download</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      onPress={() => {
        props.saveSongRequest(props.song);
      }}>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Download size={26} />
        </View>
        <Text style={styles.actionText}>Download</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  actionText: {
    marginLeft: 24,
    fontSize: 20,
    color: 'white',
  },
});

function mapStateToProps(state) {
  return {
    savedSongs: state.savedSongs.savedSongs,
    currentlySavingSong: state.savedSongs.currentlySavingSong,
    savingQueue: state.savedSongs.savingQueue,
  };
}

export default connect(
  mapStateToProps,
  {saveSongRequest, unsaveSongRequest},
)(SongDownloadMenuItem);
