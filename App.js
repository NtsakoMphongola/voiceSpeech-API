import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Voice from '@react-native-community/voice';

const App = () => {

  const [isLoading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, [])

  const onSpeechStartHandler = (e) => {
    console.log("start handler==>>>", e)
  }

  const onSpeechEndHandler = (e) => {
    setLoading(false)
    console.log("stop handler", e)
  }

  const onSpeechResultsHandler = (e) => {
    let text = e.value[0]
    setResult(text)
    console.log("speech result handler", e)
  }

  const startRecording = async () => {
    setLoading(true)
    try {
      await Voice.start('en-Us')
    } catch (error) {
      console.log("error raised", error)
    }
  }

  const stopRecording = async () => {
    try {
      await Voice.stop()
    } catch (error) {
      console.log("error raised", error)
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.txtTitle}>Start working on your app!</Text>
        <View style={styles.txtInputStyle}>
          <TextInput value='' placeholder="your text" style={{ flex: 1 }}
            onChangeText={text => setResult(text)}
          />
           {isLoading ? <ActivityIndicator size="large" color="green" />

            : 

            <TouchableOpacity
              onPress={startRecording}
            >
              <Image
                source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png' }}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity> }
         
        </View>

        <TouchableOpacity style={{
          alignSelf: 'center',
          marginTop: 24,
          backgroundColor: 'red',
          padding: 8,
          borderRadius: 4
        }}
          onPress={stopRecording}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Stop</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: 'blue',
  },
  txtTitle: {
    alignSelf: 'center',
    marginVertical: 35,
    fontSize: 26,
    fontWeight: 'bold',
  },
  txtInputStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'red',
    height: 48,
    borderRadius: 20,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4
  }
});

export default App; 