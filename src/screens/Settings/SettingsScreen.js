import React, {useContext, useEffect, useState} from 'react';
import DeviceInfo from 'react-native-device-info';
import get from 'lodash/get';
import authBg from 'assets/authBg.png';
import {
  ImageBackground,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Linking,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import BackIcon from 'icons/BackIcon';
import Exit from 'icons/Exit';
import {AuthContext} from '../../App';
import {connect} from 'react-redux';
import {setProfileInfo} from '../Auth/authActions';
import {ProfileApi} from 'api/index';
import Config from 'react-native-config';
import {
  ConfirmationModal,
  ProfileCard,
  SettingRow,
  ListItem,
} from 'components/index';

function SettingsScreen(props) {
  const {signOut} = useContext(AuthContext);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const {profileInfo} = props;
  function getProfile() {
    ProfileApi.getProfile()
      .then(res => {
        console.log({res2: res});
        props.setProfileInfo(get(res, 'data', {}));
      })
      .catch(err => {});
  }
  useEffect(getProfile, []);
  const insets = useSafeArea();
  function openSupport() {
    Linking.openURL(Config.SUPPORT_URL).catch(error => {});
  }
  return (
    <ImageBackground
      source={authBg}
      style={[
        styles.background,
        {
          paddingTop: insets.top + 14,
          paddingBottom: insets.bottom,
        },
      ]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{position: 'absolute', width: 30, height: 30, left: 0}}
          onPress={() => {
            props.navigation.goBack(null);
          }}>
          <BackIcon />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 26,
            color: 'white',
          }}>
          Settings
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Profile</Text>
        <ProfileCard
          title={profileInfo.name || profileInfo.email || 'No name'}
        />
        {/*<View*/}
        {/*  style={{*/}
        {/*    flexDirection: 'row',*/}
        {/*    justifyContent: 'space-between',*/}
        {/*    paddingHorizontal: 30,*/}
        {/*    paddingVertical: 20,*/}
        {/*  }}>*/}
        {/*  <Text style={styles.infoText}>4 Playlist</Text>*/}
        {/*  <View style={styles.separator} />*/}
        {/*  <Text style={styles.infoText}>4 Follower</Text>*/}
        {/*  <View style={styles.separator} />*/}
        {/*  <Text style={styles.infoText}>0 Following</Text>*/}
        {/*</View>*/}
        <View style={styles.divider} />
        <SettingRow
          title="Data Saver"
          onInfoText="On"
          offInfoText="Off"
          infoSubText="Low quality music"
        />
        {/*<View style={styles.divider} />*/}
        {/*<OfflineModeSwitch title="Playback" />*/}
        {/*<View style={styles.divider} />*/}
        {/*<SettingRow*/}
        {/*  title="MusicQuality"*/}
        {/*  onInfoText="Download"*/}
        {/*  offInfoText="Download"*/}
        {/*  infoSubText="Some Sample Text"*/}
        {/*/>*/}
        <View style={styles.divider} />
        <ListItem
          Component={TouchableOpacity}
          onPress={openSupport}
          containerStyle={{
            backgroundColor: 'transparent',
            overflow: 'hidden',
            paddingVertical: 0,
            paddingLeft: 0,
            paddingRight: 10,
          }}
          title="Support"
          titleStyle={{color: 'white', fontSize: 16, marginBottom: 10}}
          subtitleStyle={{color: '#B3B3B3', fontSize: 14}}
          subtitle={'You can get support in telegram'}
        />
        <View style={styles.divider} />
        <ListItem
          Component={TouchableOpacity}
          disabled
          containerStyle={{
            backgroundColor: 'transparent',
            overflow: 'hidden',
            paddingVertical: 0,
            paddingLeft: 0,
            paddingRight: 10,
          }}
          title="Musicify"
          titleStyle={{color: 'white', fontSize: 16, marginBottom: 10}}
          subtitleStyle={{color: '#B3B3B3', fontSize: 14}}
          subtitle={`Version ${DeviceInfo.getVersion()}`}
        />
        <View style={styles.divider} />
        <ListItem
          Component={TouchableOpacity}
          onPress={() => {
            setIsConfirmModalOpen(true);
          }}
          containerStyle={{
            backgroundColor: 'transparent',
            overflow: 'hidden',
            paddingVertical: 0,
            paddingLeft: 0,
            paddingRight: 10,
          }}
          title="Log Out"
          titleStyle={{color: 'white', fontSize: 16, marginBottom: 10}}
          subtitleStyle={{color: '#B3B3B3', fontSize: 14}}
          subtitle={`You are logged in as ${profileInfo.name ||
            profileInfo.email ||
            'guest'}`}
          rightIcon={<Exit />}
        />
        <View style={{marginVertical: 18}} />
      </ScrollView>
      <ConfirmationModal
        title={'Log Out'}
        visible={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false);
        }}
        onConfirm={signOut}
        confirmationText={'Are You Sure You Want To Log Out?'}
        confirmButtonText={'Log Out'}
      />
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#2D1948',
    paddingHorizontal: 18,
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  infoText: {
    color: 'white',
    fontSize: 14,
  },
  title: {color: 'white', fontSize: 21},
  separator: {
    height: 17,
    borderLeftWidth: 1,
    borderLeftColor: '#212C5B',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#707070',
    marginVertical: 18,
  },
});

function mapStateToProps(state) {
  return {
    profileInfo: state.auth.profileInfo,
  };
}
export default connect(
  mapStateToProps,
  {setProfileInfo},
)(SettingsScreen);
