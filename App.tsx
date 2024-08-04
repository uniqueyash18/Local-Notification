/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  View
} from 'react-native';
import { Provider } from 'react-redux';
import NotificationModal from './src/Components/NotificationModal';
import Routes from './src/navigation/Routes';
import store from './src/redux/store';
import { notificationListener, requestUserPermission } from './src/utils/notificationService';
import notifee, { EventType } from '@notifee/react-native'
import { onNotification } from './src/redux/actions/auth';

function App(): React.JSX.Element {

  useEffect(()=>{
    (async()=>{
      await requestUserPermission()
      await notificationListener();
    })()
  })
  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          onNotification(detail?.notification?.data)
          break;
      }
    });
  }, []);
  return (
    <Provider store={store}>
    <View style={{flex:1}}>
      <NotificationModal/>
      <Routes/>
    </View>
    </Provider>
  );
}


export default App;
