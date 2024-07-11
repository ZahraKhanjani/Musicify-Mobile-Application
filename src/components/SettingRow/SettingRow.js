//@flow
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'components/index';
import Switch from 'icons/Switch';
type PropsType = {
  onInfoText: string,
  offInfoText: string,
  infoSubText: string,
  title: string,
};
function SettingRow(props: PropsType) {
  const [active, setActive] = useState(false);
  function switchActive() {
    setActive(!active);
  }
  return (
    <View>
      <Text style={styles.title}>{props.title}</Text>
      <View
        style={{
          flexDirection: 'row',
          paddingLeft: 18,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={styles.infoText}>
            {active ? props.onInfoText : props.offInfoText}
          </Text>
          <Text style={styles.infoSubText}>{props.infoSubText}</Text>
        </View>
        <TouchableOpacity onPress={switchActive}>
          <Switch active={active} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  infoText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  infoSubText: {
    color: '#B3B3B3',
    fontSize: 14,
    maxWidth: 290,
  },
  title: {color: 'white', fontSize: 21, marginBottom: 25},
});

export default SettingRow;
