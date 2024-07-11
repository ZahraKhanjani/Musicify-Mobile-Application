//@flow
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'components/index';
import Switch from 'icons/Switch';
import {connect} from 'react-redux';
import {setOfflineMode} from '../../generalActions';

type PropsType = {
  offlineMode: boolean,
  setOfflineMode: Function,
};
function OfflineModeSwitch(props: PropsType) {
  const {offlineMode} = props;
  function switchActive() {
    props.setOfflineMode(!offlineMode);
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
            {offlineMode ? 'Offline' : 'Online'}
          </Text>
          <Text style={styles.infoSubText}>
            When you go offline, you'll only be able to play the music you've
            downloaded.
          </Text>
        </View>
        <TouchableOpacity onPress={switchActive}>
          <Switch active={offlineMode} />
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
function mapStateToProps(state) {
  return {
    offlineMode: state.general.offlineMode,
  };
}

export default connect(
  mapStateToProps,
  {
    setOfflineMode,
  },
)(OfflineModeSwitch);
