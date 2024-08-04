import React, {FC, useState} from 'react';
import {Alert, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {CustomTextInput} from '../Components/CustomTextInput';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {scheduleNotification} from '../utils/notificationService';
interface propTypes {}
const SendNotification: FC<propTypes> = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState(new Date());

  const SendLocalNotification = async () => {
    if(!title||!desc){
      Alert.alert('Data Error','Please enter title and description properly')
      return
    }
    scheduleNotification(date, title, desc)
      .then(res => {
        console.log(res, 'test');
        Alert.alert("Notification Scheduled Successfully")
        setTitle(''),
        setDate(new Date())
        setDesc('')
      })
      .catch(err => {
        console.log(err, 'test');
        Alert.alert("Error!! Please Try Again",err?.message)
      });
  };

  return (
    <View
      style={{flex: 1, padding: moderateScale(24), backgroundColor: 'white'}}>
        <ScrollView>
      <Text
        style={{
          textAlign: 'center',
          fontSize: scale(22),
          color: 'black',
          fontWeight: '600',
          marginBottom: moderateVerticalScale(12),
          borderBlockColor:'grey',
          borderBottomWidth:1,
          paddingBottom:moderateVerticalScale(12)
        }}>
        Send Your Local Notification
      </Text>
      <CustomTextInput
        label="Enter Title"
        placeholder='Enter Your Title here...'
        value={title}
        onChangeText={val => setTitle(val)}
      />
      <CustomTextInput
        label="Enter Description"
        placeholder='Enter Your Description here...'
        value={desc}
        onChangeText={val => setDesc(val)}
      />
      <TouchableOpacity
        style={{
          marginVertical: moderateVerticalScale(24),
          borderWidth: 1,
          borderColor: 'grey',
          padding: moderateScale(12),
          borderRadius:moderateScale(8)
        }}
        onPress={() => setOpen(true)}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: scale(16),
            color: 'black',
            fontWeight: '200',
          }}>
          Schedule for {date ? date.toString() : 'Select Date'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginVertical: moderateVerticalScale(24),
          borderWidth: 1,
          borderColor: 'grey',
          padding: moderateScale(12),
          backgroundColor: '#41A2E6',
          marginTop: 'auto',
          borderRadius:moderateScale(8)
        }}
        onPress={SendLocalNotification}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: scale(16),
            color: 'black',
            fontWeight: '600',
          }}>
          Send Notification
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      </ScrollView>
    </View>
  );
};

export default SendNotification;
