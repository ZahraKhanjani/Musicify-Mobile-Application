/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {Animated, View, Dimensions} from 'react-native';
import {Text} from 'components/index';
// import {BlurView} from '@react-native-community/blur';
import {useSafeArea} from 'react-native-safe-area-context';
import {UIActivityIndicator} from 'react-native-indicators';
import {connect} from 'react-redux';

type PropsType = {
  connectingToInternet: boolean,
};

function InternetErrorBox({connectingToInternet}: PropsType) {
  const insets = useSafeArea();
  const animation = useRef(new Animated.Value(0)).current;
  function handleOpen() {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  function handleClose() {
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }
  const screenHeight = Dimensions.get('window').height;
  const slideUp = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0.01, 1],
          outputRange: [-screenHeight, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  useEffect(() => {
    if (connectingToInternet) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [connectingToInternet]);

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}>
      <Animated.View
        style={[
          {
            flexDirection: 'row-reverse',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: insets.top,
          },
          slideUp,
        ]}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{fontSize: 13, color: 'white', marginBottom: 4}}>
            connecting to Musicify...
          </Text>
          <View style={{marginLeft: 4, marginBottom: 4}}>
            {connectingToInternet && (
              <UIActivityIndicator color="white" size={16} />
            )}
          </View>
        </View>
      </Animated.View>
    </View>
  );
}
function mapStateToProps(state) {
  return {
    connectingToInternet: state.general.connectingToInternet,
  };
}
export default connect(
  mapStateToProps,
  null,
)(InternetErrorBox);
