// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

function Exit({style, color = '#b3b3b3'}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 15 15">
        <Path
          id="Icon_material-exit-to-app"
          data-name="Icon material-exit-to-app"
          fill={color}
          d="M10.408,14.992l1.175,1.175L15.75,12,11.583,7.833,10.408,9.008l2.15,2.158H4.5v1.667h8.058l-2.15,2.158ZM17.833,4.5H6.167A1.666,1.666,0,0,0,4.5,6.167V9.5H6.167V6.167H17.833V17.833H6.167V14.5H4.5v3.333A1.666,1.666,0,0,0,6.167,19.5H17.833A1.672,1.672,0,0,0,19.5,17.833V6.167A1.672,1.672,0,0,0,17.833,4.5Z"
          transform="translate(-4.5 -4.5)"
        />
      </Svg>
    </View>
  );
}
export default Exit;
