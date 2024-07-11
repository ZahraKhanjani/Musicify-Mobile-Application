import React, {useState} from 'react';
import keys from 'lodash/keys';
import get from 'lodash/get';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import authBg from 'assets/authBg.png';
import {ProfileApi} from 'api/index';
import EmailField from 'icons/EmailField';
import NameField from 'icons/NameField';
import PasswordField from 'icons/PasswordField';
import Eye from 'icons/Eye';
import {ScreensNames} from 'navigation/routeNames';
import Link from 'navigation/Link';
import {GradientButton, Input} from 'components/index';

function SignUpScreen({navigation}) {
  const [requesting, setRequesting] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);
  const [error, setError] = useState('');
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    name: '',
  });

  function checkValidation() {
    let isValid = true;
    let errors = {};
    keys(formFields).forEach(field => {
      if (!formFields[field]) {
        errors[field] = 'This field cannot be empty!';
        isValid = false;
      } else if (field === 'email') {
        const emailValidationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailValidationRegex.test(formFields[field])) {
          errors[field] = 'The entered email is not valid!';
          isValid = false;
        }
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
  function signUp() {
    if (checkValidation()) {
      setRequesting(true);
      const {name, email, password} = formFields;
      ProfileApi.register({name, email, password})
        .then(() => {
          setRequesting(false);
          navigation.navigate(ScreensNames.SignIn, {email});
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
            setError('Something went wrong, please try again');
          }
          setRequesting(false);
          console.log(e.response);
        });
    }
  }

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
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={styles.title}>SIGN UP</Text>
            <Input
              autoCapitalize="none"
              containerStyle={styles.textInput}
              inputStyle={{fontSize: 14, fontWeight: '400', color: 'white'}}
              placeholderTextColor="#B3B3B3"
              leftIconContainerStyle={{
                marginRight: 24,
                marginLeft: 0,
              }}
              errorMessage={formErrors.name}
              placeholder="Name"
              value={formFields.name}
              leftIcon={<NameField />}
              onChangeText={setFormField('name')}
            />
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
              placeholder="E-Mail"
              caretHidden
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
              onPress={signUp}
              containerStyle={{height: 48}}
              textStyle={{fontWeight: '500', fontSize: 15}}
              disabled={requesting}
              requesting={requesting}
              text="SIGN UP"
            />
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 8,
                marginTop: 38,
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 14}}>
                Do you have an account?
              </Text>
              <Link routeName={ScreensNames.SignIn}>
                <Text
                  style={{
                    color: '#FF3636',
                    fontWeight: 'bold',
                    marginLeft: 4,
                    fontSize: 14,
                  }}>
                  Sign In
                </Text>
              </Link>
            </View>
          </View>
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
export default SignUpScreen;
