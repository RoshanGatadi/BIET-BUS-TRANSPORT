import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParanList } from '../App'
import { NavigationProp, useNavigation } from '@react-navigation/native';

const img = require('../assets/staticPictures/biet.png')

// type RegisterScreenProps = {
//     navigation: NavigationProp<RootStackParanList, 'register'>
// }

function register({ navigation} ) {

    // const navigation = useNavigation<NavigationProp<RootStackParanList>>();


    return (
        <ImageBackground source={{ uri: 'https://biet.ac.in/images/inner/Infrastructure9.jpg' }} style={styles.background} >
            <View style={styles.container}>
                <View style={styles.centers}>
                    <Image source={img} style={styles.img}></Image>
                    <Text style={[styles.suggestion, { fontSize: 18,marginBottom:'0%' }]}>BIET BUS TRANSPORT</Text>
                </View>
                <View style={styles.centers}>
                    <Text style={styles.heading}>SIGN-UP</Text>
                    <Text style={styles.suggestion}>Click Your Type For Registration !</Text>
                </View>
                <View style={styles.center}>
                    <TouchableOpacity

                        onPress={() => navigation.navigate('admin')}
                        style={styles.button}  >
                        <Text style={styles.buttonText}>ADMIN </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('faculty')}
                        style={styles.button}  >
                        <Text style={styles.buttonText}>FACULTY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('signup')}
                        style={styles.button}  >
                        <Text style={styles.buttonText}>STUDENTS</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={[styles.Fonts, styles.lastOne]}>Do you have an account?
                        {navigation.canGoBack() && (
                            <TouchableOpacity onPress={() => navigation.goBack()}
                                style={styles.touchOp}
                            >
                                <Text style={styles.signup}>Log In</Text>
                            </TouchableOpacity>
                        )}
                    </Text>
                </View>
            </View>

        </ImageBackground >
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
        opacity: 1,
        zIndex: 1
    },
    button: {
        // backgroundColor: '#E39424', 
        paddingVertical: '4%',
        paddingHorizontal: "5%",
        borderRadius: 5,
        width: '80%',
        borderBottomColor: 'white',
        borderBottomWidth: 1.5,
    },
    buttonText: {
        color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center',
        letterSpacing: 2
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
    buttonHover: {
        backgroundColor: '#F5A938',
    },
    center: {
        backgroundColor: '#E39424',
        borderColor: '#FCFAFC',
        borderWidth: 2,
        borderRadius: 15,
        // paddingBottom:'5%'
    },
    centers: {
        width: '80%',
        alignItems: 'center'
    },
    touchOp: {
        marginTop: '3%',
    },
    img: {
        margin: 'auto',
        width: 90,
        height: 90
    }
})

export default register;