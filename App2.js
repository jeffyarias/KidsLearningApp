import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import Tts from 'react-native-tts';
import SignatureCanvas from 'react-native-signature-canvas';

const App = () => {
  useEffect(() => {
    Tts.getInitStatus()
      .then(() => {
        Tts.setDefaultLanguage('en-US');
        Tts.setDefaultRate(0.5, true);   // Avoid BOOL error on iOS
        Tts.setDefaultPitch(1.2);
      })
      .catch(err => {
        console.log('TTS initialization error:', err);
      });
  }, []);

  const speakWord = () => {
    Tts.speak("Apple");
  };

  const handleSignature = (signature) => {
    console.log("🖋️ Signature:", signature);
    // Here you can save or process the base64-encoded signature
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧠 Kids Learning App</Text>

      <Button title="🔊 Speak Word" onPress={speakWord} />

      <View style={styles.canvasContainer}>
        <SignatureCanvas
          onOK={handleSignature}
          descriptionText="✍️ Write here"
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
    marginTop: 30,
  },
});

export default App;
