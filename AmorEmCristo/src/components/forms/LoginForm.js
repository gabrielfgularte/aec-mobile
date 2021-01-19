import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

import Validator from '../../utils/Validator';
import { Button, LinkButton, OutlinedButton } from '../buttons';
import {
	EmailField,
	PasswordField
} from '../formFields';

export default function LoginForm(props) {

	const [form, setForm] = useState({
		fields: {
			email: null,
			password: null
		},
		errors: null
	});

	const onFieldChange = (fieldName, value) => {
		if (fieldName === 'email')
			setForm({...form, fields: {...form.fields, email: value}});

		else if (fieldName === 'password')
			setForm({...form, fields: {...form.fields, password: value}});
	}

	const isValid = () => {
		emailValidator = new Validator(form.fields.email);
		passwordValidator = new Validator(form.fields.password);

		return (
			emailValidator.isNotEmpty()
			&& emailValidator.emailValid()
			&& passwordValidator.isNotEmpty()
			&& form.errors == null);
	}

	const handleSubmit = () => {
		props.handleSubmit(form.fields);
	}

  return (
		<View style={[styles.container, props.style]}>

			<View style={{paddingHorizontal: 30}}>
				<EmailField name='email' onChange={onFieldChange} />
				<PasswordField name='password' onChange={onFieldChange} style={{marginTop: 5}} />
				<Button onPress={handleSubmit} style={{marginTop: 10}} disabled={!isValid()}>Entrar</Button>
				<LinkButton>Esqueceu sua senha?</LinkButton>
			</View>

			{/* TODO: Depoimentos em carrossel? */}

			<View>
				<View style={{backgroundColor: 'rgba(255, 255, 255, .2)', height: 1}}></View>
				<View style={{paddingHorizontal: 30, paddingVertical: 14}}>
					<Text style={{color: 'white', alignSelf: 'center'}}>Não tem uma conta?</Text>
					<OutlinedButton style={{marginTop: 10}}>Crie seu perfil grátis</OutlinedButton>
				</View>
			</View>
	  </View>
  );
};

LoginForm.propTypes = {};

const styles = StyleSheet.create({
  container: {
		flex: 1,
		justifyContent: 'space-between',
	}
});
