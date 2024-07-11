// Library.js
import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  FlatList,
} from 'react-native';

import homeBg from 'assets/homeBg.png';
import {useSafeArea} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Artists from './Artists';
import Playlists from './Playlists';
import Albums from './Albums';
import Tracks from './Tracks';
import {ScreenWrapper} from 'components/index';

function LibraryScreen(props) {
  const insets = useSafeArea();
  const [activeItem, setActiveItem] = useState('Playlist');
  const menuItems = ['Playlist', 'Track', 'Artist', 'Album'];
  const scrollYِ = useRef(new Animated.Value(0)).current;
  const items = {
    Artist: Artists,
    Playlist: Playlists,
    Album: Albums,
    Track: Tracks,
  };
  const Active = items[activeItem];
  function setActive(item) {
    return function() {
      setActiveItem(item);
    };
  }
  function renderMenuItem({item}) {
    return (
      <TouchableOpacity
        style={{justifyContent: 'center', height: 32, marginHorizontal: 18}}
        onPress={setActive(item)}>
        {activeItem === item ? (
          <LinearGradient
            start={{x: 0.0, y: 1.0}}
            end={{x: 1.0, y: 0.0}}
            colors={['#DB007C', '#FF3737']}
            style={styles.activeItem}>
            <Text style={styles.activeText}>{item}</Text>
          </LinearGradient>
        ) : (
          <Text style={styles.menuItemText}>{item}</Text>
        )}
      </TouchableOpacity>
    );
  }
  const notchOpacity = scrollYِ.interpolate({
    inputRange: [0, 300],
    outputRange: [0, 1],
  });
  function keyExtractor(item) {
    return `library-menu-item-${item}`;
  }
  return (
    <ScreenWrapper>
      <ImageBackground source={homeBg} style={[styles.container]}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: insets.top,
            backgroundColor: 'rgba(20, 25, 45, 1)',
            opacity: notchOpacity,
            zIndex: 1000,
          }}
        />
        <ScrollView
          contentContainerStyle={{marginTop: insets.top}}
          scrollEventThrottle={1}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollYِ,
                },
              },
            },
          ])}
          stickyHeaderIndices={[1]}>
          <Text style={{color: 'white', fontSize: 26, textAlign: 'center'}}>
            Library
          </Text>
          <View>
            <Animated.View
              style={{
                position: 'absolute',
                right: 0,
                left: 0,
                top: 0,
                backgroundColor: 'rgba(20, 25, 45, 1)',
                height: 64,
                width: '100%',
                opacity: notchOpacity,
              }}
            />
            <FlatList
              keyExtractor={keyExtractor}
              style={[styles.menu]}
              data={menuItems}
              showsHorizontalScrollIndicator={false}
              renderItem={renderMenuItem}
              horizontal
            />
          </View>
          <Active
            containerStyle={{marginTop: 16}}
            navigation={props.navigation}
          />
        </ScrollView>
      </ImageBackground>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activeItem: {
    height: 32,
    borderRadius: 8,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  activeText: {
    fontSize: 21,
    color: 'white',
  },
  menu: {
    zIndex: 100,
    height: 32,
    marginTop: 16,
    flexGrow: 0,
  },
  menuItemText: {
    color: '#8EA0A8',
    fontSize: 19,
    alignSelf: 'center',
  },
});
export default LibraryScreen;
