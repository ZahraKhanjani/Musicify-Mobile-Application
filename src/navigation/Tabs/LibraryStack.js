import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LibraryScreen from 'screens/Library/LibraryScreen';
import ArtistScreen from 'screens/Artist/ArtistScreen';
import AlbumScreen from 'screens/Album/AlbumScreen';
import PlaylistScreen from 'screens/Playlist/PlaylistScreen';
import SeeAllScreen from 'screens/SeeAll/SeeAllScreen';

const Library = createStackNavigator();

function LibraryStack() {
  return (
    <Library.Navigator headerMode="none">
      <Library.Screen name="LibraryScreen" component={LibraryScreen} />
      <Library.Screen name="ArtistScreen" component={ArtistScreen} />
      <Library.Screen name="AlbumScreen" component={AlbumScreen} />
      <Library.Screen name="PlaylistScreen" component={PlaylistScreen} />
      <Library.Screen name="SeeAllScreen" component={SeeAllScreen} />
    </Library.Navigator>
  );
}
export default LibraryStack;
