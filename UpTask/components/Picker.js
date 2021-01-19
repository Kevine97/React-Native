import {View} from 'native-base';
import React from 'react';
import {ActivityIndicator, Text, StyleSheet} from 'react-native';

const PickerLogin = () => {
  return (
    <>
      <View>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#ff6600" />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  texto: {
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default PickerLogin;
