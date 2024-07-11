// @flow
import React from 'react';
import {connect} from 'react-redux';
import DownloadSwitch from 'icons/DownloadSwitch';
import {TouchableOpacity} from 'react-native';
import filter from 'lodash/filter';
import {
  saveSongListRequest,
  unsaveSongList,
} from '../SavedSongs/savedSongsActions';

type Propstype = {
  savedLists: Array<string>,
  listInfo: Object,
  style: Object,
  listTracks: Array<Object>,
  saveSongListRequest: Function,
  unsaveSongList: Function,
};
function ListDownloadSwitch(props: Propstype) {
  const isDownloaded =
    filter(props.savedLists, function(item) {
      return item.id === props.listInfo.id;
    }).length > 0;
  function handlePress() {
    if (!isDownloaded) {
      props.saveSongListRequest(props.listTracks, props.listInfo);
    } else {
      props.unsaveSongList(props.listInfo.id);
    }
  }
  return (
    <TouchableOpacity onPress={handlePress} style={props.style}>
      <DownloadSwitch active={isDownloaded} />
    </TouchableOpacity>
  );
}

function mapStateToProps(state) {
  return {
    savedLists: state.savedSongs.savedLists,
  };
}

export default connect(
  mapStateToProps,
  {saveSongListRequest, unsaveSongList},
)(ListDownloadSwitch);
