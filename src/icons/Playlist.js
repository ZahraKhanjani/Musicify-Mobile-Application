// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Line, Path, G} from 'react-native-svg';

function Playlist({style, color = '#fff'}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="28.501"
        height="27.251"
        viewBox="0 0 28.501 27.251">
        <G
          id="Group_189"
          data-name="Group 189"
          transform="translate(-331.561 -687.922)">
          <G id="Group_180" data-name="Group 180">
            <Line
              id="Line_58"
              data-name="Line 58"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeMiterlimit={10}
              x2="11.665"
              transform="translate(335.423 714.597)"
            />
            <Line
              id="Line_59"
              data-name="Line 59"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeMiterlimit={10}
              x2="11.665"
              transform="translate(335.423 707.59)"
            />
            <Line
              id="Line_60"
              data-name="Line 60"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeMiterlimit={10}
              x2="17.123"
              transform="translate(342.438 700.583)"
            />
            <Line
              id="Line_61"
              data-name="Line 61"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeMiterlimit={10}
              x2="11.007"
              transform="translate(348.553 693.576)"
            />
          </G>
          <Path
            id="Path_97"
            data-name="Path 97"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeMiterlimit={10}
            d="M359.029,711.057l-5.619,3.381a1.1,1.1,0,0,1-1.663-.941v-6.763a1.1,1.1,0,0,1,1.663-.939l5.619,3.381a1.1,1.1,0,0,1,0,1.881Z"
          />
          <G id="Group_182" data-name="Group 182">
            <G id="Group_181" data-name="Group 181">
              <Line
                id="Line_62"
                data-name="Line 62"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeMiterlimit={10}
                x2="10.307"
                transform="translate(332.061 693.576)"
              />
              <Line
                id="Line_63"
                data-name="Line 63"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeMiterlimit={10}
                y1="10.307"
                transform="translate(337.215 688.422)"
              />
            </G>
          </G>
        </G>
      </Svg>
    </View>
  );
}
export default Playlist;
