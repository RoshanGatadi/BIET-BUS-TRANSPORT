import { Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { RootStackParanList } from '../App'
import { NavigationProp } from '@react-navigation/native'
import axios from 'axios'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ipAddress } from './ipAddress';




const img = require('../assets/staticPictures/biet.png')

export default function admin({ navigation }) {




    const [adminName, setAdminName] = useState('');
    const [adminID, setAdminID] = useState('');
    const [verifyAdminID, setVerifyAdminID] = useState(false)
    const [address, setAddress] = useState('');
    const [department, setDepartment] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [Password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [emailverify, setEmailverify] = useState(false);
    const [verifyUser, setVerifyUser] = useState(true);
    const [feildVerify, setFeildVerify] = useState(true)
    const [userCreated, setUserCreated] = useState(true);




    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const showDatePicker = () => { setDatePickerVisibility(true); };
    const hideDatePicker = () => { setDatePickerVisibility(false); };
    const handleConfirm = (date) => { setSelectedDate(date.toLocaleDateString()); hideDatePicker(); };






    function onSubmition() {
        const userdata = {
            adminName,
            adminID,
            adminDob: selectedDate,
            gender: value,
            department,
            email,
            mobileNo,
            Password,
        }
        if (!adminName || !adminID || !selectedDate || !value || !department || !email || !mobileNo || !Password) {
            setFeildVerify(false)
        } else {
            axios.post(`http://${ipAddress}/admininfo`, userdata)
                .then(res => {
                    console.log(res.data)
                    if (res.data === 'Already user exist') {
                        console.log(res.data)
                        setVerifyUser(false);
                        setUserCreated(true)
                    } else if (res.data === 'Your Admin account has been Updated') {
                        setUserCreated(false)
                        setVerifyUser(true)
                    }
                })
                .catch(e => console.log(e))
        }
    }





    function handelName(e) {
        const varname = e.nativeEvent.text;
        setAdminName(varname);

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


    function handelAdminID(e) {
        const varAdminID = e.nativeEvent.text;
        setAdminID(varAdminID);
        setVerifyUser(true)
        setVerifyAdminID(false)
        const AdminIDRegex = /^\d{2}[A-Z]\d{2}A\d{2}[A-Z0-9][A-Za-z0-9]$/;
        if (AdminIDRegex.test(varAdminID)) {
            setVerifyAdminID(true)
        }

    }
    function handelAddress(e) {
        const varSon = e.nativeEvent.text;
        setAddress(varSon);
    }
    function handelDepartment(e) {
        const varDep = e.nativeEvent.text;
        setDepartment(varDep);
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
                        {verifyUser ? "" : <Text style={[styles.err, { fontSize: 18, textAlign: 'center' }]}>User Already Exist !!! </Text>}
                        {userCreated ? "" : <Text style={[styles.err, { fontSize: 18, textAlign: 'center', color: 'green' }]}>Your Student Account Created Successfully !!! </Text>}
                        {feildVerify ? "" : <Text style={[styles.err, { fontSize: 18, textAlign: 'center' }]}>Please Fill all The Required fields! </Text>}
                        {adminID.length < 1 ? '' : verifyAdminID ? "" : <Text style={styles.err}>Invalid AdminID Format</Text>}
                        <View style={styles.backGround}>
                            <Text style={styles.lable}>ADMIN ID</Text>
                        </View>
                        <TextInput style={styles.inputBox} placeholder='Admin id' value={adminID} onChange={e => handelAdminID(e)}></TextInput>
                    </View>
                    <View style={styles.center}>
                        <View style={styles.backGround}>
                            <Text style={styles.lable}>NAME</Text>
                        </View>
                        <TextInput style={styles.inputBox} placeholder='Name' value={adminName} onChange={e => handelName(e)}></TextInput>
                    </View>
                    <View style={styles.center}>
                        <View style={styles.backGround}>
                            <Text style={styles.lable}>DATE-OF-BIRTH</Text>
                        </View>
                        <View style={styles.inputBox}> <Text style={styles.label}>Selected Date: {selectedDate}</Text>
                            <TouchableOpacity onPress={showDatePicker} >
                                <Text style={styles.buttonText}>
                                </Text>
                            </TouchableOpacity>

                            <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} />
                        </View>
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
                            <Text style={styles.lable}>DEPARTMENT</Text>
                        </View>
                        <TextInput style={styles.inputBox} placeholder='Department' value={department} onChange={e => handelDepartment(e)} ></TextInput>
                    </View>
                    <View style={styles.center}>
                        {email.length < 1 ? "" : (emailverify ? '' : <Text style={styles.err}>Invalid Email Format</Text>)}
                        <View style={styles.backGround}>
                            <Text style={styles.lable}>EMAIL</Text>
                        </View>
                        <TextInput style={styles.inputBox} placeholder="Enter your email" value={email} onChange={e => handelEmail(e)} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
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
                            >
                                <Text style={styles.signup}>Log In</Text>
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
        width: '100%', height: 45, borderColor: '#E39424', borderWidth: 1.5, marginBottom: 20, paddingLeft: 8,
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
        // position:'absolute',
        // zIndex:-1
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
    Icon: {
        position: 'absolute',
        right: '5%',
        top: '20%'
    }

})
