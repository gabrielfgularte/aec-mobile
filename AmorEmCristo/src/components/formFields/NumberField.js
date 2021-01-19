/**
* @prop {propName} PropType
*/

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

export default function NumberField(props) {

  return (
    <View style={styles.container}>
      <Text>Hi NumberField</Text>
    </View>
  );
};

NumberField.propTypes = {};

const styles = StyleSheet.create({
  container: {},
});
