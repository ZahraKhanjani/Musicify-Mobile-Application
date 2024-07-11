// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Path, G} from 'react-native-svg';

function ListItemPlayIcon({style, color = '#c7c7c7'}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="34.786"
        height="34.786"
        viewBox="0 0 34.786 34.786">
        <G id="Group_47" dataName="Group 47" transform="translate(-342.5 -677)">
          <G
            id="Ellipse_18"
            dataName="Ellipse 18"
            transform="translate(343.5 678)"
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1">
            <Circle cx="16.393" cy="16.393" r="16.393" stroke="none" />
            <Circle cx="16.393" cy="16.393" r="16.893" fill="none" />
          </G>
          <Path
            id="Path_51"
            dataName="Path 51"
            d="M219.369,649.786V661.4a.668.668,0,0,0,1.049.517l8.714-5.808a.613.613,0,0,0,0-1.033l-8.714-5.809A.669.669,0,0,0,219.369,649.786Z"
            transform="translate(136.95 38.847)"
            fill="#fff"
          />
        </G>
      </Svg>
    </View>
  );
}
export default ListItemPlayIcon;
