import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image, StyleSheet, ScrollView, ImageBackground, TouchableOpacity,StatusBar} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios'

const BusDetails = () => {
    // const { control, handleSubmit, setValue, formState: { errors } } = useForm();
    const [imageUri, setImageUri] = useState(null);

    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User canceled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                setImageUri(response.assets[0]);
            }
        });
    };




    const [houseNo, setHouseNo] = useState('');
    const [area, setArea] = useState('');
    const [state, setState] = useState('');
    const [hallTicketNo, setHallticketNo] = useState('');
    const [verifyHall, setVerifyHall] = useState(false)
    const [boarding, setBoarding] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [busNo, setBusNo] = useState('');

    const [verifyUser, setVerifyUser] = useState(true);
    const [feildVerify, setFeildVerify] = useState(true);
    const [userCreated, setUserCreated] = useState(true);



    function handelState(e) {
        const varState = e.nativeEvent.text;
        setState(varState);

    }
    function handelArea(e) {
        const varArea = e.nativeEvent.text;
        setArea(varArea);

    }
    function handelHouseNo(e) {
        const varHouseNo = e.nativeEvent.text;
        setHouseNo(varHouseNo);

    }


    function handelHallticket(e) {
        const varhall = e.nativeEvent.text;
        setHallticketNo(varhall);
        setVerifyUser(true)
        setVerifyHall(false)
        const hallRegex = /^\d{2}[A-Z]\d{2}A\d{2}[A-Z0-9][A-Za-z0-9]$/;
        if (hallRegex.test(varhall)) {
            setVerifyHall(true)
        }

    }
    function handelBoarding(e) {
        const varSon = e.nativeEvent.text;
        setBoarding(varSon);
    }
    function handelMobileNo(e) {
        const varNo = e.nativeEvent.text;
        setMobileNo(varNo);
    }
    function handelBusNo(e) {
        const varNo = e.nativeEvent.text;
        setBusNo(varNo);
    }



    // Handle form submission
    const onSubmit = async () => {
        const formData = new FormData();
        const userdata = {
            hallTicketNo,
            busNo,
            boarding,
            houseNo,
            area,
            state,
            mobileNo,
        }
        formData.append("hallTicketNo", hallTicketNo)
        formData.append("busNo", busNo)
        formData.append("boarding", boarding)
        formData.append("houseNo", houseNo)
        formData.append("area", area)
        formData.append("state", state)
        formData.append("mobileNo", mobileNo)
        formData.append('image', {
            uri: imageUri.uri,
            type: imageUri.type,
            name: imageUri.fileName,
        });

        console.log(formData);
        if (!hallTicketNo || !busNo || !boarding || !houseNo || !area || !state || !mobileNo || !imageUri) {
            setFeildVerify(false)
        }
        else {
            setFeildVerify(true)
            await axios.post('http://192.168.143.237:8005/registerbus', formData, { headers: { 'Content-Type': 'multipart/form-data', 'body': 'data' } })
                .then(res => {
                    console.log(res)
                })
                .catch(error => {
                    console.log(error)
                })

        }
    };

    return (
        <><StatusBar backgroundColor={'#ffeaa7'} barStyle={'dark-content'}></StatusBar><ImageBackground source={{ uri: 'https://biet.ac.in/images/inner/Infrastructure9.jpg' }} style={styles.background}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={[styles.center, { alignItems: 'center', marginTop: '2%' }]}>
                        {/* <Text style={styles.heading}>SIGN-UP</Text> */}
                        <Text style={styles.suggestion}>Enter Your Details For Registration !</Text>
                    </View>

                    <View style={styles.center}>
                        {verifyUser ? "" : <Text style={[styles.err, { fontSize: 18, textAlign: 'center' }]}>User Already Exist !!! </Text>}
                        {userCreated ? "" : <Text style={[styles.err, { fontSize: 18, textAlign: 'center', color: 'green' }]}>Your Student Account Created Successfully !!! </Text>}
                        {feildVerify ? "" : <Text style={[styles.err, { fontSize: 18, textAlign: 'center' }]}>Please Fill all The Required fields! </Text>}
                        {hallTicketNo.length < 1 ? '' : verifyHall ? "" : <Text style={styles.err}>Invalid Hall Ticket No Format</Text>}
                        <View style={styles.backGround}>
                            <Text style={styles.lable}>HALL TICKET NO</Text>
                        </View>
                        <TextInput style={styles.inputBox} placeholder='HallTicketNo' value={hallTicketNo} onChange={e => handelHallticket(e)}></TextInput>
                    </View>

                    <View style={styles.center}>
                        <View style={styles.backGround}>
                            <Text style={styles.lable}>BUS NO</Text>
                        </View>
                        <TextInput style={styles.inputBox} placeholder="Enter your Bus number" onChangeText={text => Number(text)} keyboardType="numeric" maxLength={2} value={busNo} onChange={e => handelBusNo(e)} />
                    </View>

                    <View style={styles.center}>
                        <View style={styles.backGround}>
                            <Text style={styles.lable}>Boarding Point</Text>
                        </View>
                        <TextInput style={styles.inputBox} placeholder='Boarding Point' value={boarding} onChange={e => handelBoarding(e)}></TextInput>
                    </View>
                    <View style={styles.center}>
                        <View style={styles.backGround}>
                            <Text style={styles.lable}>Passport Size Photo:</Text>
                        </View>
                        <TouchableOpacity style={[styles.button, { width: '100%', marginTop: 0, backgroundColor: 'transparent', borderColor: '#E39424', borderWidth: 1.5, marginBottom: "6%" }]} onPress={pickImage}>
                            <Text style={[styles.buttonText, { color: '#E39424' }]}>{imageUri ? 'selected Photo' : 'Pick A photo'}
                            </Text>
                            {imageUri && <Image source={{ uri: imageUri.uri }} style={styles.image} />}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.center}>
                        <View style={styles.backGround}>
                            <Text style={styles.lable}>House No & Landmark :</Text>
                        </View>
                        <TextInput style={styles.inputBox} placeholder='House No & Landmark :' value={houseNo} onChange={e => handelHouseNo(e)}></TextInput>
                    </View>
                    <View style={styles.center}>
                        <View style={styles.backGround}>
                            <Text style={styles.lable}>Area & District:</Text>
                        </View>
                        <TextInput style={styles.inputBox} placeholder='Area & District:' value={area} onChange={e => handelArea(e)}></TextInput>
                    </View>
                    <View style={styles.center}>
                        <View style={styles.backGround}>
                            <Text style={styles.lable}>State</Text>
                        </View>
                        <TextInput style={styles.inputBox} placeholder='State' value={state} onChange={e => handelState(e)}></TextInput>
                    </View>

                    <View style={styles.center}>
                        <View style={styles.backGround}>
                            <Text style={styles.lable}>MOBILE NUMBER</Text>
                        </View>
                        <TextInput style={styles.inputBox} placeholder="Enter your number" onChangeText={text => Number(text)} keyboardType="numeric" maxLength={10} value={mobileNo} onChange={e => handelMobileNo(e)} />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={onSubmit}>
                        <Text style={styles.buttonText}>RIGISTER
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground></>
    );
};

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
        height: '100%',
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
        backgroundColor: '#E39424',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 15,
        marginBottom:'20%',
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
        fontSize: 18,
        letterSpacing: 2,
        color: 'gray',
        fontWeight: '500',
        marginBottom: 30,
        textAlign: 'center',
        width: '80%',
        marginTop:'5%'

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
    image: {
        height: 100,
        width: 100,
        margin: 'auto'
    }

});

export default BusDetails;
