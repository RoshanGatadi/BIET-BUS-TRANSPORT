import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';

const Delete = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle delete account logic
  const handleDeleteAccount = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
    } else if (password === '') {
      Alert.alert('Error', 'Please enter your password!');
    } else {
      // You would typically call an API here to delete the account
      Alert.alert(
        'Delete Account',
        'Are you sure you want to delete your account? This action cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', onPress: () => deleteAccount() },
        ]
      );
    }
  };

  // Simulate deleting account
  const deleteAccount = () => {
    // Call your delete account API here
    Alert.alert('Account Deleted', 'Your account has been successfully deleted.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Delete Account</Text>
      <Text style={styles.description}>
        Are you sure you want to delete your account? This action cannot be undone.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />

      <Button title="Delete Account" color="#d9534f" onPress={handleDeleteAccount} />

      <Button
        title="Cancel"
        color="#5bc0de"
        onPress={() => Alert.alert('Action Canceled', 'Your account was not deleted.')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    paddingLeft: 10,
    marginBottom: 15,
  },
});

export default Delete;
