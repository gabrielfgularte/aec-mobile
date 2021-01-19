import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import GuestRouter from './GuestRouter';
import UserRouter from './UserRouter';
import { UserModel } from '../models';
import UserContext from '../contexts/UserContext';
import { SplashScreen } from '../screens';
import { UserAPIService } from '../services';
import { navTheme } from '../theme';
import { StatusBar } from '../components';
import { colors } from '../theme';

export default function MainRouter(props) {

	const [user, setUser] = useState(null);
	const [isFetching, setIsFetching] = useState(null);

	useEffect(() => {

		const fetchUser = async () => {
			const loadedUser = await UserModel.load();
			if (!loadedUser) {
				setIsFetching(false);
				return;
			}

			const payload = {email: loadedUser.email, password: loadedUser.password};

			try {
				const response = await UserAPIService.login(payload);
				const updatedUser = new UserModel(response);
				updatedUser.save();
				setUser(updatedUser.data);
			} catch (e) {
				console.log('error', e);
			} finally {
				setIsFetching(false);
			}

    }

    fetchUser();


	}, []);

	const updateUser = (data) => {
    setUser(data);
  };

  const renderNavigation = () => {
    if (isFetching) return <SplashScreen />;
    if (user) return <UserRouter />;
    return <GuestRouter />;
  };

	return (
		<NavigationContainer theme={navTheme}>
		<StatusBar translucent backgroundColor={colors.primaryDark}/>
			<UserContext.Provider
				value={{
					user,
					updateUser
				}}>

				{ renderNavigation() }

			</UserContext.Provider>
		</NavigationContainer>
	);

	// const getUserEmail = () => {
	// 	if (user) return user.email;
	// 	return null;
	// }
	//
	// return (
  //   <View>
  //     <Text>Hi MainRouter {getUserEmail()}</Text>
  //   </View>
  // );
};
