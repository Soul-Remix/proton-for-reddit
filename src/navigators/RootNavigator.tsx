import React, { useMemo } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Text, View } from "react-native";
import { MainPageTopTabs } from "./MainPageTopTabs";
import { TabBarIcon } from "@/components";
import { TabNavigatorButtons } from "./Components/TabNavigatorButtons";
import { useThemeStore } from "@/stores/themeStore";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const RootNavigator = () => {
  const theme = useThemeStore((state) => state.colors);

  const myTheme = useMemo(() => {
    return {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: theme.primary,
        background: theme.background,
        card: theme.surface,
        text: theme.text,
        border: theme.surface,
      },
    };
  }, [theme]);

  return (
    <NavigationContainer theme={myTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={TabNav}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Comments" component={SecondScreen} />
        <Stack.Screen name="Sub" component={SecondScreen} />
        <Stack.Screen name="Search" component={SecondScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarShowLabel: false,
        headerRight: () => <TabNavigatorButtons navigation={navigation} />,
        headerRightContainerStyle: {
          marginRight: 12,
        },
      })}
    >
      <Tab.Screen
        name="Feed"
        component={MainPageTopTabs}
        options={{
          headerShadowVisible: false,
          title: "Proton",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon color={color} icon={"home"} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={SecondScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon
              color={color}
              icon={"chat-processing-outline"}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Subs"
        component={SecondScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon
              color={color}
              icon={"format-list-bulleted-type"}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SecondScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon
              color={color}
              icon={"account-circle-outline"}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SecondScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon color={color} icon={"cog"} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const SecondScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Second Screen</Text>
      <Button title="button" onPress={() => navigation.navigate("Search")} />
    </View>
  );
};