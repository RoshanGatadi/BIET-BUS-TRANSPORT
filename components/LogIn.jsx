import { BackHandler,Alert, Image, ImageBackground, Linking, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import RNPickerSelect from 'react-native-picker-select';
import { NavigationProp ,useFocusEffect} from '@react-navigation/native'
import { RootStackParanList } from '../App'
import Icon from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios';
import AsyncStroage from '@react-native-async-storage/async-storage'
import { ipAddress } from './ipAddress';


const img = require('../assets/staticPictures/biet.png')
// export type LogInProps=StackScreenProps<RootStackParanList,'LogIn'>
// type LogInScreenProps = {
//   navigation: NavigationProp<RootStackParanList, 'LogIn'>
// }

export default function LogIn( {navigation} ){
  const [selectedValue, setSelectedValue] = useState('');
  const [verifyStudent, setVerifyStudent] = useState(false);
  const [verifyAdmin, setVerifyAdmin] = useState(true);
  const [verifyfaculty, setVerifyfaculty] = useState(false);
  const [hallticketNo, setHallticketNo] = useState('');
  const [verifyHall, setVerifyHall] = useState(false);
  const [verifyUser, setVerifyUser] = useState(true);
  const [verifiedUser, setVerifiedUser] = useState(true);
  const [feildVerify, setFeildVerify] = useState(true)
  const [Password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  function handleType(value) {
    setFeildVerify(true)
    if (value === "ADMIN") {
      setVerifyAdmin(true);
      setVerifyStudent(false);
      setVerifyfaculty(false);
    } else if (value === "STUDENT") {
      setVerifyAdmin(false);
      setVerifyStudent(true);
      setVerifyfaculty(false);

    } else if (value === "FACULTY") {
      setVerifyAdmin(false);
      setVerifyStudent(false);
      setVerifyfaculty(true);

    }
  }

  function onSubmition() {
    const userdata = {
      type: selectedValue,
      hallTicketNo: hallticketNo,
      Password,
    }
    if (!selectedValue || !hallticketNo || !Password) {
      setFeildVerify(false)
    }
    else {
      console.log("hey")
      axios.post(`http://${ipAddress}:8005/signin`, userdata)
        .then(res => {
          console.log(res.data)
          if (res.data=== 'Incorrect Password or Email Id') {
            console.log(res.data)
            setVerifyUser(false);
            setVerifiedUser(true)
          } else if (res.data.data=== 'you Logged in Successfully') {
            AsyncStroage.setItem("token",res.data.token);
            AsyncStroage.setItem('isLoggedIn',JSON.stringify(true));
            navigation.replace('tabBar')
            setVerifiedUser(false)
            setVerifyUser(true)
          }
        })
        .catch(e => {
          if (e.response) { // The server responded with a status code 
            console.error('Server responded with status code:', e.response.status);
          }
          else if (e.request) {
            // The request was made but no response was received 
            console.error('No response received:', e.request);
          }
          else { // Something happened while setting up the request 
            console.error('Error:', e.message);
          }
        })
    }
  }



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


  function handelHallticket(e) {
    const varhall = e.nativeEvent.text;
    setHallticketNo(varhall);
    setVerifyUser(true)
    setVerifyHall(false)
    setFeildVerify(true)
    const hallRegex = /^\d{2}[A-Z]\d{2}A\d{2}[A-Z0-9][A-Za-z0-9]$/;
    if (hallRegex.test(varhall)) {
      setVerifyHall(true)
    }

  }

  function handelPassword(e) {
    setFeildVerify(true)
    const varpassword = e.nativeEvent.text;
    setPassword(varpassword);
  }

  return (
    <ImageBackground source={{ uri: 'https://biet.ac.in/images/inner/Infrastructure9.jpg' }} style={styles.background} >
      <View style={styles.container}>
        <View style={styles.center}>
          <Image source={img} style={styles.img}></Image>
          <Text style={[styles.suggestion, { fontSize: 18 }]}>BIET BUS TRANSPORT</Text>
        </View>
        <View style={styles.center}>
          <Text style={styles.heading}>LOG-IN</Text>
          <Text style={styles.suggestion}>Please Enter Your LogIn Details !</Text>
        </View>
        <View style={styles.picker}>
          {/* <Text style={styles.label}>SELECT TYPE:
        </Text> */}
          {verifyUser ? "" : <Text style={[styles.err, { fontSize: 18, textAlign: 'center' }]}>Incorrect Password or Id </Text>}
          {verifiedUser ? "" : <Text style={[styles.err, { fontSize: 18, textAlign: 'center', color: "green" }]}>You Logged in Successfully ..!! </Text>}
          {feildVerify ? "" : <Text style={[styles.err, { fontSize: 18, textAlign: 'center' }]}>Please Fill all The Required fields! </Text>}
          <RNPickerSelect onValueChange={(value) => {
            handleType(value);
            setSelectedValue(value)
          }
          }
            items={[{ label: 'ADMIN', value: 'ADMIN' },
            { label: 'STUDENT', value: 'STUDENT' },
            { label: 'FACULTY', value: 'FACULTY' },]}
            placeholder={{ label: 'SELECT TYPE', value: null, color: '#9EA0A4', letterSpacing: 2 }}
            style={pickerSelectStyles}

          />
          {/* <Text style={styles.selectedValue}>Selected Value: {selectedValue}
        </Text> */}
        </View>
        <View style={styles.center}>
          {hallticketNo.length < 1 ? '' : verifyHall ? "" : <Text style={styles.err}>Invalid
            {verifyAdmin ? <Text> Admin Id </Text> : ''}
            {verifyStudent ? <Text> Hall Ticket No </Text> : ''}
            {verifyfaculty ? <Text> Employe Id </Text> : ''}
            Format !!</Text>}
          <View style={styles.backGround}>
            {verifyAdmin ? <Text style={styles.lable}>ADMINID</Text> : ''}
            {verifyStudent ? <Text style={styles.lable}>HALLTICKETNO</Text> : ''}
            {verifyfaculty ? <Text style={styles.lable}>EMPLOYEEID</Text> : ''}

          </View>
          <TextInput style={styles.inputBox} placeholder={selectedValue.toLocaleLowerCase() + "Id"} value={hallticketNo} onChange={e => handelHallticket(e)} ></TextInput>

        </View>
        <View style={styles.center}>
          <View style={styles.backGround}>
            <Text style={styles.lable}>PASSWORD</Text>
          </View>
          <TextInput style={styles.inputBox} placeholder='Password' secureTextEntry={!isPasswordVisible} value={Password} onChange={e => handelPassword(e)} ></TextInput>
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.Icon} > <Icon name={isPasswordVisible ? 'visibility' : 'visibility-off'} size={20} color="grey" /> </TouchableOpacity>
        </View>
        <View >
          <Text style={styles.Fonts}>
            Forgot Password?
          </Text>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={() => onSubmition()}>
            <Text style={styles.buttonText}>LOGIN
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[styles.Fonts, styles.lastOne]}>Don't have an account?
            <TouchableOpacity onPress={() => navigation.navigate('register')}
              style={styles.touchOp}
            >
              <Text style={styles.signup}>Sign Up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    zIndex: 1,
    opacity: 0.9,
    height: '100%',
    width: '100%'
  },
  heading: {
    fontFamily: 'Parkinsans-Bold',
    fontSize: 30,
    fontWeight: '700',
    color: '#E39424',
    letterSpacing: 3,
    marginBottom: 20,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    opacity: 1,
    zIndex: 1
  },
  inputBox: {
    width: '100%', height: 45, borderColor: '#E39424', borderWidth: 1.5, marginBottom: 20, paddingLeft: 8,
    paddingTop: 5,
    borderRadius: 6,
    letterSpacing: 3,
    paddingInlineStart: '5%',
  },
  lable: {
    fontSize: 14,
    letterSpacing: 2,
    position: 'absolute',
    top: -9,
    paddingHorizontal: '2%',
    display: 'flex',
    left: '4%',
    color: '#E39424',
    borderColor: 'transparent',
    borderWidth: 1,
    backgroundColor: 'white',
    marginVertical: 0,
    paddingVertical: 0,
    fontWeight: '600',
    borderRadius: 5,

  },
  button: {
    backgroundColor: '#E39424', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5,
    width: '80%'
  },
  buttonText: {
    color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center',
    letterSpacing: 2
  },
  label: { fontSize: 18, marginBottom: 1, },
  selectedValue: { marginTop: 20, fontSize: 16, },
  picker: {
    width: '80%',
    borderColor: '#E39424',

  },
  backGround: {
    // backgroundColor:'white',
    zIndex: 1,
    marginVertical: 0,
    paddingVertical: 0,
    height: 3
  },
  suggestion: {
    fontSize: 16,
    letterSpacing: 2,
    color: 'gray',
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center'

  },
  Fonts: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 2,
    marginVertical: 20,
    color: 'gray',
    width: '80%'
  },
  signup: {
    color: '#E39424',
    letterSpacing: 2,
    fontSize: 16,
    fontWeight: '500'
  },
  lastOne: {
    marginTop: 30,
  },
  center: {
    // flex:1,
    // flexDirection:'row'
    width: '80%'
  },
  touchOp: {
    marginTop: '3%',
    // display: 'flex',
    // overflow:'visible'
  },
  img: {
    margin: 'auto',
    width: 90,
    height: 90
  },
  err: {
    color: "red",
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: '3%',
    letterSpacing: 2

  },
  Icon: {
    position: 'absolute',
    right: '5%',
    top: '20%'
  }
})


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16, paddingVertical: 12, paddingHorizontal: 1, borderWidth: 1, borderColor: '#E39424', borderRadius: 4, color: '#E39424', paddingRight: 1, width: '100%',
    letterSpacing: 2,
    fontWeight: '500',
  },
  inputAndroid: {
    fontSize: 16,
    letterSpacing: 2,
    fontWeight: '500',
    paddingHorizontal: 1, paddingVertical: 8, borderWidth: 5, borderColor: '#E39424', borderRadius: 8, color: '#E39424', paddingRight: 1, width: '100%',

  },
})