import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from 'screens/Auth/SignInScreen';
import SignUpScreen from 'screens/Auth/SignUpScreen';
import ForgotPasswordScreen from 'screens/ForgotPassword/ForgotPasswordScreen';
import {ScreensNames} from './routeNames';

const Auth = createStackNavigator();

function AuthStack() {
  return (
    <Auth.Navigator headerMode="none">
      <Auth.Screen name={ScreensNames.SignIn} component={SignInScreen} />
      <Auth.Screen name={ScreensNames.SignUp} component={SignUpScreen} />
      <Auth.Screen
        name={ScreensNames.ForgotPassword}
        component={ForgotPasswordScreen}
      />
    </Auth.Navigator>
  );
}
export default AuthStack;
