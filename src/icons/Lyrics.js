// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Line, Path, G} from 'react-native-svg';

function Lyrics({style, color = '#c7c7c7'}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="18.088"
        height="15.965"
        viewBox="0 0 18.088 15.965">
        <G
          id="Group_361"
          data-name="Group 361"
          transform="translate(-322.816 -665.52)">
          <Line
            id="Line_118"
            data-name="Line 118"
            fill="none"
            strokeLinecap="round"
            stroke={color}
            strokeMiterlimit={10}
            x2="2.61"
            transform="translate(335.081 676.03)"
          />
          <Line
            id="Line_119"
            data-name="Line 119"
            fill="none"
            strokeLinecap="round"
            stroke={color}
            strokeMiterlimit={10}
            x2="0.07"
            y2="9.473"
            transform="translate(336.351 666.557)"
          />
          <Path
            id="Path_149"
            data-name="Path 149"
            fill="none"
            strokeLinecap="round"
            stroke={color}
            strokeLinejoin="round"
            d="M332.368,667.884V666.02H340.4v1.864"
          />
          <G id="Group_180" data-name="Group 180">
            <Line
              id="Line_58"
              data-name="Line 58"
              fill="none"
              strokeLinecap="round"
              stroke="#b3b3b3"
              strokeMiterlimit={10}
              x1="3.854"
              transform="translate(323.51 666.117)"
            />
            <Path
              id="Line_59"
              data-name="Line 59"
              fill="none"
              strokeLinecap="round"
              stroke="#b3b3b3"
              d="M330.6,671.073H323.51"
            />
            <Line
              id="Line_60"
              data-name="Line 60"
              fill="none"
              strokeLinecap="round"
              stroke="#b3b3b3"
              strokeMiterlimit={10}
              x1="7.282"
              transform="translate(323.316 676.03)"
            />
            <Line
              id="Line_61"
              data-name="Line 61"
              fill="none"
              strokeLinecap="round"
              stroke="#b3b3b3"
              strokeMiterlimit={10}
              x1="15.854"
              transform="translate(323.316 680.986)"
            />
          </G>
        </G>
      </Svg>
    </View>
  );
}
export default Lyrics;
