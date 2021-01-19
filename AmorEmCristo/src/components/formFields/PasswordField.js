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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../../theme';

export default class InputPassword extends Component {

  constructor(props) {
    super(props);

    this.state = {
      secureTextEntry: true
    }
  };

  fieldRef = React.createRef();

	onChange = (value) => {
		this.props.onChange(this.props.name, value);
	}

  onAccessoryPress = () => {
    this.setState({ secureTextEntry: !this.state.secureTextEntry });
  }

  renderHideIcon = () => {
    return (
        <Icon
          size={22}
          name='eye-off'
          color='white'
          onPress={this.onAccessoryPress}
          suppressHighlighting={true} />
      );
  }

  renderShowIcon = () => {
    return (
        <Icon
          size={22}
          name='eye'
          color={colors.primary}
          onPress={this.onAccessoryPress}
          suppressHighlighting={true} />
      );
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
				<OutlinedTextField
					name={this.props.name}
					label={this.props.label || 'Senha'}
					secureTextEntry={this.state.secureTextEntry}
					autoCapitalize='none'
					autoCorrect={false}
					enablesReturnKeyAutomatically={true}
					clearTextOnFocus={true}
					textColor='white'
					tintColor='white'
					baseColor='white'
					errorColor={colors.danger}
					onSubmitEditing={this.onSubmit}
					onChangeText={this.onChange}
					onBlur={this.onSubmit}
					renderRightAccessory={this.state.secureTextEntry ? this.renderHideIcon : this.renderShowIcon}
					error={this.props.errorText}
					ref={this.fieldRef} />
			</View>
    );
  };
};

InputPassword.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  errorText: PropTypes.string,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
}

const styles = StyleSheet.create({
  container: {
	},
});

InputPassword.propTypes = {};
