/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useContext} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import authBg from 'assets/authBg.png';
import keys from 'lodash/keys';
import {ProfileApi} from 'api/index';
import get from 'lodash/get';
import {AuthContext} from '../../App';
import EmailField from 'icons/EmailField';
import PasswordField from 'icons/PasswordField';
import Eye from 'icons/Eye';
import Link from 'navigation/Link';
import {ScreensNames} from 'navigation/routeNames';
import {store} from '../../store';
import {setProfileInfo} from './authActions';
import {GradientButton, Input} from 'components/index';

function SignInScreen(props) {
  const {signInApp} = useContext(AuthContext);
  const [securePassword, setSecurePassword] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const [error, setError] = useState('');
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  function checkValidation() {
    let isValid = true;
    let errors = {};
    keys(formFields).forEach(field => {
      if (!formFields[field]) {
        errors[field] = 'This field cannot be empty!';
        isValid = false;
      }
    });
    setFormErrors({
      ...formErrors,
      ...errors,
    });
    return isValid;
  }
  function setFormField(field) {
    return function(value) {
      setFormErrors({
        ...formErrors,
        [field]: '',
      });
      setFormFields({
        ...formFields,
        [field]: value,
      });
    };
  }

  function signIn() {
    if (checkValidation()) {
      setRequesting(true);
      setError('');
      const {email, password} = formFields;
      ProfileApi.authenticate({email, password})
        .then(res => {
          setRequesting(false);
          const items = [
            ['userToken', get(res, 'data.meta.token', null)],
            ['userEmail', get(res, 'data.email', '')],
            ['userId', get(res, 'data.id', '')],
          ];
          console.log({res});
          store.dispatch(setProfileInfo(get(res, 'data', {})));
          AsyncStorage.multiSet(items)
            .then(() => {
              signInApp(get(res, 'data.meta.token', null));
            })
            .catch(() => {
              setError('Something bad happened :(');
            });
        })
        .catch(e => {
          let errors = {};
          if (get(e, 'response.data.errors', null)) {
            keys(e.response.data.errors).forEach(error => {
              errors[error] = e.response.data.errors[error];
            });
            setFormErrors({
              ...formErrors,
              ...errors,
            });
          } else {
            setError('Wrong Email or Password');
          }
          setRequesting(false);
          console.log(e.response);
        });
    }
  }
  useEffect(() => {
    if (props.route.params) {
      setFormFields({...formFields, email: props.route.params.email});
    }
  }, [props.route.params]);
  function toggleSecurePassword() {
    setSecurePassword(!securePassword);
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
      <KeyboardAvoidingView
        removeClippedSubviews={false}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <Text style={styles.title}>SIGN IN</Text>

            <Input
              autoCapitalize="none"
              containerStyle={styles.textInput}
              inputStyle={{fontSize: 14, fontWeight: '400', color: 'white'}}
              placeholderTextColor="#B3B3B3"
              errorMessage={formErrors.email}
              leftIconContainerStyle={{
                marginRight: 24,
                marginLeft: 0,
              }}
              caretHidden
              placeholder="E-Mail"
              value={formFields.email}
              leftIcon={<EmailField />}
              onChangeText={setFormField('email')}
            />
            <Input
              autoCapitalize="none"
              containerStyle={styles.textInput}
              inputStyle={{fontSize: 14, fontWeight: '400', color: 'white'}}
              placeholderTextColor="#B3B3B3"
              leftIconContainerStyle={{
                marginRight: 24,
                marginLeft: 0,
              }}
              placeholder="Password"
              errorMessage={formErrors.password}
              value={formFields.password}
              leftIcon={<PasswordField />}
              rightIcon={
                <TouchableOpacity onPress={toggleSecurePassword}>
                  <Eye />
                </TouchableOpacity>
              }
              onChangeText={setFormField('password')}
              secureTextEntry={securePassword}
            />
            {error ? (
              <Text
                style={{
                  color: 'red',
                  textAlign: 'center',
                  fontSize: 12,
                  marginVertical: 8,
                }}>
                {error}
              </Text>
            ) : null}
            <GradientButton
              onPress={signIn}
              containerStyle={{height: 48}}
              textStyle={{fontWeight: '500', fontSize: 15}}
              disabled={requesting}
              requesting={requesting}
              text="SIGN IN"
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
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 8,
                marginTop: 16,
                justifyContent: 'center',
              }}>
              <Link routeName={ScreensNames.ForgotPassword}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                    textDecorationLine: 'underline',
                  }}>
                  Have Trouble Signing In?
                </Text>
              </Link>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  textInput: {
    marginBottom: 24,
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
export default SignInScreen;
