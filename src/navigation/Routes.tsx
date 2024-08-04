import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import SendNotification from '../Screens/SendNotification';
interface PropTypes {}
const Routes: FC<PropTypes> = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SendNotification" component={SendNotification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
