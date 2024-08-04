import notifee, {
  AndroidImportance,
  AndroidVisibility,
  TimestampTrigger,
  TriggerType
} from '@notifee/react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { onNotification } from '../redux/actions/auth';
export const storage = new MMKV();
export async function requestUserPermission(
  callback: (error: boolean) => void = () => {},
): Promise<void> {
  try {
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
    }
    if (Platform.Version >= '33') {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Notification Permission',
          message: 'Allow this app to post notifications?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (
        permission !== null &&
        permission === PermissionsAndroid.RESULTS.GRANTED
      ) {
        return await getFcmToken();
      }
    } else {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        return await getFcmToken();
      }
    }
  } catch (error) {
    console.error(error);
    callback(true);
  }
}

const getFcmToken = async () => {
  const fcm_token = await getItem('fcm_token');
  if (!!fcm_token) {
    console.log(fcm_token, 'old fcm_token');
    return fcm_token;
  } else {
    const newFcmToken = await messaging().getToken();
    setItem('fcm_token', newFcmToken);
    console.log(newFcmToken, 'new fcm_token');
    return fcm_token;
  }
};

export const notificationListener = async (): Promise<void> => {
  const initialNotification = await notifee.getInitialNotification();
  onNotification(initialNotification?.notification?.data)
  console.log(initialNotification,'initialNotification')
};

export const setItem = (key: any, value: any) => {
  storage.set(key, JSON.stringify(value));
};

export const getItem = (key: any) => {
  const jsonData = storage.getString(key);
  if (jsonData) {
    try {
      const dataObject: any = JSON.parse(jsonData);
      return dataObject;
    } catch (error) {
      console.log('Error parsing user data:', error);
      return null;
    }
  } else {
    console.log('No data found for the key:', key);
    return null;
  }
};

export const scheduleNotification = async (
  date: Date,
  title: string,
  desc: string,
) => {
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP, 
    timestamp: +date, 
  };
  await notifee
    .createTriggerNotification(
      {
        title: title,
        body: desc,
        data:{
          title:title,
          description:desc
        },
        android: {
          channelId: 'default',
          importance: AndroidImportance.HIGH,
          visibility: AndroidVisibility.PUBLIC,
          sound: 'Default',
          vibrationPattern: [300, 500],
        },
      },
      trigger,
    )
    .then(res => {
      console.log(res, 'res');
    })
    .catch(err => {
      console.log(err, 'err');
    });
};
