import { Tabs } from 'expo-router';
import React from 'react';

import { CustomHeader } from '@/components/CustomHeader';
import { CustomTabBar } from '@/components/CustomTabBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        header: () => <CustomHeader />,
        // @ts-ignore: unmountOnBlur exists in React Navigation but may be missing in Expo Router types
        unmountOnBlur: true,
      }}>
      <Tabs.Screen name="index" options={{ title: 'INÍCIO' }} />
      <Tabs.Screen name="connect" options={{ title: 'CONEXÃO' }} />
      <Tabs.Screen name="tasks" options={{ title: 'TAREFAS' }} />
      <Tabs.Screen name="places" options={{ title: 'LUGARES' }} />
      <Tabs.Screen name="gifts" options={{ title: 'MIMOS' }} />
      <Tabs.Screen name="more" options={{ title: 'PERFIL' }} />
    </Tabs>
  );
}
