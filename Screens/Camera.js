import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

class Home extends Component {
  state = {
    barcodes: [],
  };

  barcodeRecognized = ({barcodes}) => {
    barcodes.forEach(barcode => console.log(barcode.data));
    this.setState({barcodes});
  };

  renderBarcodes = () => (
    <View>{this.state.barcodes.map(this.renderBarcode)}</View>
  );

  renderBarcode = ({data}) => {
    // Alert.alert(
    //   'Scanned Data',
    //   data,
    //   [
    //     {
    //       text: 'Okay',
    //       onPress: () => console.log('Okay Pressed'),
    //       style: 'cancel',
    //     },
    //   ],
    //   {cancelable: false},
    // );
    console.log('barcode is', data);
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.scanner}
          onGoogleVisionBarcodesDetected={this.barcodeRecognized}>
          {this.renderBarcodes}
        </RNCamera>
        <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity onPress={'...'}>
            <Image
              source={require('../assets/Images/back-icon.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <TouchableOpacity>
            <Text>anything</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  scanner: {
    flex: 6,
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
    //justifyContent: 'space-between',
    //alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 21,
    height: 26.7,
  },
});
