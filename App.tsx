import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Slider from './Slider';

const App = () => (
  <Slider
    slides={[
      <View
        key={1}
        style={[
          styles.slide,
          {
            backgroundColor: '#92C9DF',
          },
        ]}>
        <Text style={styles.text}>Hello Swiper</Text>
      </View>,
      <View
        key={2}
        style={[
          styles.slide,
          {
            backgroundColor: '#8DBCD5',
          },
        ]}>
        <Text style={styles.text}>Beautiful</Text>
      </View>,
      <View
        key={3}
        style={[
          styles.slide,
          {
            backgroundColor: '#8EC5F5',
          },
        ]}>
        <Text style={styles.text}>And Simple</Text>
      </View>,
    ]}
  />
);

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  slide: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
