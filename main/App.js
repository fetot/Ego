import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Loading,
  Login,
  Home,
  SignUp,
  Splash,
  MakeOffer,
  MyOffers,
  Profile,
  OfferDetail,
  SignUpInfo,
  SavedOffers
} from './views';
import auth from '@react-native-firebase/auth';
import { navigationRef } from './RootNavigation';

function HomeBottomTab(){
  const BottomTab = createMaterialBottomTabNavigator();

  return(
  <BottomTab.Navigator
    initialRouteName="Home"
    activeColor="#487db4"
  >
    <BottomTab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#f8faf9',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color="#487db4" size={26} />
        ),
      }}
    />
    <BottomTab.Screen
      name="Make Offer"
      component={MakeOffer}
      options={{
        tabBarLabel: 'Make Offer',
        tabBarColor: '#f8faf9',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-add-circle-outline" color="#487db4" size={26} />
        ),
      }}
    />
    <BottomTab.Screen
      name="My Offers"
      component={TopTabOffers}
      options={{
        tabBarLabel: 'My Offers',
        tabBarColor: '#f8faf9',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-list" color="#487db4" size={26} />
        ),
      }}
    />
    <BottomTab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: '#f8faf9',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color="#487db4" size={26} />
        )
      }}
    />
  </BottomTab.Navigator>
  );
}

const TopTab = createMaterialTopTabNavigator();

function TopTabOffers() {
  return (
    <TopTab.Navigator
    tabBarOptions={{
      activeTintColor: '#487db4',
      style: {
        backgroundColor: '#f8faf9'
      },
      indicatorStyle: {
        backgroundColor: '#487db4'
      }
    }}
    initialRouteName="My Offers"
    >
      <TopTab.Screen
        name='My Offers'
        component={MyOffers}
      />
      <TopTab.Screen
        name='Saved Offers'
        component={SavedOffers}
      />
    </TopTab.Navigator>
  );
}

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  })

  if (initializing) return <Loading />

  const Stack = createStackNavigator();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name='Home'
            component={HomeBottomTab}
            options={{
              title: 'ego',
              headerShown: true,
              headerTitleStyle: {
                color: '#487db4',
              },
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#f8faf9',
              },
              headerLeft: null
              
            }}
          />
        ) : (
          <Stack.Screen
            name='Splash'
            component={Splash}
            options={{
              title: '',
              headerShown: false
            }}
          />
        )}
        <Stack.Screen
            name='Login'
            component={Login}
            options={{
              title: 'Login',
              headerShown: false
            }}
          />
        <Stack.Screen
          name='SignUp'
          component={SignUp}
          options={{
            title: '',
            headerTransparent: true,
            headerTintColor: '#bbe1fa'
          }}
        />
        <Stack.Screen
          name='SignUpInfo'
          component={SignUpInfo}
          options={{
            title: '',
            headerShown: false,
            headerTintColor: '#bbe1fa'
          }}
        />
        <Stack.Screen
          name='OfferDetail'
          component={OfferDetail}
          options={{
            title: 'ego',
            headerShown: true,
            headerTintColor: '#487db4',
            headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#f8faf9',
              }
          }}
        />
        <Stack.Screen
          name='SavedOffers'
          component={SavedOffers}
          options={{
            title: '',
            headerTransparent: true,
            headerTintColor: '#bbe1fa'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
