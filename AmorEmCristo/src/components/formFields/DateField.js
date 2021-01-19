/**
* @prop {propName} PropType
*/

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

export default function DateField(props) {

  return (
    <View style={styles.container}>
      <Text>Hi DateField</Text>
    </View>
  );
};

DateField.propTypes = {};

const styles = StyleSheet.create({
  container: {},
});
