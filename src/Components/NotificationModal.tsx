import { View, Text, Modal, Image, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { useSelector } from 'react-redux';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import { onNotification } from '../redux/actions/auth';
interface props{

}
const NotificationModal:FC<props> = () => {
  const notificationData = useSelector((state:any) => state?.auth?.notificationData);
  return (
    <Modal transparent visible={!!notificationData?.title}>
        <View style={{flex:1,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
          <Image style={{height:moderateVerticalScale(200),width:moderateScale(150),resizeMode:'contain'}} source={require('../assets/reminder.png')}/>
            <Text style={{fontSize:scale(24),fontWeight:'600'}}>
              {notificationData?.title}
            </Text>
            <Text>
              {notificationData?.description}
            </Text>
            <TouchableOpacity
        style={{
          marginVertical: moderateVerticalScale(24),
          borderWidth: 1,
          borderColor: 'grey',
          padding: moderateScale(12),
          backgroundColor: '#41A2E6',
          borderRadius:moderateScale(8)
        }}
        onPress={()=>onNotification(null)}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: scale(16),
            color: 'black',
            fontWeight: '600',
            width:moderateScale(200)
          }}>
          Done
        </Text>
      </TouchableOpacity>

        </View>
    </Modal>
  )
}

export default NotificationModal