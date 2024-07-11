import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabStack from './TabStack';
import PlayerModal from 'screens/Player/PlayerModal';
import SongInfoModal from 'screens/SongInfo/SongInfoModal';
import AddToPlaylist from 'screens/Playlist/AddToPlaylist';
import {ModalsNames, StackNames} from './routeNames';
import Queue from 'screens/Queue/Queue';
import Lyrics from 'screens/Lyrics/Lyrics';
import PlaylistMoreModal from 'screens/PlaylistMore/PlaylistMoreModal';

const Main = createStackNavigator();

function MainStack() {
  function forFade({current}) {
    return {
      cardStyle: {
        opacity: current.progress,
      },
    };
  }
  return (
    <Main.Navigator
      headerMode="none"
      mode="modal"
      screenOptions={{
        gestureEnabled: true,
      }}>
      <Main.Screen
        name={StackNames.Tabs}
        component={TabStack}
        options={{headerShown: false, gestureEnabled: false}}
      />

      <Main.Screen name={ModalsNames.Player} component={PlayerModal} />
      <Main.Screen
        options={{
          cardStyle: {backgroundColor: 'transparent', opacity: 0.99},
          cardOverlayEnabled: true,
        }}
        name={ModalsNames.SongInfo}
        component={SongInfoModal}
      />
      <Main.Screen name={ModalsNames.AddToPlaylist} component={AddToPlaylist} />
      <Main.Screen
        options={{
          cardStyle: {backgroundColor: 'transparent', opacity: 0.99},
          cardOverlayEnabled: true,
        }}
        name={ModalsNames.PlaylistMore}
        component={PlaylistMoreModal}
      />
      <Main.Screen
        options={{
          cardStyleInterpolator: forFade,
        }}
        name={ModalsNames.Queue}
        component={Queue}
      />
      <Main.Screen
        options={{
          cardStyleInterpolator: forFade,
        }}
        name={ModalsNames.Lyrics}
        component={Lyrics}
      />
    </Main.Navigator>
  );
}
export default MainStack;
