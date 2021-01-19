import React from 'react';
import { StatusBar as ReactStatusBar, View } from 'react-native';

import { getStatusBarHeight } from 'react-native-status-bar-height';

import { colors } from '../theme';

export default function StatusBar(props) {

  return (
		<View style={{marginBottom: getStatusBarHeight()}}>
			<ReactStatusBar translucent backgroundColor={colors.primaryDark}/>
		</View>
  );
};
