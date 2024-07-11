import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useNavigationState} from '@react-navigation/native';
import {connect} from 'react-redux';
import {minimizePlayer} from 'screens/Player/playerActions';
import {setQueueAndPlay} from 'screens/Player/NewPlayer';
import {Album, Artist, Playlist, Track} from 'components/index';
import {TrackSources} from 'utils/AnalyticsEvents';
import get from 'lodash/get';

function PageList(props) {
  const navigation = useNavigationState(state => state);
  const routeName = get(navigation, ['routes', 0, 'name'], '');
  function renderItem({item}) {
    switch (item.type) {
      case 'artist':
        return <Artist artist={item} />;
      case 'album':
        return <Album album={item} />;
      case 'playlist':
        return <Playlist playlist={item} />;
      case 'track':
        return (
          <TouchableOpacity
            onPress={() => {
              setQueueAndPlay(
                props.data.filter(listItem => listItem.type === 'track'),
                item.id,
                props?.id,
                TrackSources.page,
                routeName,
              );
            }}>
            <Track track={item} viewType="default" size="default" />
          </TouchableOpacity>
        );
      default:
        return null;
    }
  }
  function itemSeparatorComponent() {
    return <View style={styles.separator} />;
  }
  function listFooterComponent() {
    return <View style={styles.last} />;
  }
  function keyExtractor(item: Object, index: number) {
    return `${item.id}-${index}`;
  }
  return (
    <View style={styles.collection}>
      <FlatList
        ItemSeparatorComponent={itemSeparatorComponent}
        data={props.data}
        style={styles.list}
        renderItem={renderItem}
        horizontal
        ListFooterComponent={listFooterComponent}
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  collection: {
    width: '100%',
    marginBottom: 16,
  },
  list: {
    paddingLeft: 18,
  },
  last: {
    marginRight: 32,
  },
  title: {
    fontSize: 25,
    color: 'white',
    textAlign: 'left',
  },
  separator: {
    marginHorizontal: 9,
  },
});
export default connect(
  null,
  {minimizePlayer},
)(PageList);
