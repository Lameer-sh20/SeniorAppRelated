import React, {Component} from 'react';
import {TouchableOpacity, Image, Text, View, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ProductScanRNCamera extends Component {
  // saveBarcode = () => {
  //   try {
  //     const barcode = JSON.stringify({
  //       barcode: this.state.bar,
  //       storeId: this.state.store,
  //     });
  //     //await AsyncStorage.setItem('UserData', JSON.stringify(user));
  //     AsyncStorage.setItem('Barcode', barcode);
  //     //console.warn('account created successfully!');
  //     //this.props.navigation.navigate('Page');
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // };

  // createAlert = () => Alert.alert('data scaaned', this.state.bar);

  // async submitData() {
  //   console.log('hbguygy');
  //   try {
  //     await fetch('http://10.0.2.2:3000/product/FindProductByBarcode', {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         barcodeNum: '6164001011534',
  //         storeId: '2',
  //       }),
  //     })
  //       .then(response => response.json())
  //       .then(res => {
  //         console.log('jhfjgfjfffgjfjjaf');
  //         console.log(res);
  //       })
  //       .catch(error => {
  //         console.error('Error inside:', error);
  //       });
  //   } catch (e) {
  //     console.warn('Error all:', e);
  //   }
  // }

  // async getData() {
  //   console.log('getdata');
  //   try {
  //     const value = await AsyncStorage.getItem('Barcode');
  //     if (value !== null) {
  //       console.warn('data from storage', value);
  //     }
  //   } catch (e) {
  //     console.warn(e);
  //   }
  // }

  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];
    //this.par = '';

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
      },
      // bar: null,
      // store: null,
      // data: '',

      // barcode: {
      //   barcodeNum: 6009188002213,
      //   storeId: 2,
      // },
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
        console.log('saved');
        console.log('barcode is', scanResult.data);
        AsyncStorage.setItem('Barcode', scanResult.data);
        //this.setState({bar: scanResult.data});
        //this.setState({store: 1});
        //this.saveBarcode();
        this.props.navigation.navigate('Page');
        //console.log('jhfjaf');
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
    const {num} = this.props;
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
          style={styles.preview}
          type={this.state.camera.type}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          {/* <TouchableOpacity onPress={this.saveBarcode}>
            <Image
              source={require('../assets/Images/back-icon.png')}
              style={styles.image}
            />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={'...'}>
            <Image
              source={require('../assets/Images/back-icon.png')}
              style={styles.image}
            />
            <Text>saved is{num}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          {/* <TouchableOpacity onPress={this.saveBarcode}>
            <Image
              source={require('../assets/Images/back-icon.png')}
              style={styles.image}
            />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={this.getData}>
            <Text>snap</Text>
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
