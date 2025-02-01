import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

// Define a type for the form state
type FormState = {
  hallticketNo: string;
  name: string;
  dob: string;
  sonOf: string;
  academicYear: string;
  department: string;
  section: string;
  gender: string;
  email: string;
  mobileNumber: string;
  password: string;
};

const AppForm: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    hallticketNo: '',
    name: '',
    dob: '',
    sonOf: '',
    academicYear: '',
    department: '',
    section: '',
    gender: '',
    email: '',
    mobileNumber: '',
    password: '',
  });

  const handleChange = (name: keyof FormState, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', form);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Student Registration Form</Text>

      <TextInput
        style={styles.input}
        placeholder="Hall Ticket No"
        value={form.hallticketNo}
        onChangeText={(value) => handleChange('hallticketNo', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={form.name}
        onChangeText={(value) => handleChange('name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={form.dob}
        onChangeText={(value) => handleChange('dob', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Son Of"
        value={form.sonOf}
        onChangeText={(value) => handleChange('sonOf', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Academic Year"
        value={form.academicYear}
        onChangeText={(value) => handleChange('academicYear', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Department"
        value={form.department}
        onChangeText={(value) => handleChange('department', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Section"
        value={form.section}
        onChangeText={(value) => handleChange('section', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={form.gender}
        onChangeText={(value) => handleChange('gender', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(value) => handleChange('email', value)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={form.mobileNumber}
        onChangeText={(value) => handleChange('mobileNumber', value)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={form.password}
        onChangeText={(value) => handleChange('password', value)}
        secureTextEntry
      />

      <Button title="Submit" onPress={handleSubmit} color={'#E39424'} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E39424',
    borderRadius: 5,
  },
});

export default AppForm;
