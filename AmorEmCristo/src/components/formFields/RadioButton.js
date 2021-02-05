/**
* @prop {label} string
* @prop {selected} bool
* @prop {onPress} func
* @prop {contrastMode} bool
*/

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '../../theme';

export default function RadioButton(props) {

	const colorStyle = () => {
		if (props.contrastMode) return 'white';
		if (props.selected) return colors.primary;
		return '#666666';
	}

  return (
		<Pressable style={[styles.container, props.style]} onPress={props.onPress}>

			<View style={[styles.option, {borderColor: colorStyle()}]}>
				<View style={props.selected ? styles.check : null}></View>
			</View>

			<Text style={[styles.label, {color: colorStyle()}]}>{props.label}</Text>
		</Pressable>
  );
};

RadioButton.propTypes = {
	label: PropTypes.string,
  onPress: PropTypes.func,
  contrastMode: PropTypes.bool,
  selected: PropTypes.bool,
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row'
	},

	option: {
		width: 16,
		height: 16,
		borderRadius: 100,
		borderWidth: 1.5,
		padding: 2.3,
		top: 1.5
	},

	label: {
		fontSize: 13,
		marginLeft: 5,
	},

	check: {
		backgroundColor: colors.primary,
		borderRadius: 100,
		width: '100%',
		height: '100%'
	}

});
