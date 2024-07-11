// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Line, Path, G, Circle} from 'react-native-svg';

function Download({style, color = '#fff', size = 27}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 27 27">
        <G
          id="Group_226"
          data-name="Group 226"
          transform="translate(-263.368 -647.049)">
          <G
            id="Layer_2"
            data-name="Layer 2"
            transform="translate(263.868 647.549)">
            <Circle
              id="Ellipse_39"
              data-name="Ellipse 39"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeMiterlimit={10}
              className="cls-1"
              cx="13"
              cy="13"
              r="13"
            />
          </G>
          <G
            id="Layer_6"
            data-name="Layer 6"
            transform="translate(271.795 654.643)">
            <G id="Group_225" data-name="Group 225">
              <Line
                id="Line_97"
                data-name="Line 97"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeMiterlimit={10}
                className="cls-1"
                y1="11.264"
                transform="translate(5.173)"
              />
              <Path
                id="Path_69"
                data-name="Path 69"
                strokeLinejoin="round"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                className="cls-2"
                d="M279.506,656.849l-5.174,5.174-5.173-5.174"
                transform="translate(-269.159 -650.01)"
              />
            </G>
          </G>
        </G>
      </Svg>
    </View>
  );
}
export default Download;
