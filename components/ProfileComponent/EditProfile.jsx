import React, { useState } from 'react';
import { View, Dimensions, TextInput, Button, StyleSheet, Image, ScrollView, TouchableOpacity, Animated,StatusBar, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';




const { width ,height } = Dimensions.get('window');

const EditProfile = () => {
  const [name, setName] = useState('Roshan gatadi');
  const [dob, setDob] = useState('2000-01-01');
  const [parent, setParent] = useState('G.Suresh');
  const [academicYear, setAcademicYear] = useState('2025');
  const [department, setDepartment] = useState('Computer Science');
  const [mobile, setMobile] = useState('9876543210');
  const [email, setEmail] = useState('roshan@example.com');
  const [profileImage, setProfileImage] = useState(null);

  // State to track which field is focused
  const [focusedField, setFocusedField] = useState(null);

  // Animations for each input field
  const [borderAnimation] = useState({
    name: new Animated.Value(0),
    dob: new Animated.Value(0),
    parent: new Animated.Value(0),
    academicYear: new Animated.Value(0),
    department: new Animated.Value(0),
    mobile: new Animated.Value(0),
    email: new Animated.Value(0),
  });

  const [labelColorAnim] = useState({
    name: new Animated.Value(0),
    dob: new Animated.Value(0),
    parent: new Animated.Value(0),
    academicYear: new Animated.Value(0),
    department: new Animated.Value(0),
    mobile: new Animated.Value(0),
    email: new Animated.Value(0),
  });

  const handleSaveChanges = () => {
    console.log('Profile updated', { name, dob, parent, academicYear, department, mobile, email });
  };

  const handleImagePick = () => {
    console.log('Select new profile image');
  };

  // Animation function for input border and label color
  const animateFocus = (field, isFocused) => {
    setFocusedField(isFocused ? field : null);

    // Trigger border animation with faster duration
    Animated.timing(borderAnimation[field], {
      toValue: isFocused ? 1 : 0,
      duration: 250,  // Faster animation (250ms instead of 400ms)
      useNativeDriver: false,
    }).start();

    // Trigger label color animation with faster duration
    Animated.timing(labelColorAnim[field], {
      toValue: isFocused ? 1 : 0,
      duration: 250,  // Faster animation (250ms instead of 400ms)
      useNativeDriver: false,
    }).start();
  };

  // Interpolate border width to simulate expansion from the middle
  const getBorderWidth = (field) => {
    return borderAnimation[field].interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });
  };

  // Interpolate label color for each input field
  const getLabelColor = (field) => {
    return labelColorAnim[field].interpolate({
      inputRange: [0, 1],
      outputRange: ['#999', '#E39424'],
    });
  };

  return (
    <><StatusBar backgroundColor={'#ffeaa7'} barStyle={'dark-content'}></StatusBar><ScrollView>
      <TouchableOpacity onPress={handleImagePick}>
        <View style={styles.profileImageContainer}>
          <Image
            source={profileImage ? { uri: profileImage } : require('../../assets/staticPictures/stdlogo.png')}
            style={styles.profileImage} 
            />
          {/* <View style={styles.editIconContainer}>
            <Icon name="pencil" size={24} color="#fff" />
          </View> */}
        </View>
      </TouchableOpacity>
      <View style={styles.container}>

        {/* Name Field */}
        <View style={styles.formGroup}>
          <Animated.Text style={[styles.label, { color: getLabelColor('name') }]}>Name</Animated.Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name} // Initial value of the input (no animation)
              onChangeText={setName}
              onFocus={() => animateFocus('name', true)}
              onBlur={() => animateFocus('name', false)} />
            <Animated.View
              style={[
                styles.borderLine,
                {
                  width: getBorderWidth('name'),
                  backgroundColor: '#E39424',
                  left: '50%', // Start from the middle
                  transform: [{ translateX: '-50%' }], // Move it back to center
                },
              ]} />
          </View>
        </View>

        {/* Date of Birth Field */}
        <View style={styles.formGroup}>
          <Animated.Text style={[styles.label, { color: getLabelColor('dob') }]}>Date of Birth</Animated.Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Date of Birth"
              value={dob} // Initial value of the input (no animation)
              onChangeText={setDob}
              onFocus={() => animateFocus('dob', true)}
              onBlur={() => animateFocus('dob', false)} />
            <Animated.View
              style={[
                styles.borderLine,
                {
                  width: getBorderWidth('dob'),
                  backgroundColor: '#E39424',
                  left: '50%', // Start from the middle
                  transform: [{ translateX: '-50%' }], // Move it back to center
                },
              ]} />
          </View>
        </View>

        {/* Son/Daughter Field */}
        <View style={styles.formGroup}>
          <Animated.Text style={[styles.label, { color: getLabelColor('parent') }]}>Son of / Daughter of</Animated.Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Son of / Daughter of"
              value={parent} // Initial value of the input (no animation)
              onChangeText={setParent}
              onFocus={() => animateFocus('parent', true)}
              onBlur={() => animateFocus('parent', false)} />
            <Animated.View
              style={[
                styles.borderLine,
                {
                  width: getBorderWidth('parent'),
                  backgroundColor: '#E39424',
                  left: '50%', // Start from the middle
                  transform: [{ translateX: '-50%' }], // Move it back to center
                },
              ]} />
          </View>
        </View>

        {/* Academic Year Field */}
        <View style={styles.formGroup}>
          <Animated.Text style={[styles.label, { color: getLabelColor('academicYear') }]}>Academic Year</Animated.Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Academic Year"
              value={academicYear} // Initial value of the input (no animation)
              onChangeText={setAcademicYear}
              onFocus={() => animateFocus('academicYear', true)}
              onBlur={() => animateFocus('academicYear', false)} />
            <Animated.View
              style={[
                styles.borderLine,
                {
                  width: getBorderWidth('academicYear'),
                  backgroundColor: '#E39424',
                  left: '50%', // Start from the middle
                  transform: [{ translateX: '-50%' }], // Move it back to center
                },
              ]} />
          </View>
        </View>

        {/* Department Field */}
        <View style={styles.formGroup}>
          <Animated.Text style={[styles.label, { color: getLabelColor('department') }]}>Department</Animated.Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Department"
              value={department} // Initial value of the input (no animation)
              onChangeText={setDepartment}
              onFocus={() => animateFocus('department', true)}
              onBlur={() => animateFocus('department', false)} />
            <Animated.View
              style={[
                styles.borderLine,
                {
                  width: getBorderWidth('department'),
                  backgroundColor: '#E39424',
                  left: '50%', // Start from the middle
                  transform: [{ translateX: '-50%' }], // Move it back to center
                },
              ]} />
          </View>
        </View>

        {/* Mobile Field */}
        <View style={styles.formGroup}>
          <Animated.Text style={[styles.label, { color: getLabelColor('mobile') }]}>Mobile No</Animated.Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Mobile No"
              value={mobile} // Initial value of the input (no animation)
              onChangeText={setMobile}
              keyboardType="phone-pad"
              onFocus={() => animateFocus('mobile', true)}
              onBlur={() => animateFocus('mobile', false)} />
            <Animated.View
              style={[
                styles.borderLine,
                {
                  width: getBorderWidth('mobile'),
                  backgroundColor: '#E39424',
                  left: '50%', // Start from the middle
                  transform: [{ translateX: '-50%' }], // Move it back to center
                },
              ]} />
          </View>
        </View>

        {/* Email Field */}
        <View style={styles.formGroup}>
          <Animated.Text style={[styles.label, { color: getLabelColor('email') }]}>Email</Animated.Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email} // Initial value of the input (no animation)
              onChangeText={setEmail}
              keyboardType="email-address"
              onFocus={() => animateFocus('email', true)}
              onBlur={() => animateFocus('email', false)} />
            <Animated.View
              style={[
                styles.borderLine,
                {
                  width: getBorderWidth('email'),
                  backgroundColor: '#E39424',
                  left: '50%', // Start from the middle
                  transform: [{ translateX: '-50%' }], // Move it back to center
                },
              ]} />
          </View>
        </View>
        <TouchableOpacity onPress={handleSaveChanges}>
          <Text style={styles.btn}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </ScrollView></>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  profileImageContainer: {
    alignItems: 'center',
    backgroundColor: '#ffeaa7',
    justifyContent:'center',
    marginBottom: '2%',
    padding: 5,
    height:(height*0.22),
    elevation: 3,
    
  },
  profileImage: {
    backgroundColor: 'white',
    width: (height*0.16),
    height: (height*0.16),
    borderRadius: (height*16),
  },
  formGroup: {
    marginBottom: 15,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    // marginBottom:'1%',
    paddingLeft: '3%',
    letterSpacing: 1.2
  },
  inputContainer: {
    marginBottom: '1%',
    width: '100%',
    position: 'relative',
  },
  input: {
    height: 40,
    fontSize: 16,
    backgroundColor: 'transparent',
    paddingLeft: 10,
    letterSpacing: 1.2,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5
  },
  borderLine: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    left: '50%',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#E39424',
    padding: 8,
    borderRadius: 50,
  },
  btn:{
    marginTop:'6%',
    marginBottom:'4%',
    color:'#E39424',
    fontWeight:'800',
    letterSpacing:1.2,
    textAlign:'center',
    fontSize:18
  }
});

export default EditProfile;
