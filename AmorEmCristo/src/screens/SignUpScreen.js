import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Keyboard } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { UserModel } from '../models';
import UserContext from '../contexts/UserContext';
import { UserAPIService } from '../services';
import { Alert, BackdropLoading } from '../components';
import Validator from '../utils/Validator';
import { Button } from '../components/buttons';
import {
	TextField,
	EmailField,
	PasswordField,
	DateField,
	RadioField,
	DropDownField,
} from '../components/formFields';
import { states } from '../assets/values';
import { colors } from '../theme';

export default function SignUpScreen(props) {

	const { user, updateUser } = useContext(UserContext);
	const [isFetching, setIsFetching] = useState(false);
	const [responseError, setResponseError] = useState(null);
	const [responseErrorMsg, setResponseErrorMsg] = useState('');
	const [form, setForm] = useState({
		fields: {
			email: '',
			password: '',
			birthdate: '',
			state: '',
			username: '',
			gender: ''
		},
		errors: null
	});

	useEffect(() => {
		formatErrorMsg();
	}, [responseError])

	const formatBirthdate = () => {
		let birthdate = form.fields.birthdate;
		if (birthdate) {
			let birthdateArr = birthdate.split('/');
			return `${birthdateArr[2]}-${birthdateArr[1]}-${birthdateArr[0]}`
		}

		return null;
	}

	const onFieldChange = (fieldName, value) => {

		if (fieldName === 'email')
			setForm({...form, fields: {...form.fields, email: value}});

		else if (fieldName === 'password')
			setForm({...form, fields: {...form.fields, password: value}});

		else if (fieldName === 'birthdate')
			setForm({...form, fields: {...form.fields, birthdate: value}});

		else if (fieldName === 'username')
			setForm({...form, fields: {...form.fields, username: value}});

		else if (fieldName === 'state')
			setForm({...form, fields: {...form.fields, state: value}});

		else if (fieldName === 'gender')
			setForm({...form, fields: {...form.fields, gender: value}});
	}

	const isValid = () => {
		emailValidator = new Validator(form.fields.email);
		passwordValidator = new Validator(form.fields.password);
		birthdateValidator = new Validator(form.fields.birthdate);
		usernameValidator = new Validator(form.fields.username);
		stateValidator = new Validator(form.fields.state);
		genderValidator = new Validator(form.fields.gender);

		return (
			emailValidator.isNotEmpty()
			&& emailValidator.emailValid()
			&& passwordValidator.isNotEmpty()
			&& birthdateValidator.isNotEmpty()
			&& usernameValidator.isNotEmpty()
			&& stateValidator.isNotEmpty()
			&& genderValidator.isNotEmpty()
			&& form.errors == null);
	}

	const handleFormSubmit = async() => {

		Keyboard.dismiss();
		setIsFetching(true);

		let authUser;
		const payload = {...form.fields, device: 'android', device_token: 'teste', birthdate: formatBirthdate()};
		console.log('payload', payload);

		try {
			const response = await UserAPIService.signUp(payload);
			console.log(response);
			authUser = new UserModel(response);
			authUser.save();
		} catch (e) {
			setResponseError(e);
		} finally {
			setIsFetching(false);
			if (authUser) updateUser(authUser.data);
		}

	}

	const handleModalDismiss = () => {
		setResponseError(null);
	}

	const formatErrorMsg = () => {
		if (responseError) {

			let body = '';

			for (let i = 0; i < responseError.length; i++) {
				for (let obj in responseError[i]) {
					body += `- ${responseError[i][obj]}\n`
				}
			}
			setResponseErrorMsg(body.replace(/^\s*[\r\n]/gm, ''))

		}
	}

  return (
    <View style={styles.container}>

			<Alert
				visible={responseError !== null}
				title='Não foi possível criar seu perfil'
				body={responseErrorMsg}
				dismissText='Ok'
				onDismiss={handleModalDismiss} />

			<BackdropLoading visible={isFetching} />

			<KeyboardAwareScrollView enableOnAndroid={true}>

			<Text style={styles.sectionTitle}>Dados básicos</Text>
			<Text style={styles.sectionSubtitle}>Precisamos de algumas informações básicas para criar sua conta. Esse primeiro passo é obrigatório.</Text>

			<View style={{backgroundColor: 'rgba(0, 0, 0, .2)', height: 1, marginVertical: 14}}></View>

			<RadioField
				label='Você é:'
				options={[{label: 'Homem', value: '1' }, {label: 'Mulher', value: '2' }]}
				onChange={(value) => {onFieldChange('gender', value)}} />

			<View style={{backgroundColor: 'rgba(0, 0, 0, .2)', height: 1, marginVertical: 14}}></View>

			<DateField
				label='Data de Nascimento (dd/mm/aaaa)'
				onChange={(value) => {onFieldChange('birthdate', value)}}
				helper='Exemplo: 21/12/1989.' />

			<DropDownField
				options={['Escolha o estado em que vive', ...states]}
				onChange={(value) => {onFieldChange('state', value)}}
				helper='Escolha o estado no qual que você mora atualmente.'
				style={{marginTop: 10}} />

			<TextField
				style={{marginTop: 10}}
				label='Apelido'
				onChange={(value) => {onFieldChange('username', value)}}
				helper='Escolha um apelido bacana, ele vai aparecer para todos os outros usuários.' />

			<EmailField
				onChange={(value) => {onFieldChange('email', value)}}
				style={{marginTop: 10}}
				helper='Informe um endereço de email que você use com frequência. Fique tranquilo, nós nunca vamos compartilhar seu email com ninguém.' />

			<PasswordField
				onChange={(value) => {onFieldChange('password', value)}}
				helper='Escolha uma senha que seja difícil para outros descobrirem, mas fácil para você lembrar.'
				style={{marginTop: 10}} />

			<Button onPress={handleFormSubmit} style={{marginTop: 10}} disabled={!isValid()}>Criar meu perfil</Button>

			</KeyboardAwareScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
		backgroundColor: 'white',
		paddingVertical: 10,
		paddingHorizontal: 20,
		flex: 1
	},

	sectionTitle: {
		fontSize: 20,
		color: colors.primary
	},

	sectionSubtitle: {
		color: '#999999',
		fontSize: 13
	}
});
