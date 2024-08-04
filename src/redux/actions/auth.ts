import { setNotificationData } from '../reducers/auth';
import store from '../store';
const {dispatch} = store;

export const onNotification = (data: any) => {
  dispatch(setNotificationData(data));
};
