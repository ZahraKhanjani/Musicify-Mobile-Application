import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {COLOURS} from 'theme/constants';
import {Icon, Text} from 'components/index';

const ListItem = ({
  Component,
  disabled,
  containerStyle,
  ViewComponent,
  leftAvatar,
  title,
  rightIcon,
  titleStyle,
  subtitleStyle,
  subtitle,
  chevron,
  linearGradientProps,
  onPress,
}) => {
  const Container = Component || View;
  const ContainerView = ViewComponent || View;
  return (
    <Container onPress={onPress} style={containerStyle} disabled={disabled}>
      <ContainerView
        {...linearGradientProps}
        style={StyleSheet.flatten([
          styles.containerView,
          linearGradientProps?.style,
        ])}>
        {!!leftAvatar &&
          (leftAvatar?.icon ? (
            <View style={leftAvatar?.containerStyle}>
              <Icon {...leftAvatar?.icon} style={{alignSelf: 'center'}} />
            </View>
          ) : (
            <FastImage
              source={leftAvatar?.source}
              style={leftAvatar?.containerStyle}
            />
          ))}
        <View style={styles.titleContainer}>
          {!!title && (
            <Text style={StyleSheet.flatten([titleStyle, styles.title])}>
              {title}
            </Text>
          )}
          {!!subtitle && <Text style={subtitleStyle}>{subtitle}</Text>}
        </View>
        {!!chevron && (
          <Icon style={styles.chevron} name="chevron-right" {...chevron} />
        )}
        {!!rightIcon && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={rightIcon.onPress}>
            <Icon
              name={rightIcon.name}
              size={rightIcon.size || 24}
              color={rightIcon.color || COLOURS.white}
            />
          </TouchableOpacity>
        )}
      </ContainerView>
    </Container>
  );
};

const styles = StyleSheet.create({
  containerView: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
  },
  titleContainer: {
    alignSelf: 'center',
    marginLeft: 8,
  },
  title: {
    marginBottom: 8,
  },
  rightIcon: {
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
  },
  chevron: {
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
  },
});

export default ListItem;
