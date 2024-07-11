import React from 'react';
import FastImage from 'react-native-fast-image';
import get from 'lodash/get';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Icon, Text} from 'components/index';
import {store} from '../../store';

function ListPlaylist({
  playlist,
  onPressMore,
}: {
  playlist: Object,
  onPressMore: Function,
}) {
  const isUsers =
    get(playlist, 'user_id', '') ===
    get(store.getState(), ['auth', 'profileInfo', 'id'], '0');
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
      }}>
      <FastImage
        source={{
          uri: get(playlist, 'image.medium.url', ''),
        }}
        style={styles.playlistImage}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.playlistInfo}>
        <Text
          style={{
            color: 'white',
            fontSize: 17,
          }}>
          {get(playlist, 'name', 'Unknown')}
        </Text>
        <Text style={styles.playlistSubtitle}>{`By ${
          isUsers ? 'You' : 'Musicify'
        } `}</Text>
      </View>
      {isUsers && (
        <TouchableOpacity
          onPress={() => {
            onPressMore(playlist);
          }}
          style={styles.closeIcon}>
          <Icon name="more-horiz" size={20}  color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  playlistSubtitle: {
    color: '#C7C7C7',
    fontSize: 13,
  },
  playlistInfo: {
    marginLeft: 12,
    alignSelf: 'center',
  },
  playlistImage: {
    width: 75,
    height: 58,
    backgroundColor: '#2E3244',
    borderRadius: 7,
    justifyContent: 'center',
  },
  playlistName: {
    textAlign: 'left',
    marginTop: 12,
    fontSize: 14,
    color: 'white',
    maxWidth: 166,
    overflow: 'hidden',
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
  },
});

export default ListPlaylist;
