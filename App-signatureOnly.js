import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';

const App = () => {
  const handleOK = signature => {
    console.log("Signature received: ", signature);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✍️ Sign Below</Text>
      <View style={styles.canvasContainer}>
        <SignatureCanvas
          onOK={handleOK}
          descriptionText="Sign here"
          clearText="Clear"
          confirmText="Save"
          webStyle={canvasWebStyle}
        />
      </View>
    </View>
  );
};

const canvasWebStyle = `
  .m-signature-pad {
    box-shadow: none;
    border: none;
    margin: 0;
  }
  .m-signature-pad--body {
    border: 2px dashed #ccc;
  }
  .m-signature-pad--footer {
    display: flex;
    justify-content: space-between;
  }
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  canvasContainer: {
    width: Dimensions.get('window').width * 0.9,
    height: 300,
    borderColor: '#aaa',
    borderWidth: 1,
    backgroundColor: '#fefefe',
  },
});

export default App;
