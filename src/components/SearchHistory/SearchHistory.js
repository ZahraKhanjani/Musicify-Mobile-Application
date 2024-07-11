import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'components/index';
import {connect} from 'react-redux';
import {removeFromSearchHistory} from 'screens/Search/searchActions';
import {FlatList} from 'react-native';
import {Icon} from 'components/index';
import {ITEM_HEIGHTS} from 'theme/constants';

function SearchHistory(props) {
  function renderItem({item}) {
    return (
      <TouchableOpacity
        onPress={() => {
          props.onSearch(item);
        }}
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 18, color: 'white'}}>{item}</Text>
        <TouchableOpacity
          onPress={() => {
            props.removeFromSearchHistory(item);
          }}>
          <Icon name="close" size={18} color="#fff" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
  function keyExtractor(item: string, index: number) {
    return item + index;
  }
  const getItemLayout = (data, index) => ({
    length: 20,
    offset: 20 * index,
    index,
  });
  return (
    <View style={{marginTop: 16}}>
      {props.searchHistory.length ? (
        <>
          <Text style={{fontSize: 16, color: 'lightgrey', marginBottom: 16}}>
            Local Search History
          </Text>
          <FlatList
            getItemLayout={getItemLayout}
            keyExtractor={keyExtractor}
            data={props.searchHistory}
            renderItem={renderItem}
          />
        </>
      ) : (
        <View />
      )}
    </View>
  );
}

function mapStateToProps(state) {
  return {
    searchHistory: state.search.searchHistory,
  };
}

export default connect(
  mapStateToProps,
  {removeFromSearchHistory},
)(SearchHistory);
