import React, {Component} from 'react';
import {TouchableOpacity, Image, Text, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ProductScanRNCamera extends Component {
  async saveBarcode({text}) {
    try {
      const barcode = JSON.stringify({
        barcode: text,
      });
      //await AsyncStorage.setItem('UserData', JSON.stringify(user));
      await AsyncStorage.setItem('Barcode', barcode);
      //console.warn('account created successfully!');
      //navigation.navigate('VerficationPage');
    } catch (error) {
      console.warn(error);
    }
  }

  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
      },
    };
  }
  //http://localhost:3000/product/FindProductByBarcode
  async onBarCodeRead(scanResult) {
    console.warn(scanResult.type);
    console.warn(scanResult.data);
    if (
      scanResult.data != null &&
      !this.barcodeCodes.includes(scanResult.data)
    ) {
      this.barcodeCodes.push(scanResult.data);
      console.warn('onBarCodeRead call');
      console.log('lenght is', this.barcodeCodes.length);
      if (this.barcodeCodes.length == 1) {
        //this.saveBarcode(1234);
        console.log('saved');
        //console.log('dfhdhdh');
        //this.props.navigation.navigate('Page');
        await fetch('http://10.0.2.2:3000/product/FindProductByBarcode', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            barcodeNum: 6009188002213,
            storeId: 2,
          }),
        })
          .then(response => response.json())
          .then(res => {
            console.log('jhfjgfjfffgjfjjaf');
            console.log(res);
          })
          .catch(error => {
            console.error('Error:', error);
          });
        // fetch('http://localhost:3000/product/FindProductByBarcode', {
        //   method: 'POST', // or 'PUT'
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({barcodeNum: 6009188002213, storeId: 2}),
        // })
        //   .then(data => {
        //     console.log('dfdhdfhdf');
        //     console.log('respond is:', data);
        //   })
        //   .catch(error => {
        //     console.error('Error:', error);
        //   });
        //Alert.alert('Make login');
        console.log('jhfjaf');
      }
    }
    return;
  }

  async takePicture() {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  }

  pendingView() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightgreen',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Waiting</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          defaultTouchToFocus
          flashMode={this.state.camera.flashMode}
          mirrorImage={false}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={
            'We need your permission to use your camera phone'
          }
          style={styles.preview}
          type={this.state.camera.type}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Page')}>
            <Image
              source={require('../assets/Images/back-icon.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 21,
    height: 26.7,
  },
};

export default ProductScanRNCamera;
