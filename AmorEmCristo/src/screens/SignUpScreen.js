/**
* @prop {propName} PropType
*/

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

export default function SignUpScreen(props) {

  return (
    <View style={styles.container}>
      <Text>Hi SignUpScreen</Text>
    </View>
  );
};

SignUpScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {},
});
