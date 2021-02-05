import React, { useState, useContext, useEffect } from 'react';
import { Dimensions, StyleSheet, Keyboard, View, Text, Image } from 'react-native';

import AutoHeightImage from 'react-native-auto-height-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { UserModel } from '../models';
import Validator from '../utils/Validator';
import UserContext from '../contexts/UserContext';
import { UserAPIService } from '../services';
import { Alert, BackdropLoading } from '../components';
import { Button, LinkButton, OutlinedButton } from '../components/buttons';
import { EmailField, PasswordField } from '../components/formFields';

import { env } from '../config';

export default function LoginScreen({ navigation }) {

	const { user, updateUser } = useContext(UserContext);
	const [isFetching, setIsFetching] = useState(false);
	const [responseError, setResponseError] = useState(null);
	const [authUser, setAuthUser] = useState(null);
	const [form, setForm] = useState({
		fields: {
			email: null,
			password: null
		},
		errors: null
	});

	const logoWidth = Dimensions.get('window').width - 120;

	const onFieldChange = (fieldName, value) => {

		if (fieldName === 'email')
			setForm({...form, fields: {...form.fields, email: value}});

		else if (fieldName === 'password')
			setForm({...form, fields: {...form.fields, password: value}});
	}

	const isValid = () => {
		const emailValidator = new Validator(form.fields.email);
		const passwordValidator = new Validator(form.fields.password);

		return (
			emailValidator.isNotEmpty()
			&& emailValidator.emailValid()
			&& passwordValidator.isNotEmpty()
			&& form.errors == null);
	}

	const handleFormSubmit = async() => {

		Keyboard.dismiss();
		setIsFetching(true);

		let authUser;
		const url = env.api_url + '/auth/login/';


		try {
			const response = await UserAPIService.login(form.fields);
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

  return (
    <View style={styles.container}>

			<Image
				source={require('../assets/images/login-bg.png')}
				style={{position: 'absolute', top: 0, left: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height, zIndex: -1}} />

			<BackdropLoading visible={isFetching} />

			<Alert
				visible={responseError !== null}
        title='Credenciais incorretas'
				body='E-mail ou senha estão incorretos'
        dismissText='Ok'
				onDismiss={handleModalDismiss} />

			<KeyboardAwareScrollView enableOnAndroid={true}>

				<AutoHeightImage
					source={require('../assets/images/logo-name.png')}
					width={logoWidth}
					style={{alignSelf: 'center', marginTop: 120}} />

				<View style={{flex: 1, paddingHorizontal: 30, marginTop: 30}}>

					<EmailField
						contrastMode={true}
						onChange={(value) => onFieldChange('email', value)} />

					<PasswordField
						contrastMode={true}
						onChange={(value) => onFieldChange('password', value)}
						style={{marginTop: 5}} />

					<Button onPress={handleFormSubmit} style={{marginTop: 10}} disabled={!isValid()}>Entrar</Button>
					<LinkButton>Esqueceu sua senha?</LinkButton>
				</View>

			</KeyboardAwareScrollView>

			{/* TODO: Depoimentos em carrossel? */}

			<View style={{flex: 1, justifyContent: 'flex-end'}}>
				<View style={{backgroundColor: 'rgba(255, 255, 255, .2)', height: 1}}></View>
				<View style={{paddingHorizontal: 30, paddingVertical: 14}}>
					<Text style={{color: 'white', alignSelf: 'center'}}>Não tem uma conta?</Text>
					<OutlinedButton
						style={{marginTop: 10}}
						onPress={() => navigation.navigate('signUp')}>Crie seu perfil grátis</OutlinedButton>
				</View>
			</View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
		flex: 1
	},
});
