import NavigationService from './NavigationService';
import {ScreensNames, StackNames} from './routeNames';

export function goToStack(stackName) {
  NavigationService.navigate(stackName);
}
export function goToMain() {
  NavigationService.replace(StackNames.Main);
}

export function goToAuth() {
  NavigationService.replace(StackNames.Auth);
}

export function goToForceUpdate(updateLink) {
  NavigationService.navigate(ScreensNames.ForceUpdate, {
    updateLink,
  });
}
