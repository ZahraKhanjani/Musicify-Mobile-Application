// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

function EmailField({style, color = '#b3b3b3'}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="17.69"
        height="17.693"
        viewBox="0 0 17.69 17.693">
        <Path
          id="Shape"
          fill={color}
          d="M8.848,17.693a8.846,8.846,0,1,1,8.844-8.847v.769a3.462,3.462,0,0,1-6,2.358,4.231,4.231,0,1,1,1.381-3.127v.769a1.154,1.154,0,0,0,2.308,0V8.846a6.538,6.538,0,1,0-3.006,5.5,1.154,1.154,0,1,1,1.248,1.94A8.82,8.82,0,0,1,8.848,17.693Zm0-10.769A1.923,1.923,0,1,0,10.77,8.846,1.925,1.925,0,0,0,8.848,6.924Z"
          transform="translate(-0.002 0)"
        />
      </Svg>
    </View>
  );
}
export default EmailField;
