import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Dimensions, ActivityIndicator,Button,BackHandler} from 'react-native'
import React, { ReactNode, useEffect, useState, useRef } from 'react';
import { useFocusEffect} from '@react-navigation/native'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import RBSheet from 'react-native-raw-bottom-sheet';
import axios from 'axios';
import { ipAddress } from './ipAddress';


const { height } = Dimensions.get('window');


const img = require('../assets/staticPictures/biet.png')


// interface BusRoute {
//   BUS_ROUTE_NO: string;
//   STOPS_NAME: string;
//   TIMINGS: string;
//   FARES: number;
//   NO_PLATE: string | null;
//   MOBILENO:number;
//   DRIVER_NAME: string; RN: number;
// }
// interface BusStop {
//   BUS_ROUTE_NO: string;
//   STOPS_NAME: string;
//   TIMINGS: string;
//   FARES: number;
//   MOBILENO:number;
//   NO_PLATE: string | null;
//   DRIVER_NAME: string; 
// }

const Timings = () => {
    const [loading, setLoading] = useState(true)

  const [busRoutes, setBusRoutes] = useState([]);
  const [busStops, setBusStops] = useState([]);
  const[busNo,setBusNo]=useState();
  const[driverName,setDriverName]=useState()
  const[driverNumber,setDriverNumber]=useState()

  function getData() {
    axios.get(`http://${ipAddress}:8005/getbusroute`)
      .then(res => {
        setBusRoutes(res.data);
        // console.log(busRoutes)

      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    getData()
    setTimeout(() => { setLoading(false); }, 300)

    return () => {
      // backHandler.remove();
      console.log("end")
    }
  },[isBottomSheetOpen])


  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false); // State to track if the bottom sheet is open

  // Handle the back button press event
  const handleBackPress = () => {
    if (isBottomSheetOpen) {
      refRBSheet.current.close(); // Close the bottom sheet if it's open
      setIsBottomSheetOpen(false);  // Update the state to reflect that the bottom sheet is closed
      return true;  // Prevent default back button action (e.g., exit app)
    }
    return false;  // Allow default back behavior (e.g., navigate back)
  };

  const openBottomSheet = () => {
    refRBSheet.current.open();
    setIsBottomSheetOpen(true);
  };

  // Function to close the bottom sheet
  const closeBottomSheet = () => {
    refRBSheet.current.close();
    setIsBottomSheetOpen(false);
  };

  const refRBSheet = useRef(null);
  // const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  function onClick(e) {
    setBusNo(e);
    setLoading(true)
    axios.post(`http://${ipAddress}:8005/busroute`, { 'busRouteNo': e })
      .then(res => {
        const bus =res.data
        setBusStops(res.data);
        setDriverName(bus[0].DRIVER_NAME)
        setDriverNumber(bus[0].MOBILENO)
        setLoading(false)
        openBottomSheet();
      })
      .catch((error) => {
        console.log(error)
      })





  }

  return (


    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.ops}>
        <View style={styles.logo}>
          <Image source={img} style={styles.img}></Image>
          <Text style={[styles.suggestion, { fontSize: 22, marginBottom: '0%' }]}>BIET BUS TRANSPORT</Text>
        </View>
      </View>
      {loading ? ( <View style={{flex:1,justifyContent:'center',alignItems:'center',height:'100%',width:'100%',zIndex:1}}><ActivityIndicator size="large" color="#E39424" /></View> ) :""
              }
      {busRoutes.map((route) =>
      (
        <TouchableOpacity key={route.BUS_ROUTE_NO} onPress={() => onClick(route.BUS_ROUTE_NO)}>
          <View style={styles.container}>
            <View style={styles.flatCard} >
              <View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text style={styles.route}>ROUTE NO : {route.BUS_ROUTE_NO} <MCIcon name='bus-marker' size={22} color={"#636e72"} /></Text>
                  <Text style={styles.onRoute}>ON ROUTE</Text>
                </View>
                <Text style={styles.location}> <FAIcon name='route' size={14} color={"#636e72"} />  From : {route.STOPS_NAME} {">"} BIET College</Text>
              </View>
              <View style={styles.flexBox}>
                <View style={[styles.timeBox, { justifyContent: 'center', width: '65%' }]}>
                  <Text style={styles.timing}><MCIcon name='clock' size={18} color={"#636e72"} /> {route.TIMINGS} -- 09:00 AM </Text>
                </View>
                <View style={[styles.timeBox, { borderRadius: 15, backgroundColor: '#dff9fb', paddingVertical: "3%" }]}>
                  <Text style={[styles.feeText, { fontWeight: 'bold', fontSize: 18 }]}>
                    ₹16,000
                  </Text>
                  <Text style={[styles.feeText, { color: "gray", fontSize: 12, marginRight: '5%' }]}>
                    ON WORDS
                  </Text>
                </View>
              </View>

              <View>
                <View >
                  <Text style={styles.numberPlate}>• {route.NO_PLATE}AP 06 AB 1234 •</Text>
                </View>
                <Text style={[styles.location, { marginTop: '1.5%' }]}><MCIcon name='steering' size={14} color={"#636e72"} /> DRIVER: {route.DRIVER_NAME}</Text>
              </View>
            </View>
          </View>
          

          <ScrollView>
            <View style={styles.containers} >
              {/* <Button title="Open Bottom Sheet" onPress={() => refRBSheet.current?.open()} /> */}
              <RBSheet
                ref={refRBSheet}
                height={height * 0.6}
                customStyles={{
                  wrapper: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  },
                  draggableIcon: {
                    backgroundColor: '#000',
                  },
                }}
              >
                <ScrollView>
                {loading ? ( <View style={{flex:1,justifyContent:'center',alignItems:'center',height:'100%',width:'100%',zIndex:1}}><ActivityIndicator size="large" color="#E39424" /></View> ) :""
              }
                  <View style={styles.busInfo}>
                    <View>
                      <Text style={[styles.route,{margin:'auto',marginBottom:'3%',letterSpacing:1.2}]}>ROUTE NO : {busNo} <FAIcon name='route' size={20} color={"#636e72"} style={{ margin: 0, padding: 0 }} /></Text>
                      <Button title="Close Bottom Sheet" onPress={closeBottomSheet} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <View style={{ width: '45%', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={[styles.numberPlate, { width: '70%' }]}>• {route.NO_PLATE} AP 06 AB 1234 •</Text>
                      </View>
                      <View style={{ width: '55%' }}>
                        <Text style={[styles.location, { marginTop: '1.5%', fontSize: 14, color: 'black' }]}><MCIcon name='steering' size={14} color={"#636e72"} /> <Text style={{fontWeight:'600',letterSpacing:1.2}}> Driver :</Text>  {driverName}</Text>
                        <Text style={[styles.location, { marginTop: '1.5%', fontSize: 14, color: 'black' }]}><MCIcon name='phone' size={14} color={"#636e72"} /> <Text style={{fontWeight:'600',letterSpacing:1.2}}> Mobile No :</Text> {driverNumber} </Text>

                      </View>
                    </View>
                  </View>
                  <View style={[styles.sheetContent,{margin:0,padding:0}]}>
                      <View style={{ width: '25%',margin:0,padding:0 }}>
                        <Text style={{ textAlignVertical:'center', textAlign:'center',fontWeight:'700',letterSpacing:1.2}}>TIMINGS</Text>
                      </View>
                      <View style={[styles.pole,{borderTopRightRadius:10,borderTopLeftRadius:10,margin:0,padding:0}]}>
                        <Text></Text>
                      </View>
                      <View style={{ width: '45%',margin:0,padding:0 }}>
                        <Text style={{fontWeight:'700',letterSpacing:1.2}}>BUS STOPS</Text>
                      </View>
                      <View style={{ width: '15%',margin:0,padding:0 }}>
                        <Text style={{textAlign:'center',fontWeight:'700',letterSpacing:1.2}} >FARES</Text>
                      </View>
                    </View>
                  {busStops.map((stop) => (
                    
                    <View style={styles.sheetContent} key={stop.TIMINGS}>
                      <View style={{ width: '25%',height:'100%' ,justifyContent:'center'}}>
                        <Text style={{ textAlignVertical:'bottom',textAlign:'center',fontWeight:'500'}}><MCIcon name='clock-time-four-outline' size={14} color={"#636e72"} /> {stop.TIMINGS}</Text>
                      </View>
                      <View style={styles.pole}>
                        <Text style={{ fontWeight: 'bold', textAlign:'center',textAlignVertical:'top',width:'100%'}}>●</Text>
                      </View>
                      <View style={{ width: '45%',height:'100%' ,justifyContent:'center' }}>
                        <Text  style={{fontWeight:'500'}}>{stop.STOPS_NAME}</Text>
                      </View>
                      <View style={{ width: '15%',height:'100%' ,justifyContent:'center' }}>
                        <Text style={{textAlign:'center',fontWeight:'500'}} >₹{stop.FARES}</Text>
                      </View>
                    </View>
                  ))}
                  <View style={[styles.sheetContent,{margin:0,padding:0}]}>
                      <View style={{ width: '25%',margin:0,padding:0 }}>
                        <Text style={{ textAlignVertical:'center', textAlign:'center',fontWeight:'700',letterSpacing:1.2}}></Text>
                      </View>
                      <View style={[styles.pole,{borderBottomRightRadius:10,borderBottomLeftRadius:10,margin:0,padding:0}]}>
                        <Text></Text>
                      </View>
                      <View style={{ width: '45%',margin:0,padding:0 }}>
                        <Text style={{fontWeight:'700',letterSpacing:1.2}}></Text>
                      </View>
                      <View style={{ width: '15%',margin:0,padding:0 }}>
                        <Text style={{textAlign:'center',fontWeight:'700',letterSpacing:1.2}} ></Text>
                      </View>
                    </View>
                </ScrollView>
              </RBSheet>
            </View>
          </ScrollView>
        </TouchableOpacity>))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  suggestion: {
    fontSize:( height*0.018),
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    justifyContent: 'center',
    margin: 'auto',
    marginTop: 15,
  },
  ops: {
    backgroundColor: 'white',
    marginBottom: '5%',
    opacity: 1,
    zIndex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center'

  },
  flatCard: {
    width: '90%',
    borderRadius: 10,
    // height: '30%',
    backgroundColor: 'white',
    marginBottom: "5%",
    padding: 13,
    elevation: 4,
  },
  route: {
    width: '50%',
    fontSize: 18,
    fontWeight: 'bold'
  },
  location: {
    marginVertical: 1,
    fontSize: 12,
    color: 'gray'
  },
  flexBox: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: '1%'
  },
  timeBox: {
    width: '30%'
  },
  feeText: {
    padding: 0,
    margin: 0,
    textAlign: 'center'
  },
  timing: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  numberPlate: {
    width: '35%',
    borderRadius: 3,
    borderColor: 'black',
    borderWidth: 0.8,
    padding: 2,
    backgroundColor: '#f1c40f',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  onRoute: {
    borderRadius: 10,
    backgroundColor: '#FFC1D4',
    fontSize: 12,
    fontWeight: '400',
    paddingHorizontal: '4%',
    paddingVertical: 0,
    textAlignVertical: 'center'
  },
  containers: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetContent: {
    flex: 1,
    flexDirection: "row"
  },
  sheetText: {
    fontSize: 18,
  },
  pole: {
    width: '5%',
    paddingVertical: '4%',
    backgroundColor: '#FFC1D4',
    marginHorizontal: '3%',
    alignItems: 'center',
    // borderTopEndRadius:20
    // flex:1
  },
  busInfo:{
    padding:'2%',
    marginVertical:'6%',
    borderRadius:10,

    backgroundColor:'white'
  }

})

export default Timings;