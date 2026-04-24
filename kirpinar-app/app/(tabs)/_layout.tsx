import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { tokens } from '../../src/theme/tokens';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tokens.color.text,
        tabBarInactiveTintColor: 'rgba(245,230,200,0.55)',
        tabBarLabelStyle: { fontWeight: '700' },
        tabBarStyle: Platform.select({
          android: {
            height: 72,
            paddingBottom: 12,
            paddingTop: 10,
            backgroundColor: '#06150E',
            borderTopColor: tokens.color.border,
          },
          default: {
            backgroundColor: '#06150E',
            borderTopColor: tokens.color.border,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="pehlivanlar"
        options={{
          title: 'Pehlivanlar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="sampiyonlar"
        options={{
          title: 'Şampiyonlar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="rehber"
        options={{
          title: 'Rehber',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

