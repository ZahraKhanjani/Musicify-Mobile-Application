import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Text, MinimizedPlayer} from 'components/index';
import {useSafeArea} from 'react-native-safe-area-context';

import Home from 'icons/Home';
import Search from 'icons/Search';
import PlayListHome from 'icons/PlayListHome';
import Library from 'icons/Library';
import {StackNames} from './routeNames';
import {connect} from 'react-redux';
import {BOTTOM_TAB_HEIGHT, MINIMIZED_PLAYER_HEIGHT} from 'theme/constants';

function BottomTabs({state, navigation, minimized}) {
  const insets = useSafeArea();
  const routesIcons = {
    [StackNames.Home]: Home,
    [StackNames.Search]: Search,
    [StackNames.Playlists]: PlayListHome,
    [StackNames.Library]: Library,
  };
  const routesLabels = {
    [StackNames.Home]: 'Home',
    [StackNames.Search]: 'Search',
    [StackNames.Playlists]: 'PlayLists',
    [StackNames.Library]: 'Library',
  };
  return (
    <View
      style={[
        styles.mainContainer,
        {
          height:
            BOTTOM_TAB_HEIGHT +
            insets.bottom +
            (minimized ? MINIMIZED_PLAYER_HEIGHT : 0),
        },
      ]}>
      {minimized && <MinimizedPlayer navigation={navigation} />}
      <View style={[styles.tabBar, {height: 55 + insets.bottom}]}>
        {state.routes.map((route, index) => {
          const label = routesLabels[route.name];
          const Icon = routesIcons[route.name];

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={label}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tabItem, {paddingBottom: insets.bottom}]}>
              <Icon
                active={isFocused}
                color={isFocused ? 'white' : '#B3B3B3'}
              />
              <Text
                style={[
                  styles.tabLabel,
                  {color: isFocused ? 'white' : '#B3B3B3'},
                ]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
  },
  tabBar: {
    backgroundColor: '#101426',
    flexDirection: 'row',
  },
  tabItem: {
    paddingTop: 8,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },
});
function mapStateToProps(state) {
  return {
    minimized: state.player.minimized,
  };
}
export default connect(
  mapStateToProps,
  null,
)(BottomTabs);
