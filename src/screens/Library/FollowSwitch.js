// @flow
import React from 'react';
import get from 'lodash/get';
import indexOf from 'lodash/indexOf';
import {TouchableOpacity} from 'react-native';
import {Text} from 'components/index';
import {connect} from 'react-redux';
import {followArtist, unfollowArtist} from './libraryActions';
import {ProfileApi} from 'api/index';

type PropsType = {
  artist: Object,
  followedArtists: Array<string>,
  followArtist: Function,
  unfollowArtist: Function,
  style: Object,
};

function FollowSwitch(props: PropsType) {
  const {artist} = props;
  const isFollowing =
    get(artist, 'is_favorite', false) ||
    indexOf(props.followedArtists, artist.id) >= 0;
  function toggleFollow() {
    if (!isFollowing) {
      props.followArtist(artist.id);
      ProfileApi.followArtist(artist.id);
    } else {
      props.unfollowArtist(artist.id);
      ProfileApi.unfollowArtist(artist.id);
    }
  }
  return (
    <TouchableOpacity style={props.style} onPress={toggleFollow}>
      <Text
        style={{
          alignSelf: 'center',
          textAlign: 'center',
          color: 'white',
        }}>
        {isFollowing ? 'Following' : '+ Follow'}
      </Text>
    </TouchableOpacity>
  );
}
function mapStateToProps(state) {
  return {
    followedArtists: state.library.followedArtists,
  };
}

export default connect(
  mapStateToProps,
  {
    followArtist,
    unfollowArtist,
  },
)(FollowSwitch);
