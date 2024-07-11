// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

function PasswordField({style, color = '#b3b3b3'}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="15.789"
        height="19.65"
        viewBox="0 0 15.789 19.65">
        <Path
          id="Icon_ionic-md-lock"
          data-name="Icon ionic-md-lock"
          fill={color}
          d="M20.565,10.142h-.987V8.168a4.934,4.934,0,0,0-9.868,0v1.974H8.724A1.979,1.979,0,0,0,6.75,12.116V20.91a1.979,1.979,0,0,0,1.974,1.974H20.565a1.979,1.979,0,0,0,1.974-1.974V12.116A1.979,1.979,0,0,0,20.565,10.142Zm-5.921,8.98a1.974,1.974,0,1,1,1.974-1.974A1.979,1.979,0,0,1,14.645,19.122Zm3.059-8.98H11.585V8.168a3.059,3.059,0,0,1,6.118,0Z"
          transform="translate(-6.75 -3.234)"
        />
      </Svg>
    </View>
  );
}
export default PasswordField;
