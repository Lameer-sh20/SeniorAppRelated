import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Alert, Button} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
function Location() {
  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setPosition(JSON.stringify(pos));
        console.log('latitude ' + JSON.stringify(pos['coords']['latitude']));
        console.log('longitude ' + JSON.stringify(pos['coords']['longitude']));
        // console.log(JSON.stringify({ "Location_Latitude": pos["coords"]["latitude"], "Location_Longitude": pos["coords"]["longitude"] }),)
        fetch('http://10.0.2.2:3000/store/address', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Location_Latitude: pos.coords.latitude,
            Location_Longitude: pos.coords.longitude,
          }),
        })
          .then(async res => {
            try {
              const jsonRes = await res.json();
              if (!jsonRes.status) {
                console.log(jsonRes.status);
                console.log(jsonRes);
              } else {
                console.log(jsonRes.status);
                console.log(jsonRes.Address);
              }
            } catch (err) {
              console.log(err);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      {timeout: 2000, maximumAge: 3600000},
    );
  };

  const [position, setPosition] = useState('');

  return (
    <View>
      <Text>
        <Text style={styles.title}>Current position: </Text>
        {position}
      </Text>
      <Button title="Get Current Position" onPress={getCurrentPosition} />
    </View>
  );
}

export default Location;

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
    color: 'black',
  },
});
