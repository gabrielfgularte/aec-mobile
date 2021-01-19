/**
* @prop {propName} PropType
*/

import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';

import UserContext from '../contexts/UserContext';
import UserModel from '../models/UserModel';
import { Button } from '../components/buttons';

export default function UserRouter(props) {

	const { user, updateUser } = useContext(UserContext);

	const logout = () => {
		updateUser(null);
		UserModel.logout();
	}

  return (
    <View style={styles.container}>
			<Image source={{uri: user.profile_pics.thumb}} style={{width: 180, height: 180, borderRadius: 90}} />
      <Text style={{marginVertical: 10, fontSize: 18}}>Olá, {user.email}</Text>
      <Button onPress={logout}>sair</Button>
    </View>
  );
};

UserRouter.propTypes = {};

const styles = StyleSheet.create({
  container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
});
