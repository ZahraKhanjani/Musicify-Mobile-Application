// @flow
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity, View, FlatList} from 'react-native';
import {setQueueAndPlay} from 'screens/Player/NewPlayer';
import {Text, Track} from 'components/index';
import {TrackSources} from 'utils/AnalyticsEvents';
import {ITEM_HEIGHTS} from 'theme/constants';

type PropsType = {
  navigation: any,
  onSeeAll: Function,
  tracks: Array<Object>,
};

function TopSongs(props: PropsType) {
  const {tracks, onSeeAll, listId} = props;
  function renderTrack({item, index}) {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => {
          setQueueAndPlay(tracks, item.id, listId, TrackSources.artist);
        }}>
        <Track viewType="list" showMoreIcon track={item} />
      </TouchableOpacity>
    );
  }
  const getItemLayout = (data, index) => ({
    length: ITEM_HEIGHTS.LIST,
    offset: ITEM_HEIGHTS.LIST * index,
    index,
  });
  return (
    <View
      style={{
        top: -32,
      }}>
      <LinearGradient
        colors={['rgba(20, 25, 45, 0.0)', 'rgba(20, 25, 45, 1)']}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
        }}>
        <Text
          style={{
            fontSize: 25,
            color: 'white',
            fontWeight: 'bold',
          }}>
          Top Songs
        </Text>
        <TouchableOpacity onPress={onSeeAll}>
          <View
            style={{
              alignSelf: 'center',
              borderColor: '#F82B46',
              borderWidth: 1,
              borderRadius: 7,
              height: 27,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 8,
              marginTop: 4,
            }}>
            <Text style={{color: '#F82B46', fontSize: 12}}>See All</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
      <View style={{paddingVertical: 16}}>
        <FlatList
          getItemLayout={getItemLayout}
          data={tracks}
          renderItem={renderTrack}
        />
      </View>
    </View>
  );
}

export default TopSongs;
