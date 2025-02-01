import React ,{useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Linking, Image,StatusBar } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome6';
import IONIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'



const mail = require('../../assets/staticPictures/mailImg.png')

const ContactUs = () => {

  const navigation = useNavigation(); 
  useEffect(() => { 
    const unsubscribe = 
    navigation.addListener('tabPress', e => { 
    e.preventDefault(); 
    navigation.navigate('ContactUs'); 
  }); 
  return unsubscribe; 
}, [navigation]);




  return (
    <><StatusBar backgroundColor={'#ffeaa7'} barStyle={'dark-content'}></StatusBar>
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* <Text style={styles.heading}>Contact Us / Support</Text> */}
      <View style={styles.topContainer}>
        <Image source={mail} style={styles.image}></Image>
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.items}>
          <IONIcon name='mail-open-outline' size={30} color={"#E39424"} style={styles.icon} />
          {/* <Text style={styles.label}>Email:</Text> */}
          <Text style={styles.bluetext} onPress={() => Linking.openURL('mailto:bietbustransport@gmail.com')}>bietbustransport@gmail.com</Text>
        </View>


        <View style={styles.items}>
          <IONIcon name='phone-portrait-outline' size={30} color={"#E39424"} style={styles.icon} />
          {/* <FAIcon name='mobile-screen' size={25} color={"#E39424"} style={styles.icon} /> */}
          {/* <Text style={styles.label}>Phone:</Text> */}
          <Text style={styles.text}>Customer Support Hotline:<Text onPress={() => Linking.openURL(`tel:6302298665`)} style={styles.bluetext}> +91-XXXXXXXXXX</Text></Text>
          <Text style={styles.subText}>Available: Monday to Saturday, 9 AM to 6 PM IST</Text>
        </View>

        <View style={styles.items}>
          <IONIcon name='location-sharp' size={30} color={"#E39424"} style={styles.icon} />
          {/* <FAIcon name='location-dot' size={25} color={"#E39424"} style={styles.icon} /> */}
          {/* <Text style={styles.label}>Address:</Text> */}
          <Text style={styles.text}>Main Block 113</Text>
          <Text style={styles.text}>Bharat Institute</Text>
          <Text style={styles.text}>Of Engineering And Technology</Text>
          <Text style={styles.text}>Mangalpally Village,Ibrahimpatnam Mandal</Text>
          <Text style={styles.text}>Telanagana , India ,Zipcode: 501510.</Text>
          <Text style={styles.text}>India</Text>
        </View>
        <View style={[styles.items, { marginTop: '10%' ,marginBottom:'50%' }]}>
          {/* <Text style={styles.label}>Social Media:</Text> */}
          <Text style={styles.bluetext} onPress={() => Linking.openURL('https://www.facebook.com/profile.php?id=100064701367368&mibextid=ZbWKwL')}><FAIcon name='square-facebook' size={18} color={"black"} style={styles.icon} /> Facebook</Text>
          <Text style={styles.bluetext} onPress={() => Linking.openURL('https://x.com/BIET?t=iW4uPRThJ2VhPtPYhC8OzA&s=09')}><FAIcon name='x-twitter' size={18} color={"black"} style={styles.icon} /> Twitter</Text>
          <Text style={styles.bluetext} onPress={() => Linking.openURL('https://www.linkedin.com/school/bharat-institute-of-engineering-&-technology/')}><FAIcon name='linkedin' size={18} color={"black"} style={styles.icon} /> LinkedIn</Text>
        </View>

      </View>
    </ScrollView></>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // padding: 20,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginTop: 5,
  },
  text: {
    fontSize: 16,
    color: '#576574',
  },
  subText: {
    fontSize: 14,
    color: '#8395a7',
    // marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100
  },
  topContainer: {
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffeaa7',
    width: '100%'
  },
  middleContainer: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  icon: {
    marginTop: '3%',
    marginHorizontal: 10
  },
  items:{
    alignItems: 'center',
    marginTop:'5%'
  },
  bluetext:{
    fontSize: 16,
    color: '#54a0ff',
  }
});

export default ContactUs;
