import React from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import SearchIcon from 'icons/SearchIcon';
import {Icon} from 'components/index';

const SearchBar = ({onSubmitEditing, onChangeText, value, ref}) => (
  <View style={styles.container}>
    <SearchIcon style={{marginHorizontal: 4}} size={18} />
    <TextInput
      autoFocus
      ref={ref}
      placeholder="Search"
      placeholderTextColor="rgba(20, 25, 45, 0.6)"
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      style={styles.inputStyle}
    />
    {!!value && (
      <TouchableOpacity
        onPress={() => {
          onChangeText('');
        }}
        style={{position: 'absolute', right: 4}}>
        <Icon name="close" size={20} color="rgba(20, 25, 45, 0.6)" />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 7,
    alignItems: 'center',
  },
  inputStyle: {fontSize: 16, color: '#14192D'},
});

export default SearchBar;
