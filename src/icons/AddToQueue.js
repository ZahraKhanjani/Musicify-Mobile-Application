// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Line, Path, G, Circle} from 'react-native-svg';

function AddToQueue({style, color = '#fff'}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="31.902"
        height="27.713"
        viewBox="0 0 31.902 27.713">
        <G
          id="Group_194"
          data-name="Group 194"
          transform="translate(-331.561 -655.641)">
          <G id="Group_190" data-name="Group 190">
            <Circle
              id="Ellipse_36"
              data-name="Ellipse 36"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeMiterlimit={10}
              cx="3.86"
              cy="3.86"
              r="3.86"
              transform="translate(350.602 675.135)"
            />
            <Path
              id="Path_100"
              data-name="Path 100"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeMiterlimit={10}
              d="M358.323,668.9a1.552,1.552,0,0,1,.758-1.336l3.119-1.86a1.572,1.572,0,0,0,.763-1.346v-2.78a.111.111,0,0,0-.111-.109.119.119,0,0,0-.055.015l-3.716,2.217a1.559,1.559,0,0,0-.758,1.337v13.953"
            />
          </G>
          <G id="Group_191" data-name="Group 191">
            <Line
              id="Line_64"
              data-name="Line 64"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeMiterlimit={10}
              x2="11.744"
              transform="translate(335.446 682.493)"
            />
            <Line
              id="Line_65"
              data-name="Line 65"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeMiterlimit={10}
              x2="11.744"
              transform="translate(335.446 675.44)"
            />
            <Line
              id="Line_66"
              data-name="Line 66"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeMiterlimit={10}
              x2="11.517"
              transform="translate(342.438 668.384)"
            />
            <Line
              id="Line_67"
              data-name="Line 67"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeMiterlimit={10}
              x2="6.078"
              transform="translate(347.877 661.329)"
            />
          </G>
          <G id="Group_193" data-name="Group 193">
            <G id="Group_192" data-name="Group 192">
              <Line
                id="Line_68"
                data-name="Line 68"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeMiterlimit={10}
                x2="10.377"
                transform="translate(332.061 661.331)"
              />
              <Line
                id="Line_69"
                data-name="Line 69"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeMiterlimit={10}
                y1="10.377"
                transform="translate(337.25 656.141)"
              />
            </G>
          </G>
        </G>
      </Svg>
    </View>
  );
}
export default AddToQueue;
