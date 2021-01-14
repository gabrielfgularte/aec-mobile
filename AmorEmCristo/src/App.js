/**
* @prop {propName} PropType
*/

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';

import { getStatusBarHeight } from 'react-native-status-bar-height';

import { SplashScreen } from './screens';
import { UserAPIService } from './services';
import { colors } from './theme';

export default function App(props) {

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {

		const tryLogin = async() => {
			let data;
			try {
	      const payload = {email: 'gabriel@macit.com.br', password: 'macit123'}
	      data = await UserAPIService.login(payload);
	    } catch (e) {
	      console.log(e);
	    } finally {
				setTimeout(function() {
					setIsLoading(false);
				}, 5000);
	    }

			console.log(data);
		}

		tryLogin();

	}, []);

	const render = () => {

		if (isLoading) return <SplashScreen />;

		return (
			<SafeAreaView style={styles.container}>

				<StatusBar translucent backgroundColor={colors.primaryDark}/>

				<Text style={styles.welcome}>
					Welcome to React Native!
				</Text>
				<Text style={styles.instructions}>
					Reload the App to see a splash screen
				</Text>
			</SafeAreaView>
		);
	}

  return render();
};

App.propTypes = {};

const styles = StyleSheet.create({
  container: {
		paddingTop: getStatusBarHeight(),
		flex: 1
	},
});
