/**
* @prop {label} string
* @prop {error} string
* @prop {onSubmit} func
* @prop {onChange} func
* @prop {contrastMode} bool
* @prop {helper} string
*/

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { OutlinedTextField } from 'react-native-material-textfield';

import { colors } from '../../theme';

export default class InputField extends Component {

  constructor(props) {
    super(props);
  };

	fieldRef = React.createRef();

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
				<OutlinedTextField
					label={this.props.label}
					title={this.props.helper}
					keyboardType={this.props.keyboard}
					autoCapitalize={this.props.capitalize}
					secureTextEntry={this.props.secureTextEntry}
					autoCorrect={this.props.autoCorrect}
					enablesReturnKeyAutomatically={true}
					onChangeText={this.props.onChangeText}
					textColor={this.props.contrastMode ? 'white' : colors.primary}
					tintColor={this.props.contrastMode ? 'white' : colors.primary}
					baseColor={this.props.contrastMode ? 'white' : '#666666'}
					errorColor={colors.danger}
					error={this.props.error}
					formatText={this.props.formatText}
					renderRightAccessory={this.props.icon}
					ref={this.fieldRef} />
      </View>
    );
  };
};

InputField.propTypes = {
	style: PropTypes.object,
  label: PropTypes.string,
	helper: PropTypes.string,
	keyboard: PropTypes.string,
	capitalize: PropTypes.string,
	autoCorrect: PropTypes.bool,
  error: PropTypes.string,
	contrastMode: PropTypes.bool,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
	formatText: PropTypes.func,
	icon: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
};

const styles = StyleSheet.create({
  container: {}
});
