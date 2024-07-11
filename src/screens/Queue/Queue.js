import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {
  Icon,
  Text,
  Track,
  QueueActionBar,
  DraggableTrack,
} from 'components/index';
import {setQueue, minimizePlayer, addToQueue} from '../Player/playerActions';
import {connect} from 'react-redux';
import some from 'lodash/some';
import filter from 'lodash/filter';
import concat from 'lodash/concat';
import slice from 'lodash/slice';
import remove from 'lodash/remove';
import {setUpcomingSongs} from '../Player/NewPlayer';
import {useSafeArea} from 'react-native-safe-area-context';

function Queue(props) {
  const insets = useSafeArea();
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [selectedQueueSongs, setSelectedQueueSongs] = useState([]);
  const {
    currentSong,
    songsList,
    queue,
    currentSongIndex,
    shuffledList,
    shuffle,
  } = props;
  function onClose() {
    props.navigation.pop();
  }
  function toggleSelect(song, isQueue) {
    return function() {
      if (!isQueue) {
        if (some(selectedSongs, ['id', song.id])) {
          setSelectedSongs(
            filter(selectedSongs, function(item) {
              return item.id !== song.id;
            }),
          );
        } else {
          setSelectedSongs(concat(selectedSongs, song));
        }
      } else {
        if (some(selectedQueueSongs, ['id', song.id])) {
          setSelectedQueueSongs(
            filter(selectedQueueSongs, function(item) {
              return item.id !== song.id;
            }),
          );
        } else {
          setSelectedQueueSongs(concat(selectedQueueSongs, song));
        }
      }
    };
  }
  function addSongsToQueue() {
    props.addToQueue(selectedSongs);
    setSelectedSongs([]);
  }
  function onRemove() {
    if (selectedQueueSongs.length > 0) {
      selectedQueueSongs.forEach(item => {
        remove(queue, ['id', item.id]);
      });
      props.setQueue(queue);
    }
    if (selectedSongs.length > 0) {
      selectedSongs.forEach(item => {
        remove(songsList, ['id', item.id]);
      });
      setUpcomingSongs(slice(songsList, currentSongIndex), songsList);
      setSelectedSongs([]);
    }
  }
  function renderTrack(isQueue) {
    return function({item, drag}) {
      return (
        <DraggableTrack
          item={item}
          drag={drag}
          isChecked={some(isQueue ? selectedQueueSongs : selectedSongs, [
            'id',
            item.id,
          ])}
          toggleSelect={toggleSelect(item, isQueue)}
        />
      );
    };
  }
  function itemSeparatorComponent() {
    return (
      <View
        style={{marginVertical: 10, borderWidth: 1, borderColor: '#181F3B'}}
      />
    );
  }
  function onDragEndUpNext({data}) {
    setUpcomingSongs(concat(slice(data, 0, currentSongIndex + 1), data), data);
  }
  function onDragEndQueue({data}) {
    props.setQueue(data);
  }
  const upNextList = slice(
    shuffle ? shuffledList : songsList,
    currentSongIndex + 1,
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(20, 25, 45, 1)',
        paddingTop: insets.top,
      }}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 16,
          paddingHorizontal: 8,
        }}>
        <TouchableOpacity onPress={onClose}>
          <Icon name="close" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(20, 25, 45, 1)',
        }}>
        <Text
          style={{
            fontSize: 19,
            color: 'white',
            paddingHorizontal: 8,
            paddingBottom: 16,
          }}>
          Now Playing
        </Text>
        <Track
          viewType="list"
          showMoreIcon
          subtitle="artist"
          track={currentSong}
        />
        {upNextList.length > 0 && (
          <View
            style={{
              paddingTop: 32,
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: 19,
                color: 'white',
                paddingHorizontal: 8,
                paddingBottom: 16,
              }}>
              Up Next
            </Text>
            <DraggableFlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => `draggable-item-${item.id}`}
              ItemSeparatorComponent={itemSeparatorComponent}
              data={upNextList}
              renderItem={renderTrack(false)}
              onDragEnd={onDragEndUpNext}
              ListFooterComponent={<View style={{height: 132}} />}
            />
          </View>
        )}
      </View>
      <QueueActionBar
        includesQueue={selectedQueueSongs.length > 0}
        addToQueue={addSongsToQueue}
        onRemove={onRemove}
        selectMode={selectedSongs.length > 0 || selectedQueueSongs.length > 0}
      />
    </View>
  );
}
function mapStateToProps(state) {
  return {
    currentSongIndex: state.player.currentSongIndex,
    songsList: state.player.songsList,
    shuffledList: state.player.shuffledList,
    shuffle: state.player.shuffle,
    currentSong: state.player.currentSong,
    queue: state.player.queue,
  };
}
export default connect(
  mapStateToProps,
  {minimizePlayer, addToQueue, setQueue},
)(Queue);
