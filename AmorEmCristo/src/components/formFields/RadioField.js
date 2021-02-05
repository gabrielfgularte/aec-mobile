/**
* @prop {label} string
* @prop {errorText} string
* @prop {onSubmit} func
* @prop {onChange} func
* @prop {contrastMode} bool
* @prop {options} array
*/

import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
import PropTypes from 'prop-types';

import RadioButton from './RadioButton';
import { colors } from '../../theme';

export default class RadioField extends Component {

  constructor(props) {
    super(props);
		this.state = {selectedIndex: null}
  };

	onChange = (index, value) => {
		this.setState({selectedIndex: index});
		this.props.onChange(value);
	}

	optionColorStyle = (index) => {
		if (this.props.contrastMode) return 'white';
		if (this.state.selectedIndex === index) return colors.primary;
		return '#666666';
	}

	render() {
    return (
			<View style={styles.container}>

				<Text style={{color: '#666666'}}>{this.props.label}</Text>
				<View style={{marginLeft: 10, flexDirection: 'row'}}>
					{
						this.props.options.map((option, index) => {
							return (
								<RadioButton
									key={index}
									style={{marginHorizontal: 10}}
									onPress={() => this.onChange(index, option.value)}
									label={option.label}
									index={index}
									selected={this.state.selectedIndex === index} />
							)
						})
					}
				</View>

			</View>
    );
  };
};

RadioField.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  contrastMode: PropTypes.bool,
  options: PropTypes.array,
}

const styles = StyleSheet.create({
  container: {
		flexDirection: 'row'
	},
});
