//@flow
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ListItem} from 'components/index';
type PropsType = {
  field: string,
  value: string,
  disabled: boolean,
};
function ProfileRow(props: PropsType) {
  return (
    <ListItem
      Component={TouchableOpacity}
      disabled={props.disabled}
      {...props}
      containerStyle={{
        backgroundColor: 'transparent',
        overflow: 'hidden',
        paddingVertical: 0,
        paddingLeft: 0,
        paddingRight: 10,
      }}
      title={props.field}
      titleStyle={{color: '#B3B3B3', fontSize: 14, marginBottom: 16}}
      subtitleStyle={{color: 'white', fontSize: 14}}
      subtitle={props.value}
      chevron={{color: props.disabled ? 'transparent' : '#B3B3B3', size: 24}}
    />
  );
}

export default ProfileRow;
