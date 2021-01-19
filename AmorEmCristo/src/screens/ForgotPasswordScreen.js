/**
* @prop {propName} PropType
*/

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

export default function ForgotPasswordScreen(props) {

  return (
    <View style={styles.container}>
      <Text>Hi ForgotPasswordScreen</Text>
    </View>
  );
};

ForgotPasswordScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {},
});
