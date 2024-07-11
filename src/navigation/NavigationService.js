import React from 'react';
import {StackActions} from '@react-navigation/routers/lib/commonjs/index.js';
export const navigationRef = React.createRef();

function navigate(routeName: string, params: ?Object) {
  if (navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(routeName, params);
  }
}

function goTo(routeName: string, params: ?Object) {
  if (navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(routeName, params);
  }
}

function reset(routes: Array<Object>) {
  if (navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.reset({routes});
  }
}
function popToTop() {
  if (navigationRef.current) {
    navigationRef.current.dispatch(StackActions.popToTop());
  }
}
function push(routeName: string, params: ?Object) {
  if (navigationRef.current) {
    navigationRef.current.dispatch(StackActions.push(routeName, params));
  }
}
function replace(routeName: string, params: ?Object) {
  if (navigationRef.current) {
    navigationRef.current.dispatch(StackActions.replace(routeName, params));
  }
}

export default {
  navigate,
  goTo,
  reset,
  popToTop,
  push,
  replace,
};
