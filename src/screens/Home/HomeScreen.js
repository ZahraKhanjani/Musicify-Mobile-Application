// Home.js
import React, {useRef} from 'react';
import {
  StyleSheet,
  ImageBackground,
  ScrollView,
  Animated,
} from 'react-native';

import {useSafeArea} from 'react-native-safe-area-context';
import homeBg from 'assets/homeBg.png';
import Setting from 'icons/Setting';
import {Page, ScreenWrapper} from 'components/index';
import Link from 'navigation/Link';
import {StackNames} from 'navigation/routeNames';

function HomeScreen(props) {
  const insets = useSafeArea();
  const scrollYِ = useRef(new Animated.Value(0)).current;
  const settingOpacity = scrollYِ.interpolate({
    inputRange: [0, 300],
    outputRange: [1, 0],
  });
  const notchOpacity = scrollYِ.interpolate({
    inputRange: [0, 300],
    outputRange: [0, 0.6],
  });
  return (
    <ScreenWrapper>
      <ImageBackground source={homeBg} style={[styles.container]}>
        <Animated.View
          style={[
            styles.animatedView,
            {
              height: insets.top,
              opacity: notchOpacity,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.header,
            {top: insets.top, opacity: settingOpacity, zIndex: settingOpacity},
          ]}>
          <Link style={{width: 30, height: 30}} routeName={StackNames.Settings}>
            <Setting />
          </Link>
        </Animated.View>
        <ScrollView
          contentContainerStyle={{marginTop: insets.top + 46}}
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
          <Page navigation={props.navigation} page="home" />
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
  animatedView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(20, 25, 45, 1)',
    zIndex: 1000,
  },
  header: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 18,
  },
});

export default HomeScreen;
