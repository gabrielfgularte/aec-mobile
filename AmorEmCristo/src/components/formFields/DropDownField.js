/**
* @prop {label} string
* @prop {errorText} string
* @prop {onSubmit} func
* @prop {onChange} func
* @prop {contrastMode} bool
* @prop {helper} string
* @prop {options} array
*/

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { Picker } from '@react-native-picker/picker';

import { colors } from '../../theme';

export default class DropDownField extends Component {

  constructor(props) {
    super(props);
		this.state = {selected: null}
  };

	onChange = (value, index) => {
		this.setState({selected: value});
		this.props.onChange(value);
	}

  render() {
    return (
			<View style={this.props.style}>
				<View style={styles.container}>
					<Picker
						style={[styles.dropdown, {color: this.state.selected !== null ?colors.primary : '#666666'}]}
						selectedValue={this.state.selected}
						onValueChange={this.onChange}
						itemStyle={{color: '#666666'}}>

						{
							this.props.options.map((item, index) => {
								if (index === 0) return (<Picker.Item label={item} value={null} key={index} />)
								return (
									<Picker.Item label={item} value={item} key={index} />
								)
							})
						}

					</Picker>
				</View>
				<Text style={styles.helper}>{this.props.helper}</Text>
			</View>
    );
  };
};

DropDownField.propTypes = {
  label: PropTypes.string,
  errorText: PropTypes.string,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  contrastMode: PropTypes.bool,
  helper: PropTypes.string,
  options: PropTypes.array,
};

const styles = StyleSheet.create({
  container: {
		borderWidth: 1,
		borderColor: '#666666',
		borderRadius: 4,
		paddingLeft: 4
	},

	helper: {
		color: '#666666',
		fontSize: 12,
		marginHorizontal: 12,
		marginTop: 2,
		marginBottom: 2
	},
});
