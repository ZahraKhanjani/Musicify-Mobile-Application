import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from 'screens/Home/HomeScreen';
import ArtistScreen from 'screens/Artist/ArtistScreen';
import AlbumScreen from 'screens/Album/AlbumScreen';
import PlaylistScreen from 'screens/Playlist/PlaylistScreen';
import SeeAllScreen from 'screens/SeeAll/SeeAllScreen';

const Home = createStackNavigator();

function HomeStack() {
  return (
    <Home.Navigator headerMode="none">
      <Home.Screen name="HomeScreen" component={HomeScreen} />
      <Home.Screen name="ArtistScreen" component={ArtistScreen} />
      <Home.Screen name="AlbumScreen" component={AlbumScreen} />
      <Home.Screen name="PlaylistScreen" component={PlaylistScreen} />
      <Home.Screen name="SeeAllScreen" component={SeeAllScreen} />
    </Home.Navigator>
  );
}
export default HomeStack;
