/**
* @prop {label} string
* @prop {error} string
* @prop {onChange} func
* @prop {contrastMode} bool
* @prop {helper} string
*/

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import InputField from './InputField';
import { colors } from '../../theme';

export default function DateField(props) {

	[currentSize, setCurrentSize] = useState(true);

	const formatText = (text) => {

    let textArr = Array.from(text);
    let newText = text;
    const isDeleting = text.length < currentSize;
    const hasFirstDash = text.indexOf('/') == 2;
    const hasSecondDash = text.lastIndexOf('/') == 5;

    if (!isDeleting) {
      if (!hasFirstDash && text.length == 3) {
        textArr.splice(2, 0, '/');
        newText = textArr.join('');
      }

      if (!hasSecondDash && text.length == 6) {
        textArr.splice(5, 0, '/');
        newText = textArr.join('');
      }
    }

		setCurrentSize(textArr.length);
    return newText;
  }

  return (
		<InputField
			contrastMode={props.contrastMode}
			style={props.style}
			label={props.label || 'Data de nascimento (dd/mm/aaaa)'}
			helper={props.helper}
			capitalize='none'
			keyboard='numeric'
			autoCorrect={false}
			onChangeText={props.onChange}
			formatText={formatText}
			error={props.error} />
  );
};

DateField.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  contrastMode: PropTypes.bool,
  style: PropTypes.object,
  helper: PropTypes.string,
};
