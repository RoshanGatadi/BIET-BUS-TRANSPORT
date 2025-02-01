import React from 'react';
import { View, Text, Button, StyleSheet, Alert, Image, Dimensions, TouchableOpacity,StatusBar} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import { ScrollView } from 'react-native-gesture-handler';



// Create a Stack Navigator
const Stack = createStackNavigator();
const stgLogo = require('../assets/staticPictures/lec.png');
const stdLogo = require('../assets/staticPictures/stdlogo.png');
const { width, height } = Dimensions.get('window');



// Log Out Screen
const LogOut = ({ navigation }) => {
  const handleLogOut = () => {
    // Handle log out (e.g., clear tokens or reset state)
    Alert.alert("Logged out", "You have been logged out.");
    navigation.goBack(); // Return to Profile screen after log out
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Are you sure you want to log out?</Text>
      <Button title="Log Out" onPress={handleLogOut} />
    </View>
  );
};

// Main App Component with Stack Navigator
const Profile = ({ navigation,route }) => {
  // const { user } = route.params;
  return (
    <><StatusBar backgroundColor={'#ffeaa7'} barStyle={'dark-content'}></StatusBar><ScrollView>
      <View style={styles.logoContainer}>
        <View style={styles.logoDiv}>
          <View>
            <Image source={stdLogo} style={styles.logo}></Image>
          </View>
        </View>
        <View style={styles.detailesDiv}>
          <Text style={styles.heading}>Name :<Text style={styles.txt}>G.ROSHAN </Text></Text>
          <Text style={styles.heading}>Hall Ticket No :<Text style={styles.txt}>21E11A05B2</Text></Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.btnDiv}>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={styles.btnDiv}>
            <MIcon name='person-outline' size={(width * 0.055)} color={'#E39424'} /><Text style={styles.btn}> Edit Profile </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnDiv}>
          <TouchableOpacity onPress={() => navigation.navigate('Address')} style={styles.btnDiv}>
            <MCIcon name='map-marker-outline' size={(width * 0.055)} color={'#E39424'} /><Text style={styles.btn}> Address</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnDiv}>
          <TouchableOpacity onPress={() => navigation.navigate('BusDetails')} style={styles.btnDiv}>
            <MCIcon name='bus' size={(width * 0.055)} color={'#E39424'} /><Text style={styles.btn}> Register Your Bus</Text>
          </TouchableOpacity>
        </View>

      </View>
      <View style={styles.container}>
        <View style={styles.btnDiv}>
          <TouchableOpacity onPress={() => navigation.navigate('AccountSettings')} style={styles.btnDiv}>
            <MCIcon name='account-cog-outline' size={(width * 0.055)} color={'#E39424'} /><Text style={styles.btn}> Account Settings</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ContactUs')} style={styles.btnDiv}>
          <MCIcon name='face-agent' size={(width * 0.055)} color={'#E39424'} /><Text style={styles.btn}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AboutUs')} style={styles.btnDiv}>
          <MCIcon name='account-group-outline' size={(width * 0.055)} color={'#E39424'} /><Text style={styles.btn}>About Us</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.container, { paddingVertical: 2 }]}>
        <TouchableOpacity onPress={() => navigation.navigate('LogOut')} style={styles.btnDiv}>
          <MCIcon name='logout' size={(width * 0.055)} color={'#E39424'} /><Text style={styles.btn}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView></>
  );
};

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: '5.5%',
    marginTop: '1%',
    margin: "auto",
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  logoContainer: {

    paddingLeft:'5%',
    margin: 'auto',
    flexDirection: 'row',
    paddingTop: '10%',
    width: '100%',
    padding: '2%',
    paddingVertical: '5%',
    backgroundColor: '#ffeaa7',
    borderRadius: 3,
    elevation: 3

  },
  logo: {
    width: (width * 0.275),
    height: (width * 0.275)
  },
  logoDiv: {
    borderRadius: '50%',
    borderColor: 'black',
    borderWidth: 1,
    width: '30%',
    backgroundColor: '#f1f2f6',
    // flex:1,
    alignItems: 'center',
  },
  detailesDiv: {
    width: "70%",
    flex: 1,
    // alignItems:'center',
    justifyContent: 'center',
    paddingLeft: '4%'
  },
  heading: {
    fontSize: (height * 0.017),
    letterSpacing: 1.2,
    color: 'black',
    fontWeight: '500',
    marginVertical:'1.2%'
  },
  btn: {
    backgroundColor: 'transparent',
    margin: '2%',
    letterSpacing: 1.2,
    fontSize: (width * 0.04),
    fontWeight: '400',
    borderColor: 'gray',
    // textAlignVertical:'center',
    // borderTopColor:'transparent',
    // borderLeftColor:'transparent',
    // borderRightColor:'transparent',
    color: 'gray',
    // borderBottomWidth:0.8,

  },
  btnDiv: {
    // flex:1,
    // justifyContent:'center',
    alignItems: 'center',
    flexDirection: 'row',

  },
  txt:{
    // color:'gray'
    fontWeight:'400',
  }
});

export default Profile;