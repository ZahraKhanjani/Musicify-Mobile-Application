import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Text} from 'components/index';
import {useNavigationState} from '@react-navigation/native';
import get from 'lodash/get';
import FastImage from 'react-native-fast-image';
import ListItemPlayIcon from 'icons/ListItemPlayIcon';
import {setQueueAndPlay} from 'screens/Player/NewPlayer';
import LinearGradient from 'react-native-linear-gradient';
import {TrackSources} from 'utils/AnalyticsEvents';
import {ITEM_HEIGHTS} from 'theme/constants';

function RowList(props) {
  const tracks = get(props, 'data.tracks.data', []);
  const navigation = useNavigationState(state => state);
  const routeName = get(navigation, ['routes', 0, 'name'], '');
  function renderItem({item}) {
    const backgroundColor = get(item, 'background_color', 'black');
    const gradientColor = get(item, 'gradient_color', 'grey');
    const artistsName = item.artists
      ? item.artists.data.map(artist => artist.name).join(', ')
      : 'Unknown';
    const name = item.name || 'Unknown';
    return (
      <TouchableOpacity
        onPress={() => {
          setQueueAndPlay(
            tracks,
            item.id,
            props.data.id,
            TrackSources.page,
            routeName,
          );
        }}>
        <View style={styles.track}>
          <LinearGradient
            colors={[backgroundColor, gradientColor]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              width: '60%',
              borderTopRightRadius: 7,
              borderBottomRightRadius: 7,
              zIndex: 2,
            }}
          />
          <LinearGradient
            colors={['transparent', backgroundColor]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              position: 'absolute',
              width: '61%',
              left: 0,
              top: 0,
              bottom: 0,
              zIndex: 1,
            }}
          />

          <FastImage
            source={{
              uri: get(item, 'image.medium.url', ''),
            }}
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={{marginRight: 12, zIndex: 3}}>
            <Text style={styles.artistName}>{artistsName}</Text>
            <Text style={styles.name}>{name}</Text>
          </View>
          <ListItemPlayIcon style={{zIndex: 3}} />
        </View>
      </TouchableOpacity>
    );
  }
  function keyExtractor(item: Object, index: number) {
    return `${item.id}-${index}`;
  }
  const getItemLayout = (data, index) => ({
    length: ITEM_HEIGHTS.LIST,
    offset: ITEM_HEIGHTS.LIST * index,
    index,
  });
  return (
    <View style={styles.collection}>
      <FlatList
        getItemLayout={getItemLayout}
        data={tracks}
        renderItem={renderItem}
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
  track: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 16,
    padding: 20,
    height: 69,
  },
  image: {
    position: 'absolute',
    width: '60%',
    left: 0,
    top: 0,
    bottom: 0,
    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7,
  },
  artistName: {
    fontSize: 19,
    color: 'white',
    fontWeight: 'bold',
    // shadowColor: 'black',
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0.7,
    // shadowRadius: 3,
  },
  name: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    // shadowColor: 'black',
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0.7,
    // shadowRadius: 3,
  },
});

export default RowList;
