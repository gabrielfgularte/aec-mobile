/**
* @prop {propName} PropType
*/

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

export default function BottomTabRouter(props) {

  return (
    <View style={styles.container}>
      <Text>Hi BottomTabRouter</Text>
    </View>
  );
};

BottomTabRouter.propTypes = {};

const styles = StyleSheet.create({
  container: {},
});
