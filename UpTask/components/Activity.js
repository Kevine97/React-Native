import {View} from 'native-base';
import React from 'react';
import {ActivityIndicator, Text, StyleSheet} from 'react-native';
const Activity = () => {
  return (
    <>
      <View>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#ff6600" />
          <Text style={[styles.texto, {marginTop: 20}]}>
            REALIZANDO TAREA . . .{' '}
          </Text>
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

export default Activity;
