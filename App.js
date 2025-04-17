import React, { useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Alert } from 'react-native';
import Tts from 'react-native-tts';
import SignatureCanvas from 'react-native-signature-canvas';
import SilentSwitch from 'react-native-silent-switch'; // 👈 Add this

const App = () => {
  const ref = useRef();

  useEffect(() => {
    Tts.getInitStatus().then(() => {
      Tts.setDefaultLanguage('en-US');
      Tts.setDefaultRate(0.5, true);
      Tts.setDefaultPitch(1.2);
    }).catch(err => {
      console.log('TTS initialization error:', err);
    });
  }, []);

  const speakWord = () => {
    SilentSwitch.isSilent()
      .then((isSilent) => {
        if (isSilent) {
          Alert.alert("Silent Mode", "🔇 Your phone is in silent mode. Turn it off to hear audio.");
        } else {
          Tts.speak("Michael silly goose");
        }
      })
      .catch(err => {
        console.warn('Error checking silent mode:', err);
        Tts.speak("Michael silly goose");
      });
  };

  const clearCanvas = () => {
    ref.current?.clearSignature();
  };

  const handleOK = (signature) => {
    console.log("Signature received:", signature);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧠 Kids Learning App</Text>
      <Button title="Speak Word" onPress={speakWord} />
      <View style={styles.canvasContainer}>
        <SignatureCanvas
          ref={ref}
          onOK={handleOK}
          descriptionText="Write here"
          clearText="Clear"
          confirmText="Save"
          webStyle={canvasWebStyle}
        />
      </View>
      <Button title="Clear Canvas" onPress={clearCanvas} />
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
    display: none;
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
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  canvasContainer: {
    width: Dimensions.get('window').width * 0.9,
    height: 300,
    borderColor: '#aaa',
    borderWidth: 1,
    backgroundColor: '#fefefe',
    marginVertical: 20,
  },
});

export default App;
