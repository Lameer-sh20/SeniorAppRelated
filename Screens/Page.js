import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  Button,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const Page = () => {
  const [barcode, setBarcode] = useState('');

  useEffect(() => {
    getData();
  });

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('Barcode');
      if (value !== null) {
        setBarcode(value.barcode);
        console.warn(value.barcode);
      }
    } catch (e) {
      // error reading value
    }
  };
  return (
    <View>
      <Text style={styles.text}>
        this should appear after scanning once{barcode}
      </Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  text: {
    color: '#212429',
    fontSize: 16,
  },
});
