import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Address = () => {
  // Sample address data
  const address = {
    name: 'Roshan Gatadi',
    street: '1-283-26 Chaitanya nagar,BN Reddy nagar',
    city: 'Vanasthalipuram,Rangareddy ',
    state: 'Telangana',
    zipCode: '500070',
    country: 'India',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{address.name}</Text>
        {/* <Text style={styles.cardText}>{address.name}</Text> */}
        <Text style={styles.cardText}>{address.street},{address.city},{address.state},{address.country}-{address.zipCode}</Text>
        {/* <Text style={styles.cardText}>{address.city}</Text>
        <Text style={styles.cardText}>{address.state}</Text>
        <Text style={styles.cardText}>{address.zipCode}</Text>
        <Text style={styles.cardText}>{address.country}</Text> */}
        <Text style={{fontSize:16,fontWeight: '400', marginTop:'3%'}}>6302298665</Text>
      </View>
    </ScrollView>
  );
};

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
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginVertical: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    color:'#222f3e',
    marginBottom:'4%',
  },
  cardText: {
    fontSize: 16,
    color:'#222f3e'
    // marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
});

export default Address;
