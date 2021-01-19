/**
* @prop {style} object
* @prop {onPress} func
* @prop {disabled} boolean
*/


import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types';

import Ripple from 'react-native-material-ripple';
import { colors } from '../../theme';

export default function OutlinedButton(props) {

	return (
		<Ripple style={props.style} onPress={props.onPress}>

			<View style={[styles.container, props.disabled ? styles.disabledContainer : null]}>
				<Text style={[styles.text, props.disabled ? styles.disabledText : null]}>
					{props.children}
				</Text>
			</View>

		</Ripple>
	);
};

OutlinedButton.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.object,
  disabled: PropTypes.bool,
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'transparent',
		paddingHorizontal: 30,
		paddingVertical: 10,
		borderRadius: 2,
		borderWidth: 1,
		borderColor: 'white',
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
		backgroundColor: colors.disabledBackground
	},

	disabledText: {
		color: colors.disabledForeground
	}
});
