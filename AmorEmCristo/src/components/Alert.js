/**
* @prop {danger} bool
* @prop {style} object
* @prop {title} string
* @prop {body} string
* @prop {confirmText} string
* @prop {dismissText} string
* @prop {onDismiss} func
* @prop {onConfirm} func
* @prop {children} element
* @prop {visible} bool
*/

import React, { useState, useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { Button } from './buttons';
import { colors } from '../theme';

export default function Alert(props) {

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

  const renderTitle = () => {
    if (props.title) {
      return (
        <Text style={[
          styles.title,
          {fontSize: props.body ? 20 : 16}
        ]}>
          {props.title}
        </Text>
      );
    } else {
      return null;
    }
  }

  const renderBody = () => {
    if (props.body) return (<Text style={styles.body}>{props.body}</Text>)
    return null;
  }

  const renderActions = () => {
    if (props.confirmText) {
      return (
        <View style={styles.actionButtons}>
          <Button style={styles.actionButton} onPress={props.onConfirm}>{props.confirmText}</Button>
          <Button style={styles.actionButton} onPress={props.onDismiss}>{props.dismissText}</Button>
        </View>
      );
    } else if (!props.confirmText && !props.body) {
      return (
        <View style={styles.actionButtons}>
          <Button style={styles.actionButton} onPress={props.onDismiss}>{props.dismissText}</Button>
        </View>
      );
    } else {
      return (
        <View style={styles.actionClearButton}>
					{ /*TODO must be a cleanButton */ }
          <Button onPress={props.onDismiss}>{props.dismissText}</Button>
        </View>
      );
    }

  }

  const renderChildren = () => {
    if (props.children) {
      return (
        <View style={styles.children}>
          { props.children }
        </View>
      );
    } else {
      return null;
    }
  }

  const render = () => {
    if (isBuilt) {
      return (
        <Animated.View style={[
          styles.container,
          {width: windowWidth, height: windowHeight, opacity: fadeAnim}
        ]}>
          <View
            style={[props.style, styles.box]}>

            <View style={{alignItems: props.body ? 'flex-start' : 'center'}}>
              { renderTitle() }
              { renderBody() }
              { renderChildren() }

            </View>

            { renderActions() }

          </View>
        </Animated.View>
      );
    } else {
      return null;
    }
  };

  return render();
};

Alert.propTypes = {
  danger: PropTypes.bool,
  style: PropTypes.object,
  title: PropTypes.string,
  body: PropTypes.string,
  confirmText: PropTypes.string,
  dismissText: PropTypes.string,
  onDismiss: PropTypes.func,
  onConfirm: PropTypes.func,
  children: PropTypes.element,
  visible: PropTypes.bool,
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backdrop,
    flex: 1,
    position: 'absolute',
    zIndex: 10
  },

  box: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 4,
  },

  title: {
    color: colors.primary,
		fontWeight: 'bold'
  },

  body: {
    color: colors.bodyText,
    fontSize: 16,
    marginTop: 12
  },

  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25
  },

  actionButton: {
    marginHorizontal: 5,
    minWidth: 130
  },

  actionClearButton: {
    alignItems: 'flex-end',
    marginTop: 25
  },

  children: {
    marginTop: 25,
    marginBottom: 45 * -1,
    alignItems: 'center'
  }
});
