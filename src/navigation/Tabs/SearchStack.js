import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from 'screens/Search/SearchScreen';
import ArtistScreen from 'screens/Artist/ArtistScreen';
import AlbumScreen from 'screens/Album/AlbumScreen';
import PlaylistScreen from 'screens/Playlist/PlaylistScreen';
import SeeAllScreen from 'screens/SeeAll/SeeAllScreen';

const Search = createStackNavigator();

function SearchStack() {
  return (
    <Search.Navigator headerMode="none">
      <Search.Screen name="SearchScreen" component={SearchScreen} />
      <Search.Screen name="ArtistScreen" component={ArtistScreen} />
      <Search.Screen name="AlbumScreen" component={AlbumScreen} />
      <Search.Screen name="PlaylistScreen" component={PlaylistScreen} />
      <Search.Screen name="SeeAllScreen" component={SeeAllScreen} />
    </Search.Navigator>
  );
}
export default SearchStack;
