import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, IconButton } from '@/components';
import { ProfileScreen, SettingsScreen, SubscriptionsScreen } from '@/screens';
import { FeedStack } from './FeedStack';
import { useAuthStore } from '@/stores';

const Tab = createBottomTabNavigator();

export function BottomTab() {
  const userName = useAuthStore((state) => state.userName);
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarShowLabel: false,
        headerRightContainerStyle: {
          marginRight: 12,
        },
        headerLeft: () => (
          <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
        ),
        headerLeftContainerStyle: {
          marginRight: 12,
          marginLeft: 12,
        },
      })}
    >
      <Tab.Screen
        name="Feed"
        component={FeedStack}
        options={() => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} icon="home" size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Inbox"
        component={SecondScreen}
        options={{
          headerShadowVisible: false,
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} icon="chat-processing-outline" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Subs"
        component={SubscriptionsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} icon="format-list-bulleted-type" size={size} />
          ),
          title: 'Subscriptions',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ route }: any) => ({
          headerShadowVisible: false,
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} icon="account-circle-outline" size={size} />
          ),
          title: route.params.name,
        })}
        initialParams={{ name: userName }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} icon="cog" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function SecondScreen() {
  return null;
}
