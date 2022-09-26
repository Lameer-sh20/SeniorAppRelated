import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Page() {
  const [barcodeNum, setbarcodeNum] = useState('');
  const [storeId, setstoreId] = useState('');

  useEffect(() => {
    getData();
  });

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('Barcode');
      if (value !== null) {
        setbarcodeNum(value);
        setstoreId(JSON.stringify(1));
        console.warn('from page', typeof value);
      }
    } catch (e) {
      // error reading value
    }
  };
  const showAlert = () => {
    Alert.alert(barcodeNum, storeId);
  };

  const submitData = () => {
    console.warn('in submitt data');
    fetch('http://10.0.2.2:3000/product/FindProductByBarcode', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({barcodeNum, storeId}),
    })
      .then(response => response.json())
      .then(data => {
        console.log('respond is:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    console.warn('in submitt data2');
  };

  return (
    <View>
      {/** in onpress put showAlert to see barcode and store id, submitData to connect to backend */}
      <TouchableOpacity onPress={showAlert}>
        <Text style={styles.text}>click here</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Page;

const styles = StyleSheet.create({
  text: {
    color: '#212429',
    fontSize: 25,
    textAlign: 'center',
  },
});
