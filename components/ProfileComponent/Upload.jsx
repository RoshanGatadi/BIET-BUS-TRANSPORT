import React, { useState } from 'react';
import { View, Button, Image, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User canceled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setImage(response.assets[0]);
      }
    });
  };

  const uploadImage = async () => {
    if (!image) {
      alert('Please select an image first!');
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });
    formData.append('Name',"Roshan")
    try {
      const response = await axios.post('http://192.168.29.125:8005/registerbus', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponseMessage(response.data.message);
    } catch (error) {
      console.error('Error uploading image: ', error);
      setResponseMessage('Failed to upload image');
    }
  };

  return (
    <View>
      <Button title="Select Image" onPress={selectImage} />
      {image && <Image source={{ uri: image.uri }} style={{ width: 100, height: 100 }} />}
      <Button title="Upload Image" onPress={uploadImage} />
      {responseMessage && <Text>{responseMessage}</Text>}
    </View>
  );
};

export default ImageUpload;
