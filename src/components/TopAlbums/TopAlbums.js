import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity, View, FlatList} from 'react-native';
import {Text} from 'components/index';
import {Album} from 'components/index';

function TopAlbums(props) {
  const {albums, onSeeAll} = props;
  function renderAlbum({item}) {
    return <Album album={item} viewType={'row'} />;
  }
  return (
    <View
      style={{
        top: -16,
      }}>
      <LinearGradient
        colors={['rgba(20, 25, 45, 0.0)', 'rgba(20, 25, 45, 1)']}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
        }}>
        <Text
          style={{
            fontSize: 25,
            color: 'white',
            fontWeight: 'bold',
          }}>
          Album
        </Text>
        <TouchableOpacity onPress={onSeeAll}>
          <View
            style={{
              alignSelf: 'center',
              borderColor: '#F82B46',
              borderWidth: 1,
              borderRadius: 7,
              height: 27,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 8,
              marginTop: 4,
            }}>
            <Text style={{color: '#F82B46', fontSize: 12}}>See All</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
      <View style={{paddingVertical: 16}}>
        <FlatList
          data={albums}
          renderItem={renderAlbum}
          ListFooterComponent={<View style={{height: 56}} />}
        />
      </View>
    </View>
  );
}

export default TopAlbums;
