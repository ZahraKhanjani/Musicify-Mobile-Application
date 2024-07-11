/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {
  startSavingSong,
  finishSavingSong,
  removeFromDownloadQueue,
} from './savedSongsActions';
import RNFetchBlob from 'rn-fetch-blob';
import filter from 'lodash/filter';
import {checkAndUpdateSongInTheList} from 'screens/Player/NewPlayer';

function SongDownloader(props) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentProcess, setCurrentProcess] = useState(null);
  function handleSongDownload() {
    if (!isDownloading && props.savingQueue.length > 0) {
      const song = props.savingQueue[0];
      if (
        filter(props.savedSongs, function(item) {
          return item.id === song.id;
        }).length === 0
      ) {
        setIsDownloading(true);
        props.startSavingSong(song.id);
        setCurrentProcess(
          RNFetchBlob.config({
            fileCache: true,
            appendExt: 'mp3',
          }).fetch('GET', song.file),
        );
      } else {
        props.removeFromDownloadQueue(song);
      }
    } else if (isDownloading && !props.currentlySavingSong) {
      if (currentProcess) {
        currentProcess.cancel();
        setCurrentProcess(null);
      }
    }
  }
  useEffect(handleSongDownload, [
    props.savingQueue,
    isDownloading,
    props.currentlySavingSong,
  ]);
  useEffect(() => {
    const song = props.savingQueue[0];
    if (currentProcess) {
      currentProcess
        .then(res => {
          setIsDownloading(false);
          props.finishSavingSong({id: song.id, path: res.path()});
          checkAndUpdateSongInTheList(song.id);
        })
        .catch(error => {
          props.startSavingSong(null);
          setIsDownloading(false);
          console.log({error});
        });
    }
  }, [currentProcess]);
  return <View />;
}

function mapStateToProps(state) {
  return {
    currentlySavingSong: state.savedSongs.currentlySavingSong,
    savingQueue: state.savedSongs.savingQueue,
    savedSongs: state.savedSongs.savedSongs,
  };
}

export default connect(
  mapStateToProps,
  {
    startSavingSong,
    finishSavingSong,
    removeFromDownloadQueue,
  },
)(SongDownloader);
