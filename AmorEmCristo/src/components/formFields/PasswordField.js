/**
* @prop {label} string
* @prop {error} string
* @prop {onChange} func
* @prop {contrastMode} bool
* @prop {helper} string
*/

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import InputField from './InputField';
import { colors } from '../../theme';

export default function PasswordField(props) {

	[secureTextEntry, setSecureTextEntry] = useState(true);

	const onAccessoryPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

	const renderHideIcon = () => {
    return (
        <Icon
          size={22}
          name='eye-off'
          color={props.contrastMode ? 'white' : '#666666'}
          onPress={onAccessoryPress}
          suppressHighlighting={true} />
      );
  };

	const renderShowIcon = () => {
    return (
        <Icon
          size={22}
          name='eye'
          color={colors.primary}
          onPress={onAccessoryPress}
          suppressHighlighting={true} />
      );
  };

  return (
		<InputField
			contrastMode={props.contrastMode}
			secureTextEntry={secureTextEntry}
			style={props.style}
			label={props.label || 'Senha'}
			helper={props.helper}
			capitalize='none'
			autoCorrect={false}
			onChangeText={props.onChange}
			error={props.error}
			icon={secureTextEntry ? renderHideIcon : renderShowIcon} />
  );
};

PasswordField.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  contrastMode: PropTypes.bool,
  style: PropTypes.object,
  helper: PropTypes.string,
};
