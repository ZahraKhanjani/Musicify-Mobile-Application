import React from 'react';
import {TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ListItem} from 'components/index';
import NavigationService from 'navigation/NavigationService';
import {ScreensNames} from 'navigation/routeNames';
import {COLOURS} from 'theme/constants';

function ProfileCard(props) {
  function onPress() {
    NavigationService.navigate(ScreensNames.Profile);
  }
  return (
    <ListItem
      Component={TouchableOpacity}
      onPress={onPress}
      linearGradientProps={{
        colors: ['#3A215B', '#212C5B'],
        start: {x: 1.0, y: 0.0},
        end: {x: 0.2, y: 0.0},
        style: {
          borderRadius: 7,
        },
      }}
      containerStyle={{
        marginTop: 18,
      }}
      ViewComponent={LinearGradient}
      leftAvatar={{
        rounded: true,
        icon: {name: 'person', size: 40, color: 'grey'},
        containerStyle: {
          borderRadius: 30,
          overflow: 'hidden',
          backgroundColor: COLOURS.grey,
          width: 60,
          height: 60,
          justifyContent: 'center',
          marginRight: 8,
        },
      }}
      title={props.title}
      titleStyle={{color: 'white', fontSize: 21, marginBottom: 8}}
      subtitleStyle={{color: '#B3B3B3', fontSize: 14}}
      subtitle="Free Account"
      chevron={{color: '#B3B3B3', size: 32}}
    />
  );
}

export default ProfileCard;
