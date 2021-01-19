import React, { useState, useContext } from 'react';
import { Dimensions, StyleSheet, ImageBackground, Keyboard } from 'react-native';
import PropTypes from 'prop-types';

import AutoHeightImage from 'react-native-auto-height-image';

import { UserModel } from '../models';
import UserContext from '../contexts/UserContext';
import { UserAPIService } from '../services';
import { LoginForm } from '../components/forms';
import { Alert, BackdropLoading } from '../components';

export default function LoginScreen(props) {

	const { user, updateUser } = useContext(UserContext);
	const [isFetching, setIsFetching] = useState(false);
	const [responseError, setResponseError] = useState(null);
	const logoWidth = Dimensions.get('window').width - 120;

	const handleFormSubmit = async(payload) => {

		Keyboard.dismiss();
		setIsFetching(true);

		try {
			const response = await UserAPIService.login(payload);
			const user = new UserModel(response);
			user.save();
			updateUser(user.data);
		} catch (e) {
			setResponseError(e);
		} finally {
			setIsFetching(false);
		}

	}

	const handleModalDismiss = () => {
		setResponseError(null);
	}

  return (
    <ImageBackground style={styles.container} source={require('../assets/images/login-bg.png')}>

			<Alert
				visible={responseError !== null}
        title='Credenciais incorretas'
				body='E-mail ou senha estão incorretos'
        dismissText='Ok'
				onDismiss={handleModalDismiss} />

			<BackdropLoading visible={isFetching} />

			<AutoHeightImage
				source={require('../assets/images/logo-name.png')}
				width={logoWidth}
				style={{alignSelf: 'center'}} />
			<LoginForm style={{marginTop: 40}} handleSubmit={handleFormSubmit} />
    </ImageBackground>
  );
};

LoginScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {
		flex: 1,
		paddingTop: 120
	},
});
