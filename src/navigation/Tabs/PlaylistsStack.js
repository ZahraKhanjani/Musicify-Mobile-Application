import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PlaylistsScreen from 'screens/Playlists/PlaylistsScreen';
import ArtistScreen from 'screens/Artist/ArtistScreen';
import AlbumScreen from 'screens/Album/AlbumScreen';
import PlaylistScreen from 'screens/Playlist/PlaylistScreen';
import SeeAllScreen from 'screens/SeeAll/SeeAllScreen';

const Playlists = createStackNavigator();

function PlaylistsStack() {
  return (
    <Playlists.Navigator headerMode="none">
      <Playlists.Screen name="PlaylistsScreen" component={PlaylistsScreen} />
      <Playlists.Screen name="ArtistScreen" component={ArtistScreen} />
      <Playlists.Screen name="AlbumScreen" component={AlbumScreen} />
      <Playlists.Screen name="PlaylistScreen" component={PlaylistScreen} />
      <Playlists.Screen name="SeeAllScreen" component={SeeAllScreen} />
    </Playlists.Navigator>
  );
}
export default PlaylistsStack;
