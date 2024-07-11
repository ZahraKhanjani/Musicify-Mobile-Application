import React from 'react';
import {ListItem} from 'components/index';
import get from 'lodash/get';
import NavigationService from 'navigation/NavigationService';
import {ModalsNames} from 'navigation/routeNames';

function SearchedTrack({track}) {
  const artistsName = track.artists
    ? track.artists.data.map(artist => artist.name).join(', ')
    : 'Unknown';
  const onPressMore = () => {
    NavigationService.navigate(ModalsNames.SongInfo, {track});
  };
  return (
    <ListItem
      containerStyle={{
        paddingHorizontal: 0,
        backgroundColor: 'transparent',
      }}
      leftAvatar={{
        // ImageComponent: FastImage,
        source: {uri: get(track, 'image.medium.url', '')},
        containerStyle: {
          borderRadius: 7,
          height: 55,
          width: 55,
          overflow: 'hidden',
        },
      }}
      rightIcon={{name: 'more-horiz', color: '#93A8B3', onPress: onPressMore}}
      titleStyle={{color: 'white', fontSize: 17}}
      titleProps={{numberOfLines: 1}}
      title={get(track, 'name', 'Unknown')}
      subtitle={artistsName}
      subtitleProps={{numberOfLines: 1}}
      subtitleStyle={{fontSize: 14, color: 'grey'}}
    />
  );
}

export default SearchedTrack;
