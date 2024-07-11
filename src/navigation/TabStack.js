import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTabs from './BottomTabs';
import HomeStack from './Tabs/HomeStack';
import SearchStack from './Tabs/SearchStack';
import PlaylistsStack from './Tabs/PlaylistsStack';
import LibraryStack from './Tabs/LibraryStack';
import {StackNames} from './routeNames';

const Tabs = createBottomTabNavigator();

function TabStack() {
  return (
    <Tabs.Navigator tabBar={props => <BottomTabs {...props} />}>
      <Tabs.Screen name={StackNames.Home} component={HomeStack} />
      <Tabs.Screen name={StackNames.Search} component={SearchStack} />
      <Tabs.Screen name={StackNames.Playlists} component={PlaylistsStack} />
      <Tabs.Screen name={StackNames.Library} component={LibraryStack} />
    </Tabs.Navigator>
  );
}
export default TabStack;
