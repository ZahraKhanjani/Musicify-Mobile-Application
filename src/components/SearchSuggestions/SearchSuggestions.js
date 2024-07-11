//@flow
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import SearchIcon from 'icons/SearchIcon';
import {Page} from 'components/index';

type PropsType = {
  activeSearchMode: Function,
  navigation: any,
};

function SearchSuggestions(props: PropsType) {
  return (
    <ScrollView stickyHeaderIndices={[1]} style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <TouchableWithoutFeedback onPress={props.activeSearchMode}>
        <View style={styles.searchBox}>
          <SearchIcon size={23} style={{alignSelf: 'center'}} />
          <Text style={styles.placeholder}>Artist, song or playlist</Text>
        </View>
      </TouchableWithoutFeedback>
      <Page navigation={props.navigation} page="search" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 18,
    paddingHorizontal: 18,
  },
  searchBox: {
    marginHorizontal: 18,
    marginBottom: 28,
    flexDirection: 'row',
    fontWeight: '100',
    backgroundColor: 'white',
    borderRadius: 7,
    height: 40,
    padding: 8,
    shadowColor: 'rgba(20, 25, 45, 1)',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  placeholder: {
    fontSize: 18,
    color: '#204565',
    marginLeft: 6,
  },
});

export default SearchSuggestions;
