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
import keys from 'lodash/keys';
import {ProfileApi} from 'api/index';
import get from 'lodash/get';
import PasswordField from 'icons/PasswordField';
import Eye from 'icons/Eye';
import BackIcon from 'icons/BackIcon';
import {useSafeArea} from 'react-native-safe-area-context';

import {GradientButton, Input} from 'components/index';

function ChangePasswordScreen(props) {
  const insets = useSafeArea();
  const [securePassword, setSecurePassword] = useState({
    oldPassword: true,
    newPassword: true,
    repeatedNewPassword: true,
  });
  const [requesting, setRequesting] = useState(false);
  const [error, setError] = useState('');
  const [formFields, setFormFields] = useState({
    oldPassword: '',
    newPassword: '',
    repeatedNewPassword: '',
  });
  const [formErrors, setFormErrors] = useState({
    oldPassword: '',
    newPassword: '',
    repeatedNewPassword: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const errorField = {
    new_password: 'newPassword',
    old_password: 'oldPassword',
  };
  function secureInputField(type, placeholder) {
    return (
      <Input
        autoCapitalize="none"
        containerStyle={styles.textInput}
        inputStyle={{fontSize: 14, fontWeight: '400', color: 'white'}}
        placeholderTextColor="#B3B3B3"
        leftIconContainerStyle={{
          marginRight: 24,
          marginLeft: 0,
        }}
        placeholder={placeholder}
        errorMessage={formErrors[type]}
        value={formFields[type]}
        leftIcon={<PasswordField />}
        rightIcon={
          <TouchableOpacity onPress={toggleSecurePassword(type)}>
            <Eye />
          </TouchableOpacity>
        }
        onChangeText={setFormField(type)}
        secureTextEntry={securePassword[type]}
      />
    );
  }

  function checkValidation() {
    let isValid = true;
    let errors = {};
    keys(formFields).forEach(field => {
      if (!formFields[field]) {
        errors[field] = 'This field cannot be empty!';
        isValid = false;
      } else if (
        field === 'repeatedNewPassword' &&
        formFields[field] !== formFields.newPassword
      ) {
        errors[field] = 'The repeated password is not correct!';
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

  function resetForm() {
    setFormFields({
      oldPassword: '',
      newPassword: '',
      repeatedNewPassword: '',
    });
    setSecurePassword({
      oldPassword: true,
      newPassword: true,
      repeatedNewPassword: true,
    });
  }

  function changePassword() {
    if (checkValidation()) {
      setRequesting(true);
      setError('');
      const {oldPassword, newPassword} = formFields;
      ProfileApi.changePassword({oldPassword, newPassword})
        .then(res => {
          setRequesting(false);
          resetForm();
          setSuccessMessage('Successfully Changed Password!');
        })
        .catch(e => {
          console.log({e});
          let errors = {};
          if (get(e, 'response.data.errors', null)) {
            keys(e.response.data.errors).forEach(error => {
              errors[errorField[error]] = e.response.data.errors[error];
            });
            setFormErrors({
              ...formErrors,
              ...errors,
            });
          } else {
            setError('Wrong Password');
          }
          setRequesting(false);
          console.log(e.response);
        });
    }
  }
  function toggleSecurePassword(field) {
    return function() {
      setSecurePassword({
        ...securePassword,
        [field]: !securePassword[field],
      });
    };
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
            <Text style={styles.title}>Change Password</Text>
            <Text style={styles.subtitle}>
              If you can't remember the old password, change it from the forgot
              password page.
            </Text>
            {secureInputField('oldPassword', 'Old Password')}
            {secureInputField('newPassword', 'New Password')}
            {secureInputField('repeatedNewPassword', 'Confirm New Password')}
            {error ? (
              <Text style={{color: 'red', fontSize: 12, marginVertical: 8}}>
                {error}
              </Text>
            ) : null}

            <GradientButton
              onPress={changePassword}
              containerStyle={{height: 48}}
              textStyle={{fontWeight: '500', fontSize: 15}}
              disabled={requesting}
              requesting={requesting}
              text="Change Password"
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
    marginBottom: 42,
  },
  subtitle: {
    fontSize: 18,
    color: '#B3B3B3',
    marginBottom: 32,
    lineHeight: 25,
  },
});
export default ChangePasswordScreen;
