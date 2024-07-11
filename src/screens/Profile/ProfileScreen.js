import React from 'react';
import authBg from 'assets/authBg.png';
import {
  ImageBackground,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import BackIcon from 'icons/BackIcon';
import {ProfileRow} from 'components/index';
import {connect} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NavigationService from 'navigation/NavigationService';
import {ScreensNames} from 'navigation/routeNames';

function ProfileScreen(props) {
  const insets = useSafeArea();
  const {profileInfo} = props;
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
          Profile
        </Text>
      </View>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <View style={styles.profileIcon}>
            <MaterialIcons name="person" color="grey" size={100} solid />
          </View>
          <Text style={styles.infoText}>Free Account</Text>
          {/*<GradientButton*/}
          {/*  onPress={() => {}}*/}
          {/*  containerStyle={{*/}
          {/*    height: 40,*/}
          {/*    width: 140,*/}
          {/*    marginTop: 17,*/}
          {/*    marginBottom: 40,*/}
          {/*  }}*/}
          {/*  text="Go Premium"*/}
          {/*/>*/}
        </View>
        <View style={styles.divider} />
        <ProfileRow
          onPress={() => {
            NavigationService.navigate(ScreensNames.ChangeName, {
              name: profileInfo.name,
            });
          }}
          field="Name"
          value={profileInfo.name || 'Undefined'}
        />
        <View style={styles.divider} />
        <ProfileRow disabled field="E-Mail" value={profileInfo.email} />
        <View style={styles.divider} />
        {/*<ProfileRow field="Gender" value="Male" />*/}
        {/*<View style={styles.divider} />*/}
        {/*<ProfileRow field="Phone" value="+98  912 123 45 67" />*/}
        {/*<View style={styles.divider} />*/}
        <ProfileRow
          onPress={() => {
            NavigationService.navigate(ScreensNames.ChangePassword);
          }}
          field="Password"
          value="**********"
        />
      </ScrollView>
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
    marginBottom: 27,
  },
  profileIcon: {
    height: 124,
    width: 124,
    borderRadius: 62,
    marginBottom: 30,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    color: 'white',
    fontSize: 18,
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
  null,
)(ProfileScreen);
