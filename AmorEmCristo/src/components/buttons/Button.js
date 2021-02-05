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

import Ripple from 'react-native-material-ripple';
import { colors } from '../../theme';

export default function Button(props) {

	return (
		<Ripple disabled={props.disabled} style={props.style} onPress={props.onPress}>

			<View style={[styles.container, props.disabled ? styles.disabledContainer : null]}>
				<Text style={[styles.text, props.disabled ? styles.disabledText : null]}>
					{props.children}
				</Text>
			</View>

		</Ripple>
	);
};

Button.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.object,
  disabled: PropTypes.bool,
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.primary,
		paddingHorizontal: 30,
		paddingVertical: 10,
		borderRadius: 2,
		alignItems: 'center',
		justifyContent: 'center'
	},

	text: {
		color: 'white',
		fontWeight: 'bold',
		textTransform: 'uppercase',
		letterSpacing: .7
	},

	disabledContainer: {
		backgroundColor: colors.primaryDisabled
	},

	disabledText: {
		color: colors.disabled
	}
});
