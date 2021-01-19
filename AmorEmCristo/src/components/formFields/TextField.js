/**
* @prop {label} string
* @prop {errorText} string
* @prop {formatText} func
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OutlinedTextField } from 'react-native-material-textfield';

import { colors } from '../../theme';

export default class TextField extends Component {

  constructor(props) {
    super(props);
  };

  fieldRef = React.createRef();

  render() {
    return (
      <OutlinedTextField
        label={this.props.label}
        keyboardType='default'
        textColor='white'
        tintColor='white'
        baseColor='white'
        errorColor={colors.danger}
        formatText={this.props.formatText}
        error={this.props.errorText}
        ref={this.fieldRef} />
    );
  };
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  errorText: PropTypes.string,
  formatText: PropTypes.func,
}
