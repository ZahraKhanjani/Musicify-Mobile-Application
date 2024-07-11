import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import analytics from '@react-native-firebase/analytics';
import {navigationRef} from './NavigationService';
import {Text} from 'components/index';
import SplashScreen from 'screens/Splash/SplashScreen';
import AuthStack from './AuthStack';
import ForceUpdateScreen from 'screens/ForceUpdate/ForceUpdateScreen';
import {NavigationContainer} from '@react-navigation/native';
import {Linking} from 'react-native';
import {AuthContext} from '../App';
import SettingsStack from './SettingsStack';
import MainStack from './MainStack';
import {ScreensNames, StackNames} from './routeNames';
import {handleUrl} from './handleDeepLink';

const Root = createStackNavigator();

// Gets the current screen from navigation state
const getActiveRouteName = ({routes, index}) => {
  const {state, name} = routes[index];

  if (state) {
    // Dive into nested navigators
    return getActiveRouteName(state);
  }

  return name;
};

function RootStack({authContext}) {
  Linking.addEventListener('url', event => {
    handleUrl(event.url);
  });
  const routeNameRef = React.useRef();
  function forFade({current}) {
    return {
      cardStyle: {
        opacity: current.progress,
      },
    };
  }
  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={state => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = getActiveRouteName(state);

        if (previousRouteName !== currentRouteName) {
          analytics().setCurrentScreen(currentRouteName, currentRouteName);
        }
      }}
      fallback={<Text>Loading...</Text>}>
      <AuthContext.Provider value={authContext}>
        <Root.Navigator>
          <Root.Screen
            options={{headerShown: false, gestureEnabled: false}}
            name={ScreensNames.Splash}
            component={SplashScreen}
          />
          <Root.Screen
            options={{
              headerShown: false,
              cardStyleInterpolator: forFade,
              gestureEnabled: false,
            }}
            name={StackNames.Main}
            component={MainStack}
          />
          <Root.Screen
            options={{
              headerShown: false,
              cardStyleInterpolator: forFade,
              gestureEnabled: false,
            }}
            name={StackNames.Auth}
            component={AuthStack}
          />
          <Root.Screen
            options={{headerShown: false}}
            name={StackNames.Settings}
            component={SettingsStack}
          />
          <Root.Screen
            options={{
              headerShown: false,
              cardStyleInterpolator: forFade,
              gestureEnabled: false,
            }}
            name={ScreensNames.ForceUpdate}
            component={ForceUpdateScreen}
          />
        </Root.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
export default RootStack;
