// @flow
import React from 'react';
import ListTrack from './ListTrack';
import SearchedTrack from './SearchedTrack';
import FastImage from 'react-native-fast-image';
import get from 'lodash/get';
import {StyleSheet} from 'react-native';
import {Text} from 'components/index';

type TrackPropTypes = {
  track: Object,
  subtitle?: 'album' | 'artist' | 'none',
  viewType: 'list' | 'searchList' | 'default',
  size?: 'large' | 'default',
  showMoreIcon?: boolean,
};

function Track({
  track,
  subtitle,
  viewType,
  size,
  showMoreIcon,
}: TrackPropTypes) {
  const artistsName = track.artists
    ? track.artists.data.map(artist => artist.name).join(', ')
    : 'Unknown';
  if (viewType === 'list') {
    return (
      <ListTrack
        subtitle={subtitle}
        track={track}
        showMoreIcon={showMoreIcon}
      />
    );
  }
  if (viewType === 'searchList') {
    return <SearchedTrack track={track} />;
  }
  return (
    <>
      <FastImage
        source={{
          uri: get(track, 'image.medium.url', ''),
        }}
        style={styles.trackPicture(size === 'large' ? 166 : 125)}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text numberOfLines={1} style={styles.trackName}>
        {artistsName}
      </Text>
      <Text numberOfLines={1} style={styles.name}>
        {get(track, 'name', '')}
      </Text>
    </>
  );
}
const styles = StyleSheet.create({
  name: {
    textAlign: 'left',
    fontSize: 13,
    color: '#B3B3B3',
    maxWidth: 140,
    overflow: 'hidden',
  },
  trackPicture: size => {
    return {
      height: size,
      width: size,
      borderRadius: 7,
    };
  },
  trackName: {
    textAlign: 'left',
    marginTop: 12,
    fontSize: 14,
    color: 'white',
    maxWidth: 125,
    overflow: 'hidden',
  },
  separator: {
    marginHorizontal: 9,
  },
});
export default Track;
