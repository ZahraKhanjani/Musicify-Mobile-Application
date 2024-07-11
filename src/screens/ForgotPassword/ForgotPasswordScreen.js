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
import EmailField from 'icons/EmailField';
import BackIcon from 'icons/BackIcon';
import {useSafeArea} from 'react-native-safe-area-context';
import Link from 'navigation/Link';
import {ScreensNames} from 'navigation/routeNames';
import {GradientButton, Input} from 'components/index';

function ForgotPasswordScreen(props) {
  const insets = useSafeArea();
  const [requesting, setRequesting] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  function checkValidation() {
    if (!email) {
      setFormError('This field cannot be empty!');
      return false;
    }
    return true;
  }
  function sendEmail() {
    if (checkValidation()) {
      setRequesting(true);
      setError('');
      ProfileApi.forgetPassword({email})
        .then(res => {
          setRequesting(false);
          setSuccessMessage(
            `We have sent an email to ${email}. \nPlease check your inbox for further instructions.`,
          );
        })
        .catch(e => {
          if (get(e, 'response.data.errors', null)) {
            setFormError(e.response.data.errors.email);
          } else {
            setError('Wrong Email');
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
          top: insets.top + 32,
          left: 32,
          flexDirection: 'row',
          marginBottom: 27,
        }}>
        <TouchableOpacity
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
            <View>
              <Text style={styles.title}>Forgot Password</Text>
              <Text style={styles.subtitle}>
                If you need help resetting your password, we can help by sending
                you a link by email to reset it.
              </Text>
              {successMessage ? (
                <Text
                  style={{
                    color: 'gray',
                    fontSize: 15,
                    marginVertical: 16,
                    lineHeight: 32,
                  }}>
                  {successMessage}
                </Text>
              ) : null}
              <Input
                autoCapitalize="none"
                containerStyle={styles.textInput}
                inputStyle={{fontSize: 14, fontWeight: '400', color: 'white'}}
                placeholderTextColor="#B3B3B3"
                errorMessage={formError}
                leftIconContainerStyle={{
                  marginRight: 24,
                  marginLeft: 0,
                }}
                placeholder="E-Mail"
                caretHidden
                value={email}
                leftIcon={<EmailField />}
                onChangeText={setEmail}
              />
              {error ? (
                <Text style={{color: 'red', fontSize: 12, marginVertical: 8}}>
                  {error}
                </Text>
              ) : null}

              <GradientButton
                onPress={sendEmail}
                containerStyle={{height: 48}}
                textStyle={{fontWeight: '500', fontSize: 15}}
                disabled={requesting}
                requesting={requesting}
                text="SEND"
              />

              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 8,
                  marginTop: 38,
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'white', fontSize: 14}}>
                  Don't have an account?
                </Text>
                <Link routeName={ScreensNames.SignUp}>
                  <Text
                    style={{
                      color: '#FF3636',
                      fontWeight: 'bold',
                      marginLeft: 4,
                      fontSize: 14,
                    }}>
                    Sign Up
                  </Text>
                </Link>
              </View>
            </View>
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
    marginBottom: 42,
  },
  subtitle: {
    fontSize: 18,
    color: '#B3B3B3',
    marginBottom: 32,
    lineHeight: 25,
  },
});
export default ForgotPasswordScreen;
