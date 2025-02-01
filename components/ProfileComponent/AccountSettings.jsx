import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';  // You can choose any icon set
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const AccountSettingsScreen=()=>{
  return (
  <ScrollView contentContainerStyle={styles.container}>

    {/* Change Password Card */}
    <Card style={styles.card} onPress={handleChangePassword}>
      <Card.Content>
        <View style={styles.row}>
          <Icon name="lock" size={20} color="#000" />
          <Title style={styles.cardTitle}>Change Password</Title>
        </View>
        <Paragraph style={styles.cardText}>
          Change your account password to keep it secure.
        </Paragraph>
      </Card.Content>
    </Card>

    {/* Delete Account Card */}
    <Card style={styles.card} onPress={handleDeleteAccount}>
      <Card.Content>
        <View style={styles.row}>
          <Icon name="trash" size={20} color="#d9534f" />
          <Title style={styles.cardTitle}>Delete Account</Title>
        </View>
        <Paragraph style={styles.cardText}>
          Permanently delete your account and all associated data.
        </Paragraph>
      </Card.Content>
    </Card>

  </ScrollView>

  )
}
// Handle change password logic
const handleChangePassword = () => {
  Alert.alert('Change Password', 'This will open the Change Password screen');
};

// Handle delete account logic
const handleDeleteAccount = () => {
  Alert.alert(
    'Delete Account',
    'Are you sure you want to delete your account?',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: () => Alert.alert('Account Deleted', 'Your account has been deleted.') },
    ]
  );
};




// const AccountSettings = () => {


//   return (
//     <Stack.Navigator initialRouteName="AccountSettings">
//     <Stack.Screen
//       name="AccountSettings"
//       component={AccountSettingsScreen}
//       // options={{headerShadowVisible:false }}
//     />
//     <Stack.Screen
//       name="ChangePassword"
//       component={Password}
//       options={{ title: 'Change Password' }}
//     />
//     <Stack.Screen
//       name="DeleteAccount"
//       component={Delete}
//       options={{ title: 'Delete Account' }}
//     />
//   </Stack.Navigator>

//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 10,
    elevation: 5,  // Adds shadow effect
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  cardText: {
    fontSize: 16,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AccountSettingsScreen;
