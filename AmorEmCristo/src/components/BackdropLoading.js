/**
* @prop {visible} bool
*/

import React, { useState, useRef, useEffect } from 'react';
import {
  Animated,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '../theme';

export default function BackdropLoading(props) {

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isBuilt, setIsBuilt] = useState(false);

  useEffect(() => {
    if (props.visible) fadeIn();
    else fadeOut();
  });

  const fadeIn = () => {
    setIsBuilt(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start(({ finished }) => {
      setIsBuilt(false);
    });
  };

  const render = () => {
    if (isBuilt) {
      return (
        <Animated.View
          style={[
            styles.container,
            {width: windowWidth, height: windowHeight, opacity: fadeAnim}
          ]}>
          <ActivityIndicator color={colors.primary} size='large' />
        </Animated.View>
      );
    } else {
      return null;
    }
  }

  return render();
};

BackdropLoading.propTypes = {
  visible: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backdrop,
    flex: 1,
    position: 'absolute',
    zIndex: 10
  },
});
