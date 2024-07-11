import React from 'react';
import {ImageBackground, Linking} from 'react-native';
import authBg from 'assets/authBg.png';
import {GradientButton, Text} from 'components/index';

function ForceUpdateScreen(props) {
  const {updateLink} = props.route.params;
  function updateButtonPressed() {
    Linking.openURL(updateLink).catch(error => {});
  }
  return (
    <ImageBackground
      source={authBg}
      style={{
        flex: 1,
        backgroundColor: '#2D1948',
        justifyContent: 'center',
        paddingHorizontal: 32,
        resizeMode: 'cover',
      }}>
      <Text
        style={{
          fontSize: 18,
          color: 'white',
          marginBottom: 48,
        }}>
        A newer version is available
      </Text>
      <GradientButton
        onPress={updateButtonPressed}
        containerStyle={{height: 48}}
        textStyle={{fontWeight: '500', fontSize: 15}}
        text="UPDATE"
      />
    </ImageBackground>
  );
}
export default ForceUpdateScreen;
