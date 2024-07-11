// Search.js
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, ImageBackground, Animated} from 'react-native';
import {AppApi} from 'api/index';
import homeBg from 'assets/homeBg.png';
import {
  SearchSuggestions,
  SearchFormScreen,
  ScreenWrapper,
} from 'components/index';
import {useSafeArea} from 'react-native-safe-area-context';

function SearchScreen(props) {
  const insets = useSafeArea();
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const [searchMode, setSearchMode] = useState(false);
  function activeSearchMode() {
    setSearchMode(true);
  }
  function deactiveSearchMode() {
    setSearchMode(false);
  }
  useEffect(() => {
    if (searchMode) {
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchMode]);
  const opacity = animatedOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  });
  return (
    <ScreenWrapper>
      <ImageBackground
        source={homeBg}
        style={[styles.container, {paddingTop: insets.top + 14}]}>
        {searchMode ? (
          <Animated.View style={{flex: 1, width: '100%', opacity}}>
            <SearchFormScreen
              navigation={props.navigation}
              deactiveSearchMode={deactiveSearchMode}
            />
          </Animated.View>
        ) : (
          <SearchSuggestions
            navigation={props.navigation}
            activeSearchMode={activeSearchMode}
          />
        )}
      </ImageBackground>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  resultsContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  track: {
    height: 80,
  },
  songName: {
    textAlign: 'center',
  },
});

export default SearchScreen;
