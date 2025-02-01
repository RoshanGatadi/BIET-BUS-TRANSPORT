import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View,StatusBar} from 'react-native'
import React, { createContext, useContext, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FAIcon from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios';
import { ipAddress } from './ipAddress';



const img = require('../assets/staticPictures/biet.png')
const { width ,height } = Dimensions.get('window');
const qrSize =width*0.5


export default function QR() {

  const [userData, setUserData] = React.useState(null)
  const [loading, setLoading] = useState(true)

  async function getData() {
    const token = await AsyncStorage.getItem("token");
    console.log(token)
    axios.post(`http://${ipAddress}:8005/getuser`, { 'token': token })
      .then(res => {
        // console.log(res.data)
        setUserData(res.data)
      })
  }

  React.useEffect(() => {
    getData();
    // console.log(userData)
    setTimeout(() => { setLoading(false); }, 300)
  }, [])

  let user;
  let qrValue

  if (userData != null) {
    user = {
      Id: userData.HALLTICKETNO,
      Name: userData.STUDENTNAME,
      Gender: userData.GENDER,
      AcadamicYear: userData.ACADAMICYEAR,
      Department: userData.DEPARTMENT,
      Section: userData.SECTION,
      Email: userData.EMAIL,
      BusNo: 22
    }
    if (userData.STATUS === 'PAID') {
      qrValue = JSON.stringify(user);
    }
    console.log(userData.STATUS)
  }




  return (
    <><StatusBar backgroundColor={'#f1f2f6'} barStyle={'dark-content'}></StatusBar><View style={styles.container}>
      {loading ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', zIndex: 1 }}><ActivityIndicator size="large" color="#E39424" /></View>) : (


        <View style={styles.innerContainer}>
          <View style={styles.logo}>
            <Image source={img} style={styles.img}></Image>
            <Text style={[styles.suggestion, { fontSize: 18, marginBottom: '0%' }]}>BIET BUS TRANSPORT</Text>
          </View>
          {qrValue ?
            (<><View>
              <Text style={styles.routeNo}>ROUTE NO : <Text style={{ fontWeight: 'bold' }}> {userData.BUSNO}</Text> </Text>
            </View><View>
                <View style={styles.upperSection}>
                  <View style={styles.label}>
                    <Text style={styles.text}>Hall Ticket No :<Text style={styles.textRender}> {userData.HALLTICKETNO}</Text></Text>
                    <Text style={styles.text}>Name : <Text style={styles.textRender}> {userData.STUDENTNAME}</Text> </Text>
                  </View>
                  <View style={styles.label}>
                    <Text style={styles.text}>Department : <Text style={styles.textRender}> {userData.DEPARTMENT}</Text></Text>
                    <Text style={styles.text}>Status : <Text style={[styles.textRender, { color: 'green' }]}>{userData.STATUS} </Text></Text>
                  </View>
                </View>
              </View><View style={{ flexDirection: 'row' }}>
                <View>
                  <FAIcon name='location-dot' size={(height * 0.031)} color={"gray"} style={{ marginRight: 10, marginTop: 4 }} />
                </View>
                <View>
                  <Text style={[styles.text, { marginBottom: 0, textAlign: 'left' }]}>BOARDING POINT :</Text>
                  <Text style={[styles.textRender, { textAlign: 'left', marginBottom: '10%', fontSize: (height * 0.017) }]}>BN REDDY NAGAR <FAIcon name='caret-right' size={(height * 0.017)} /> BIET CAMPUS </Text>
                </View>
              </View><View>
                <QRCode value={qrValue} size={qrSize} color="black" backgroundColor="white" />
              </View></>) : <Text>You haven't Paid Your Transport Fee Pay Now</Text>}
        </View>)}
    </View></>
  )
}

const styles = StyleSheet.create({
  suggestion: {
    fontSize:( height*0.025),
    letterSpacing: 2,
    color: 'gray',
    fontWeight: '500',
    textAlign: 'center',

  },
  img: {
    width: (height*0.07),
    height: (height*0.07)
  },
  logo: {
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: '10%',
    width: '85%',
    justifyContent: 'center',
    marginVertical:'3%'
  },
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center'
  },
  innerContainer: {
    // flex:1,
    // justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    // marginBottom: '2%',
    marginHorizontal: 'auto',
    borderTopWidth: 0,
    borderRadius: 10,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 10 },
    elevation:5,
  },
  label: {
    width: '45%',
    marginLeft:'5%',
    marginBottom:'2%'
  },
  upperSection: {
    flexDirection: 'row',
    marginBottom:'3%'
  },
  routeNo:{
    fontSize:(height*0.025),
    letterSpacing:1.2,
    fontWeight:'500',
    marginBottom:'6%'
  },
  text:{
    fontSize:(height*0.016),
    letterSpacing:1.1,
    fontWeight:'500',
    marginBottom:'2%'
  },
  textRender:{
    fontWeight:'400',
    color:'gray'
  }
})