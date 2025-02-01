import { Button, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ipAddress } from './ipAddress';




const img = require('../assets/staticPictures/biet.png')

// type signUpScreenProps =  StackScreenProps<RootStackParanList, 'signup'>

export default function signup({navigation}) {
    const [studentName, setStudentName] = useState('');
    const [hallticketNo, setHallticketNo] = useState('');
    const [verifyHall,setVerifyHall]=useState(false)
    const [sonOf, setSonOf] = useState('');
    const [department, setDepartment] = useState('');
    const [section, setSection] = useState('');
    const [acadamicYear, setAcadamicYear] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [Password, setPassword] = useState('');
    const [isPasswordVisible,setIsPasswordVisible]=useState(false)
    const [email, setEmail] = useState('');
    const [emailverify, setEmailverify] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [verifyUser, setVerifyUser] = useState(true);
    const[feildVerify,setFeildVerify]=useState(true);
    const [userCreated,setUserCreated]=useState(true);
    function handleSelect(index ,option) {
        throw new Error('Function not implemented.');
    }

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const showDatePicker = () => { setDatePickerVisibility(true); };
    const hideDatePicker = () => { setDatePickerVisibility(false); };
    const handleConfirm = (date) => { setSelectedDate(date.toLocaleDateString()); hideDatePicker(); };




    function onSubmition() {
        const userdata = {
            studentName,
            hallTicketNo:hallticketNo,
            selectedDate,
            value,
            sonOf,
            acadamicYear,
            department,
            section,
            email,
            mobileNo,
            Password,
        }
        if(!studentName||!hallticketNo||!selectedDate||!value||!sonOf||!acadamicYear||!department||!section||!email||!mobileNo||!Password){
            setFeildVerify(false)
        }
        else{
            console.log('hey')
            axios.post(`http://${ipAddress}:8005/studentinfo`, userdata)
                .then(res => {
                    console.log(res.data)
                    if (res.data === 'Already user exist') {
                        console.log(res.data)
                        setVerifyUser(false);
                        setUserCreated(true)
                    } else if(res.data==='Your Student account has been Updated') {
                        setUserCreated(false)
                        setVerifyUser(true)
                    }
                })
                .catch(e => console.log(e))
        }
    }








    function handelName(e) {
        const varname = e.nativeEvent.text;
        setStudentName(varname);
    
    }
    function handelEmail(e) {
        const varemail = e.nativeEvent.text;
        setEmail(varemail)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setEmailverify(false);
        if (emailRegex.test(varemail)) {
            setEmailverify(true);
        }

    }


    function handelHallticket(e) {
        const varhall = e.nativeEvent.text;
        setHallticketNo(varhall);
        setVerifyUser(true)
        setVerifyHall(false)
        const hallRegex=/^\d{2}[A-Z]\d{2}A\d{2}[A-Z0-9][A-Za-z0-9]$/;
        if (hallRegex.test(varhall)){
            setVerifyHall(true)
        }

    }
    function handelSonOF(e) {
        const varSon = e.nativeEvent.text;
        setSonOf(varSon);
    }
    function handelDepartment(e) {
        const varDep = e.nativeEvent.text;
        setDepartment(varDep);
    }
    function handelSection(e) {
        const varSec = e.nativeEvent.text;
        setSection(varSec);
    }
    function handelAcadamicYear(e) {
        const varYear = e.nativeEvent.text;
        setAcadamicYear(varYear);
    }
    function handelMobileNo(e) {
        const varNo = e.nativeEvent.text;
        setMobileNo(varNo);
    }
    function handelPassword(e) {
        const varpassword = e.nativeEvent.text;
        setPassword(varpassword);
    }


    return (
        <ImageBackground source={{ uri: 'https://biet.ac.in/images/inner/Infrastructure9.jpg' }} style={styles.background} >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.ops}>
                    <View style={styles.logo}>
                        <Image source={img} style={styles.img}></Image>
                        <Text style={[styles.suggestion, { fontSize: 22, marginBottom: '0%' }]}>BIET BUS TRANSPORT</Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={[styles.center, styles.centers]}>
                        <Text style={styles.heading}>SIGN-UP</Text>
                        <Text style={styles.suggestion}>Enter Your Details For Registration !</Text>
                    </View>
                    <View style={styles.center}>
                        <View style={styles.backGround}>

                        </View>
                    </View>
                    <View style={styles.center}>
                            {verifyUser ? "" : <Text style={[styles.err,{fontSize:18,textAlign:'center'}]}>User Already Exist !!! </Text>}
                            {userCreated? "" : <Text style={[styles.err,{fontSize:18,textAlign:'center',color:'green'}]}>Your Student Account Created Successfully !!! </Text>}
                            {feildVerify ? "" : <Text style={[styles.err,{fontSize:18,textAlign:'center'}]}>Please Fill all The Required fields! </Text>}
                            {hallticketNo.length<1?'':verifyHall?"":<Text style={styles.err}>Invalid Hall Ticket No Format</Text>}
                        <View style={styles.backGround}>
                            <Text style={styles.lable}>HALL TICKET NO</Text>
                        </View>
                        <TextInput style={styles.inputBox} placeholder='HallTicketNo' value={hallticketNo} onChange={e => handelHallticket(e)}></TextInput>
                    </View>
                    <View style={styles.center}>
                        <View style={styles.backGround}>
                            <Text style={styles.lable}>NAME</Text>
                        </View>
                        <TextInput style={styles.inputBox} placeholder='Name' value={studentName} onChange={e => handelName(e)}></TextInput>
                    </View>
                    <View style={styles.center}>
                        <View style={styles.backGround}>
                            <Text style={styles.lable}>DATE-OF-BIRTH</Text>
                        </View>
                        <View style={styles.inputBox}> <Text style={styles.label}>Selected Date: {selectedDate}</Text>
                            <TouchableOpacity onPress={showDatePicker} >
                                <Text style={styles.buttonText} >
                                </Text>
                            </TouchableOpacity>

                            <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} /> </View>
                    </View>
                    <View style={styles.center}>
                        <View style={styles.backGround}>
                            <Text style={styles.lable} >GENDER </Text>
                        </View>

                        <DropDownPicker
                            open={open}
                            value={value}
                            items={[
                                { label: 'MALE', value: 'MALE' },
                                { label: 'FEMALE', value: 'FEMALE' },
                                { label: 'OTHERS', value: 'OTHERS' },
                            ]}
                            setOpen={setOpen}
                            setValue={setValue}
                            placeholder="Select Gender"
                            placeholderStyle={{
                                color: 'gray',
                                letterSpacing: 2
                            }}
                            dropDownContainerStyle={{
                                backgroundColor: 'white',
                                maxHeight: 200,
                                width: '100%',
                                borderColor: 'gray',

                            }}
                            style={[styles.inputBox, styles.dropDown]}
                        />
                    </View>
                    <View style={styles.center}>
                        <View style={styles.backGround}>
                            <Text style={styles.lable}>S/O OR D/O</Text>
                        </View>
                        <TextInput style={styles.inputBox} placeholder='S/o or D/o' value={sonOf} onChange={e => handelSonOF(e)}></TextInput>
                    </View>
                    <View style={styles.center}>
                        <View style={styles.backGround}>
                            <Text style={styles.lable}>ACADEMIC YEAR</Text>
                        </View>
                        <TextInput style={styles.inputBox} placeholder='Academic Year' value={acadamicYear} onChange={e => handelAcadamicYear(e)}></TextInput>
                    </View>
                    <View style={[styles.center, styles.sec]}>
                        <View style={styles.dep}>
                            <View style={styles.backGround}>
                                <Text style={styles.lable}>DEPARTMENT</Text>
                            </View>
                            <TextInput style={styles.inputBox} placeholder='Department' value={department} onChange={e => handelDepartment(e)}></TextInput>
                        </View>
                        <View style={styles.dep}>
                            <View style={styles.backGround}>
                                <Text style={styles.lable}>SECTION</Text>
                            </View>
                            <TextInput style={styles.inputBox} placeholder='Section' value={section} onChange={e => handelSection(e)}></TextInput>
                        </View>
                    </View>
                    <View style={styles.center}>
                        {email.length < 1 ? "" : (emailverify ? '' : <Text style={styles.err}>Invalid Email Format</Text>)}
                        <View style={styles.backGround}>
                            <Text style={styles.lable}>EMAIL</Text>
                        </View>
                        <TextInput style={styles.inputBox} placeholder="Enter your email" value={email} onChange={e => handelEmail(e)} />
                    </View>
                    <View style={styles.center}>
                        <View style={styles.backGround}>
                            <Text style={styles.lable}>MOBILE NUMBER</Text>
                        </View>
                        <TextInput style={styles.inputBox} placeholder="Enter your number" onChangeText={text => Number(text)} keyboardType="numeric" maxLength={10} value={mobileNo} onChange={e => handelMobileNo(e)} />
                    </View>
                    <View style={styles.center}>
                        <View style={styles.backGround}>
                            <Text style={styles.lable}>PASSWORD</Text>
                        </View>
                        <TextInput style={styles.inputBox} placeholder='Password' secureTextEntry={!isPasswordVisible} value={Password} onChange={e => handelPassword(e)}></TextInput>
                        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.Icon} > <Icon name={isPasswordVisible ? 'visibility' : 'visibility-off'} size={20} color="grey" /> </TouchableOpacity>
                        
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => onSubmition()}>
                        <Text style={styles.buttonText}>RIGISTER
                        </Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={[styles.Fonts, styles.lastOne]}>Do you have an account?
                            <TouchableOpacity onPress={() => navigation.navigate('LogIn')}
                                style={styles.touchOp}
                            > <Text style={styles.signup}>Log In</Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground >
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
        // marginTop: 30,
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
        width: '100%', 
        height: 45,
         borderColor: '#E39424', 
         borderWidth: 1.5, 
         marginBottom: 20, 
         paddingLeft: 8,
        borderRadius: 6,
        letterSpacing: 3,
        paddingInlineStart: '5%'
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
        backgroundColor: '#E39424', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, marginTop: 15,
        width: '80%'
    },
    buttonText: {
        color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center',
        letterSpacing: 2
    },
    label: {
        letterSpacing: 2,
        color: 'gray',
        position: 'absolute',
        top: '27%',
        left: '7%',
    },
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
        marginBottom: 30,
        textAlign: 'center',
        width: '80%'

    },
    Fonts: {
        fontSize: 14,
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
    dropDown: {
        margin: 'auto',
        backgroundColor: 'transparent',
        zIndex: -1,
        color: 'gray'
    },
    center: {
        // flex:1,
        width: '80%'
    },
    buttonBox: {
        color: 'transparent'
    },
    dep: {
        width: '49%',
        marginHorizontal: 2
    },
    sec: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'space-around'
    },
    centers: {
        alignItems: 'center'
    },
    touchOp: {
        marginTop: '3%',
    },
    img: {
        // margin: 'auto',
        width: 60,
        height: 60
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
        opacity: 1,
        zIndex: 1,
    },
    err: {
        color: "red",
        marginTop: 0,
        paddingTop: 0,
        paddingBottom: '3%',
        letterSpacing: 2

    },
    Icon:{
        position:'absolute',
        right:'5%',
        top:'20%'
    }
})

