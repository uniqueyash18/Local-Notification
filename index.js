/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import notifee from '@notifee/react-native'
import { onNotification } from './src/redux/actions/auth';
notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;
    console.log(detail,'background')
    onNotification(detail?.notification?.data)
  });
AppRegistry.registerComponent(appName, () => App);
