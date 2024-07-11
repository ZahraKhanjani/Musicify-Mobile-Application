// @flow
import React from 'react';
import {skipToSong} from 'screens/Player/NewPlayer';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'components/index';
import {CheckBox} from 'components/index';
import FastImage from 'react-native-fast-image';
import get from 'lodash/get';
import Drag from 'icons/Drag';

function DraggableTrack({
  item,
  drag,
  isChecked,
  toggleSelect,
}: {
  item: Object,
  drag: Function,
  isChecked: boolean,
  toggleSelect: Function,
}) {
  const artistsName = item.artists
    ? item.artists.data.map(artist => artist.name).join(', ')
    : 'Unknown';
  return (
    <TouchableOpacity
      key={item.id}
      onLongPress={drag}
      onPress={() => {
        skipToSong(item.id);
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 64,
        }}>
        <TouchableOpacity
          style={{
            width: 48,
            height: 64,
            justifyContent: 'center',
            paddingLeft: 18,
          }}>
          <CheckBox
            iconType="ionicon"
            containerStyle={{padding: 0, marginLeft: 0}}
            size={22}
            onPress={toggleSelect}
            checkedColor="white"
            checkedIcon="ios-radio-button-on"
            uncheckedIcon="ios-radio-button-off"
            checked={isChecked}
          />
        </TouchableOpacity>
        <FastImage
          source={{
            uri: get(item, 'image.medium.url', ''),
          }}
          style={{
            height: 43,
            width: 43,
            borderRadius: 4,
            backgroundColor: '#C7C7C7',
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={{flexGrow: 1, paddingHorizontal: 8}}>
          <Text
            numberOfLines={1}
            style={{
              color: 'white',
              fontSize: 17,
              marginBottom: 8,
              maxWidth: 180,
              overflow: 'hidden',
            }}>
            {get(item, 'name', 'Unknown')}
          </Text>
          <Text
            numberOfLines={1}
            style={{color: '#C7C7C7', fontSize: 13, maxWidth: 180}}>
            {artistsName}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: 60,
            height: 64,
            justifyContent: 'center',
            paddingRight: 18,
          }}
          onPress={drag}
          onLongPress={drag}>
          <Drag style={{alignSelf: 'flex-end'}} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
export default DraggableTrack;
