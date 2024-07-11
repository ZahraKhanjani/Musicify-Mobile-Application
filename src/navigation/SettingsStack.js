import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsScreen from 'screens/Settings/SettingsScreen';
import ProfileScreen from 'screens/Profile/ProfileScreen';
import ChangePasswordScreen from 'screens/ChangePassword/ChangePasswordScreen';
import ChangeNameScreen from 'screens/ChangeName/ChangeNameScreen';
import ForgotPasswordScreen from 'screens/ForgotPassword/ForgotPasswordScreen';
import {ScreensNames} from './routeNames';

const Settings = createStackNavigator();

function SettingsStack() {
  return (
    <Settings.Navigator headerMode="none">
      <Settings.Screen
        name={ScreensNames.Settings}
        component={SettingsScreen}
      />
      <Settings.Screen name={ScreensNames.Profile} component={ProfileScreen} />
      <Settings.Screen
        name={ScreensNames.ChangePassword}
        component={ChangePasswordScreen}
      />
      <Settings.Screen
        name={ScreensNames.ChangeName}
        component={ChangeNameScreen}
      />
      <Settings.Screen
        name={ScreensNames.ForgotPassword}
        component={ForgotPasswordScreen}
      />
    </Settings.Navigator>
  );
}
export default SettingsStack;
