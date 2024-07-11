import {Linking} from 'react-native';
import Url from 'url';
import get from 'lodash/get';
import remove from 'lodash/remove';
import drop from 'lodash/drop';
import {DeepLinks, ModalsNames, ScreensNames, StackNames} from './routeNames';
import NavigationService from './NavigationService';
export const handleUrl = url => {
  if (!url) {
    return;
  }
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      const parsedUrl = Url.parse(url);
      let paths = parsedUrl.path ? parsedUrl.path.split('/') : [];
      remove(paths, o => !o);

      let firstPath = parsedUrl.host;
      if (parsedUrl.host && parsedUrl.host.includes('.')) {
        firstPath = get(paths, '0', '');
        paths = drop(paths);
      }
      switch (firstPath) {
        case DeepLinks.Library:
          NavigationService.goTo(StackNames.Library);
          break;
        case DeepLinks.Home:
          NavigationService.goTo(StackNames.Home);
          break;
        case DeepLinks.Albums:
          NavigationService.goTo(ScreensNames.Album, {id: paths?.[0] || 0});
          break;
        case DeepLinks.Artists:
          NavigationService.goTo(ScreensNames.Artist, {id: paths?.[0] || 0});
          break;
        case DeepLinks.Playlists:
          NavigationService.goTo(ScreensNames.Playlist, {
            id: paths?.[0] || 0,
          });
          break;
        case DeepLinks.Profile:
          NavigationService.goTo(StackNames.Settings);
          NavigationService.goTo(ScreensNames.Profile);
          break;
        case DeepLinks.Settings:
          NavigationService.goTo(StackNames.Settings);
          break;
        case DeepLinks.Tracks:
          NavigationService.goTo(ModalsNames.Player, {id: paths?.[0] || 0});
          break;
        case DeepLinks.Pages:
          switch (paths?.[0] || '0') {
            case DeepLinks.Home:
              NavigationService.goTo(StackNames.Home);
              break;
            case DeepLinks.Playlists:
              NavigationService.goTo(StackNames.Playlists);
              break;
            case DeepLinks.Search:
              NavigationService.goTo(StackNames.Search);
              break;
            case DeepLinks.Library:
              NavigationService.goTo(StackNames.Library);
              break;
            default:
              NavigationService.goTo(StackNames.Home);
          }
          break;
        default:
          NavigationService.goTo(StackNames.Home);
      }
    }
  });
};
const handleDeepLink = () => {
  Linking.getInitialURL()
    .then(url => {
      handleUrl(url);
    })
    .catch(() => {});
};

export default handleDeepLink;
