// Home.js
import React, {useRef} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,
  ScrollView,
  Animated,
} from 'react-native';

import {useSafeArea} from 'react-native-safe-area-context';
import homeBg from 'assets/homeBg.png';
import {Page, ScreenWrapper} from 'components/index';

function PlaylistsScreen(props) {
  const insets = useSafeArea();
  const scrollYِ = useRef(new Animated.Value(0)).current;
  const notchOpacity = scrollYِ.interpolate({
    inputRange: [0, 300],
    outputRange: [0, 0.7],
  });
  return (
    <ScreenWrapper>
      <ImageBackground source={homeBg} style={[styles.container]}>
        <Animated.View
          style={{
            width: '100%',
            height: insets.top,
            backgroundColor: 'rgba(20, 25, 45, 1)',
            opacity: notchOpacity,
            zIndex: 100,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
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
          ])}>
          <Text style={styles.title}>Playlists</Text>
          <Page navigation={props.navigation} page="playlist" />
        </ScrollView>
      </ImageBackground>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    flex: 1,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 18,
    paddingHorizontal: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 18,
  },
});

export default PlaylistsScreen;
