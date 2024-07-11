/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import authBg from 'assets/authBg.png';
import {ProfileApi} from 'api/index';
import get from 'lodash/get';
import BackIcon from 'icons/BackIcon';
import {useSafeArea} from 'react-native-safe-area-context';
import NameField from 'icons/NameField';
import {connect} from 'react-redux';
import {setProfileInfo} from '../Auth/authActions';
import {GradientButton, Input} from 'components/index';

function ChangeNameScreen(props) {
  const insets = useSafeArea();
  const [requesting, setRequesting] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState(get(props, 'route.params.name', ''));
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  function checkValidation() {
    if (!name) {
      setFormError('This field cannot be empty!');
      return false;
    }
    return true;
  }
  function changeName() {
    if (checkValidation()) {
      setRequesting(true);
      setError('');
      ProfileApi.updateProfile({name})
        .then(res => {
          setRequesting(false);
          props.setProfileInfo(get(res, 'data', {}));
          setSuccessMessage('Changed Name Successfully!');
        })
        .catch(e => {
          if (get(e, 'response.data.errors', null)) {
            setFormError(e.response.data.errors.name);
          } else {
            setError('Something Went Wrong :(');
          }
          setRequesting(false);
          console.log(e.response);
        });
    }
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
      <View
        style={{
          position: 'absolute',
          top: insets.top + 14,
          left: 18,
          flexDirection: 'row',
          marginBottom: 27,
        }}>
        <TouchableOpacity
          style={{width: 30, height: 30}}
          onPress={() => {
            props.navigation.goBack(null);
          }}>
          <BackIcon />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={styles.title}>Change Name</Text>

            <Input
              autoCapitalize="none"
              containerStyle={styles.textInput}
              inputStyle={{fontSize: 14, fontWeight: '400', color: 'white'}}
              placeholderTextColor="#B3B3B3"
              leftIconContainerStyle={{
                marginRight: 24,
                marginLeft: 0,
              }}
              errorMessage={formError}
              placeholder="Name"
              value={name}
              leftIcon={<NameField />}
              onChangeText={setName}
            />
            {error ? (
              <Text style={{color: 'red', fontSize: 12, marginVertical: 8}}>
                {error}
              </Text>
            ) : null}

            <GradientButton
              onPress={changeName}
              containerStyle={{height: 48}}
              textStyle={{fontWeight: '500', fontSize: 15}}
              disabled={requesting}
              requesting={requesting}
              text="Change Name"
            />
            {successMessage ? (
              <Text
                style={{
                  color: 'green',
                  fontSize: 12,
                  marginVertical: 8,
                  textAlign: 'center',
                }}>
                {successMessage}
              </Text>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  textInput: {
    marginBottom: 44,
    paddingHorizontal: 0,
  },
  button: {
    height: 48,
    borderRadius: 24,
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 80,
  },
});
export default connect(
  null,
  {setProfileInfo},
)(ChangeNameScreen);
