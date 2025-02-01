import { Alert, BackHandler, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { createContext, useContext, useState } from 'react'
import {RootTabParamList}from './Apps'
import {RootStackParanList}from '../App'
import {CommonActions, RouteProp, useFocusEffect, useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp, StackScreenProps} from '@react-navigation/stack'
import axios from 'axios';
import signup from './signup'
import { ipAddress } from './ipAddress'

// type HomeScreenRootProps=RouteProp<RootTabParamList,'HomeScreen'>;

// type HomeScreenNavigationProp = StackNavigationProp<RootStackParanList, 'tabBar'>;

// interface HomeScreenProps {route: HomeScreenRootProps}
// type tabScreenProps=StackScreenProps<RootStackParanList,'tabBar'>


const SharedDataContext = createContext(null);

    
export default function HomeScreen (){


  const navigation=useNavigation()

    const logOut = async () => 
      { 
        console.log('logout'); 
        await AsyncStorage.setItem('token', ''); 
        await AsyncStorage.setItem('isLoggedIn', ''); 
        navigation.navigate('LogIn');
        // navigation.reset({
        //     index: 0,
        //     routes: [{ name: 'LogIn' }],
        //   })
      };


      const handelBackPress=()=>{
        Alert.alert('Exit app','Are you sure you want to Exit',[{
          text:'Cancle',
          onPress:()=>null,
          style:'cancel'
        },
        {
          text:'Exit',
          onPress:()=>BackHandler.exitApp(),
        }])
        return true
      }

      useFocusEffect(
        React.useCallback(()=>{
          BackHandler.addEventListener('hardwareBackPress',handelBackPress);
          return ()=>{
            BackHandler.removeEventListener('hardwareBackPress',handelBackPress)
          }
        },[]),
      );

  const[userData,setUserData]=React.useState()
  // const { sharedData, setSharedData } = useContext(SharedDataContext);
  const [sharedData, setSharedData] = useState('Initial shared data');
 
  async function getData(){
   const token= await AsyncStorage.getItem("token");
   axios.post(`http://${ipAddress}:8005/getuser`,{'token':token})
   .then(res=>{
    console.log(res.data)
    // setSharedData(res.data)
    setUserData(res.data)
   })
  }

  React.useEffect(()=>{
    getData()
  },[])

  return (
    <View>
      {userData?<Text>{userData.STUDENTNAME}</Text>:''}
      <TouchableOpacity onPress={()=>logOut()}>
      <Text> Log Out</Text>
        
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})
