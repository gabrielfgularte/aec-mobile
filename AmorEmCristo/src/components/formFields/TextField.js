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

export default function TextField(props) {

  return (
		<InputField
			contrastMode={props.contrastMode}
			style={props.style}
			label={props.label}
			helper={props.helper}
			capitalize='none'
			autoCorrect={false}
			onChangeText={props.onChange}
			error={props.error} />
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  contrastMode: PropTypes.bool,
  helper: PropTypes.string,
};
