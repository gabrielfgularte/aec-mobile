/**
* @prop {name} string <required>
* @prop {label} string
* @prop {errorText} string
* @prop {onSubmit} func
* @prop {onChange} func
*/

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { OutlinedTextField } from 'react-native-material-textfield';

import { colors } from '../../theme';

export default class InputEmail extends Component {

  constructor(props) {
    super(props);
  };

  fieldRef = React.createRef();

	onChange = (value) => {
		this.props.onChange(this.props.name, value);
	}

  render() {
    return (
      <OutlinedTextField
				name={this.props.name}
				label={this.props.label || 'E-mail'}
        keyboardType='email-address'
        autoCapitalize='none'
        autoCorrect={false}
        enablesReturnKeyAutomatically={true}
        onChangeText={this.onChange}
        textColor='white'
        tintColor='white'
        baseColor='white'
        errorColor={colors.danger}
        error={this.props.errorText}
        onBlur={this.onSubmit}
        onSubmitEditing={this.onSubmit}
        ref={this.fieldRef} />
    );
  };
};

InputEmail.propTypes = {
  name: PropTypes.string.required,
  label: PropTypes.string,
  errorText: PropTypes.string,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
}

const styles = StyleSheet.create({
  container: {},
});

InputEmail.propTypes = {};
