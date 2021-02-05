/**
* @prop {label} string
* @prop {error} string
* @prop {onChange} func
* @prop {contrastMode} bool
* @prop {helper} string
*/

import React from 'react';
import PropTypes from 'prop-types';

import InputField from './InputField';
import { colors } from '../../theme';

export default function EmailField(props) {

  return (
		<InputField
			contrastMode={props.contrastMode}
			style={props.style}
			label={props.label || 'E-mail'}
			helper={props.helper}
			keyboard='email-address'
			capitalize='none'
			autoCorrect={false}
			onChangeText={props.onChange}
			error={props.error} />
  );
};

EmailField.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  contrastMode: PropTypes.bool,
  helper: PropTypes.string,
};
