import { ActivityIndicator, Dimensions, StatusBar, StyleSheet, Text, View,Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer, NavigationIndependentTree, useNavigation } from '@react-navigation/native'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import LogIn from './components/LogIn';
import signup from './components/signup';
import register from './components/register';
import faculty from './components/faculty';
import admin from './components/admin';
import AsyncStorage from '@react-native-async-storage/async-storage'



import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from './components/Profile';
import Location from './components/Location';
import QR from './components/QR';
import Timings from './components/Timings';
import HomeScreen from './components/HomeScreen';
import ContactUs from './components/ProfileComponent/ContactUs';
import Password from './components/ProfileComponent/AccountComponents/Password';
import Delete from './components/ProfileComponent/AccountComponents/Delete';
import AccountSettingsScreen from './components/ProfileComponent/AccountSettings';
import Address from './components/ProfileComponent/Address';
import BusDetails from './components/ProfileComponent/BusDetails';
import AboutUs from './components/ProfileComponent/AboutUs';
import LogOut from './components/ProfileComponent/LogOut';
import EditProfile from './components/ProfileComponent/EditProfile';
import { ipAddress } from './components/ipAddress';
import axios from 'axios';

const { width } = Dimensions.get('window');
const iconSize = width * 0.07;

const Stack = createStackNavigator()






const Tab = createBottomTabNavigator();
function tabBar(){
  
// useEffect(()=>{
//   GetData()

// }
//   ,[])
  
  
  // async function GetData(){
  //   const token= await AsyncStorage.getItem("token");
  //   axios.post(`http://${ipAddress}:8005/getuser`,{'token':token})
  //   .then(res=>{
  //    console.log(res.data)
  //    console.log('hjey')
  //   })
  //  }



  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon:
      ({ focused, color, size }) => {
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
            return <Icon name={iconName} size={iconSize} color={focused ? 'white' : '#E39424'} />

          },
          tabBarActiveBackgroundColor: '#E39424',
          tabBarItemStyle: {
            // marginBottom:'3%',
            marginHorizontal: '2.9%',
            marginVertical: '1.5%',
            borderRadius: '50%',
            zIndex: 1
        },
        tabBarIconStyle: {
          borderRadius: '50%',
          flex: 1
        },
        tabBarStyle: {
          // flex:1,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
          height:'7.5%',
          width: '90%',
          // backgroundColor: 'transparent',
          marginBottom: '3%',
          marginHorizontal: 'auto',
          borderTopWidth: 0,
          borderRadius: 10,
          shadowOpacity: 0.5,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 10 },
          elevation: 5,
        },
        headerShown: false,
        tabBarShowLabel: false,
        backgroundColor: 'transparent',
        // headerTransparent:true,
        
      }
      )}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen}  
      // {(props: React.JSX.IntrinsicAttributes)=><HomeScreen {...props} logOut={logOut}/>}
      />
      <Tab.Screen name="Timings" component={Timings} />
      <Tab.Screen name="Location" component={Location} />
      <Tab.Screen name="QR" component={QR} />
      <Tab.Screen name="Profile" component={Profile} />
     
    </Tab.Navigator>
  );
}


export default function App() {
  const [isLoggedin, setIsLoggedIn] = useState(false)
  const [user,setUser]=useState();

  // const [userData, setUserData] = React.useState()
  const [loading, setLoading] = useState(true)
  async function getData() {
    const token = await AsyncStorage.getItem("token");
    const data = await AsyncStorage.getItem('isLoggedIn');
    console.log(data)
    if (data=== "true") {
      setIsLoggedIn(true);
    }
    else {
      setIsLoggedIn(false);
    }

  }


  async function getUser(){
    const token= await AsyncStorage.getItem("token");
    axios.post(`http://${ipAddress}:8005/getuser`,{'token':token})
    .then(res=>{
    //  console.log(res.data)
    //  console.log('hjey')
    setUser(res.data)
    console.log(user)
  })
   }



  useEffect(() => {
    getUser()
    getData()
    setTimeout(() => { setLoading(false); }, 500)
  }, [])

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'This will open the Change Password screen');
  };
  
  // Handle delete account logic
  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => Alert.alert('Account Deleted', 'Your account has been deleted.') },
      ]
    );
  };



  

  
  //tab Bar navigation


  return (
    <NavigationIndependentTree>
      <StatusBar backgroundColor={'#f1f2f6'} barStyle={'dark-content'} ></StatusBar>
      <NavigationContainer>
      {loading ? ( <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><ActivityIndicator size="large" color="#E39424" /></View> ) :
        <Stack.Navigator initialRouteName={isLoggedin?'tabBar':'LogIn'} screenOptions={{ headerShown: false }}>
    <Stack.Screen name='LogIn' component={LogIn}></Stack.Screen>
    <Stack.Screen name='register' component={register}></Stack.Screen>
    <Stack.Screen name='admin' component={admin}></Stack.Screen>
    <Stack.Screen name='faculty' component={faculty}></Stack.Screen>
    <Stack.Screen name='signup' component={signup}></Stack.Screen>
    <Stack.Screen name='tabBar' component={tabBar}></Stack.Screen>


    <Stack.Screen name="Profile" component={Profile} initialParams={{user}}/>
      <Stack.Screen name="EditProfile" component={EditProfile} options={{headerStyle:{backgroundColor:'#ffeaa7',elevation: 0,},headerShown:true}} />
      <Stack.Screen name="Address" component={Address}  options={{headerTitle:'Saved Address',headerShown:true,headerStyle:{backgroundColor:'#ffeaa7'}}}/>
      <Stack.Screen name="BusDetails" component={BusDetails} options={{headerStyle:{backgroundColor:'#ffeaa7'},headerShown:true}} />
      {/* <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} options={{headerStyle:{backgroundColor:'#f1f2f6'}}} /> */}
      <Stack.Screen name="ContactUs" component={ContactUs} options={{headerStyle:{backgroundColor:'#ffeaa7',elevation: 0,},headerShown:true}}/>
      <Stack.Screen name="AboutUs" component={AboutUs} options={{headerStyle:{backgroundColor:'#f1f2f6'},headerShown:true}}/>
      <Stack.Screen name="LogOut" component={LogOut}  options={{headerStyle:{backgroundColor:'#f1f2f6'},headerShown:true}}/>
    
    <Stack.Screen
      name="AccountSettings"
      component={AccountSettingsScreen}
      options={{headerShown:true,headerStyle:{backgroundColor:'#ffeaa7'}}}
    />
    <Stack.Screen
      name="ChangePassword"
      component={Password}
      options={{ title: 'Change Password',headerShown:true }}
    />
    <Stack.Screen
      name="DeleteAccount"
      component={Delete}
      options={{ title: 'Delete Account',headerShown:true }}
    />

    {/* <Stack.Screen name='HomeScreen' component={HomeScreen}></Stack.Screen> */}
  </Stack.Navigator>
      }
      </NavigationContainer>
    </NavigationIndependentTree>
  )
}

const styles = StyleSheet.create({})