/**
* @prop {propName} PropType
*/

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

export default function HomeScreen(props) {

  return (
    <View style={styles.container}>
      <Text>Hi HomeScreen</Text>
    </View>
  );
};

HomeScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {},
});
