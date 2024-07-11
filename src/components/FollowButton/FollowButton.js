//@flow
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'components/index';
type PropsType = {
  isFollowing: boolean,
  containerStyle: ?Object,
  onPress: Function,
};

function FollowButton(props: PropsType) {
  const {isFollowing, containerStyle, onPress} = props;
  return (
    <TouchableOpacity
      style={[styles.followButton, containerStyle || {}]}
      onPress={onPress}>
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

const styles = StyleSheet.create({
  followButton: {
    alignSelf: 'center',
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 18,
    height: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 50,
  },
});
export default FollowButton;
