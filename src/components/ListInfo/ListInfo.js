// @flow
import React from 'react';
import {View} from 'react-native';
import {Text, Icon} from 'components/index';

type PropsType = {
  duration: number,
  trackCounts: number,
};

function ListInfo(props: PropsType) {
  function getDuration() {
    const hours = Math.floor(props.duration / 60 / 60);
    const minutes = Math.floor(props.duration / 60) - hours * 60;
    const seconds = props.duration % 60;
    let showingTime = '';
    if (hours > 0) {
      showingTime = showingTime + `${hours.toString().padStart(1, '0')}h`;
      showingTime = showingTime + ` ${minutes.toString().padStart(2, '0')}m`;
    } else if (minutes > 0) {
      showingTime =
        showingTime +
        `${minutes.toString().padStart(minutes > 9 ? 2 : 1, '0')}m`;
      showingTime = showingTime + ` ${seconds.toString().padStart(2, '0')}s`;
    } else {
      showingTime = showingTime + `${seconds.toString().padStart(2, '0')}s`;
    }
    return showingTime;
  }
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text style={{fontSize: 15, color: '#C7C7C7'}}>
        {`${props.trackCounts} Track`}
      </Text>
      <Icon
        style={{marginHorizontal: 4}}
        name="lens"
        color="#C7C7C7"
        size={5}
      />
      <Text style={{fontSize: 15, color: '#C7C7C7'}}>{getDuration()}</Text>
    </View>
  );
}

export default ListInfo;
