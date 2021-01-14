/**
* @prop {propName} PropType
*/

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '../theme';

export default function SplashScreen(props) {

  return (
    <View style={styles.container}>
			<StatusBar translucent backgroundColor={colors.primaryDark}/>
			<Image style={{width: 200, height: 200}} source={require('../assets/images/logo-heart.png')} />
    </View>
  );
};

SplashScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {
		backgroundColor: colors.primary,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
