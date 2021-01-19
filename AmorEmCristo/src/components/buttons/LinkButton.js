/**
* @prop {style} object
* @prop {onPress} func
* @prop {disabled} boolean
*/


import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '../../theme';

export default function LinkButton(props) {

	return (
		<View style={styles.container}>
			<Text style={[styles.text, props.disabled ? styles.disabledText : null]}>
				{props.children}
			</Text>
		</View>
	);
};

LinkButton.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.object,
  disabled: PropTypes.bool,
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'transparent',
		paddingHorizontal: 30,
		paddingVertical: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},

	text: {
		color: 'white',
		borderBottomWidth: 1,
		borderBottomColor: 'white'
	},

	disabledText: {
		color: 'rgba(255, 255, 255, .5)'
	}
});
