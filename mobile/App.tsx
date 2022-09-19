import './src/services/notificationsConfig';

import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-modules-core';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

import { Background } from './src/components/Background';
import { Loading } from './src/screens/Loading';
import { Routes } from './src/routes';

import { getPushNotificationToken } from './src/services/getPushNotificationToken';
import { addNotificationResponseReceivedListener } from 'expo-notifications';

export default function App() {
  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  });

  useEffect(() => {
    getNotificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    responseNotificationListener.current =
      addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (
        getNotificationListener.current &&
        responseNotificationListener.current
      ) {
        Notifications.removeNotificationSubscription(
          getNotificationListener.current
        );
        Notifications.removeNotificationSubscription(
          responseNotificationListener.current
        );
      }
    };
  }, []);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  return (
    <Background>
      <StatusBar backgroundColor="transparent" style="light" />
      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
