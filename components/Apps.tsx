import * as React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from './Profile';
import Location from './Location';
import QR from './QR';
import Timings from './Timings';
import HomeScreen from './HomeScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';






// Define the parameter list for each screen
export type RootTabParamList = {
  HomeScreen:undefined;
  Profile: undefined;
  Location: undefined;
  QR: undefined;
  Timings: undefined
};

type iconNames = {
  iconNames: String
};
const Tab = createBottomTabNavigator();


const Apps:React.FC=()=>{

  const[userData,setUserData]=React.useState()
 
async function getData(){
 const token= await AsyncStorage.getItem("token");
 console.log(token)
 axios.post('http://192.168.202.237:8005/getuser',{'token':token})
 .then(res=>{
  console.log(res.data)
  setUserData(res.data)
  // console.log(typeof userData);

 })
}


React.useEffect(()=>{
  getData()
},[])

const user =userData;

  return (
    <NavigationIndependentTree>
      <NavigationContainer >
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon:
              ({focused,color,size}) => {
                let iconName;
                switch (route.name) {
                  case 'HomeScreen':
                    iconName = 'home'
                    break;
                  case 'Timings':
                    iconName = 'bus-stop'
                    break;
                  case 'Location':
                    iconName = 'map-marker-radius'
                    break;
                  case 'QR':
                    iconName = 'qrcode'
                    break;
                  case 'Profile':
                    iconName = 'account-circle'
                    break;

                  default: iconName = 'default'
                    break;
                }
                return <Icon name={iconName} size={28} color={focused ? 'white':'#E39424'} />
                
              },
              tabBarActiveBackgroundColor:'#E39424',
              tabBarItemStyle: {
                // marginBottom:'3%',
                marginHorizontal: '2.9%',
                marginVertical: '1.5%',
                borderRadius:'50%',
                zIndex:1
              },
              tabBarIconStyle:{
                borderRadius:'50%',
                flex:1
              },
              tabBarStyle: {
                // flex:1,
                justifyContent:'center',
                alignItems: 'center',
                zIndex:1,
                height: '7%',
                width: '90%',
                backgroundColor: 'white',
                marginBottom: '2%',
                marginHorizontal:'auto',
                borderTopWidth:0,
                borderRadius:10,
                shadowOpacity: 0.5,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 10 },
                elevation: 5,
              },
            headerShown: false,
            tabBarShowLabel: false,

          }
          )}
        >
          <Tab.Screen name="HomeScreen" component={HomeScreen} />
          <Tab.Screen name="Timings" component={Timings} />
          <Tab.Screen name="Location" component={Location} />
          <Tab.Screen name="QR" component={QR} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
      </NavigationIndependentTree>
  );
};

export default Apps;
