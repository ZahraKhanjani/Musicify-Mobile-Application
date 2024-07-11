import React from 'react';
import get from 'lodash/get';
import {ListItem} from 'components/index';

function ArtistRow({artist}) {
  return (
    <ListItem
      containerStyle={{
        backgroundColor: 'transparent',
        paddingHorizontal: 16,
      }}
      leftAvatar={{
        // ImageComponent: FastImage,
        source: {uri: get(artist, 'image.medium.url', '')},
        containerStyle: {
          height: 55,
          width: 55,
          borderRadius: 27.5,
          overflow: 'hidden',
        },
      }}
      titleStyle={{color: 'white', fontSize: 17, lineHeight: 22}}
      titleProps={{numberOfLines: 1}}
      title={get(artist, 'name', 'Unknown')}
      subtitle="Artist"
      subtitleProps={{numberOfLines: 1}}
      subtitleStyle={{fontSize: 13, color: '#C7C7C7', marginTop: 6}}
    />
  );
}

export default ArtistRow;
