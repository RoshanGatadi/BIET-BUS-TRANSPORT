import { StyleSheet, Text, View,Alert,Button } from 'react-native'
import React from 'react'

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
      text: {
        fontSize: 20,
        marginBottom: 20,
      }
})
export default LogOut;