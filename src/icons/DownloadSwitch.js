// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Line, Path, G, Circle, Rect} from 'react-native-svg';

function DownloadSwitch({style, active}) {
  return (
    <View style={style}>
      {active ? (
        <Svg
          id="Component_20_6"
          data-name="Component 20 – 6"
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="22"
          viewBox="0 0 38 22">
          <Rect
            id="Rectangle_45"
            data-name="Rectangle 45"
            fill="#fff"
            width="38"
            height="22"
            rx="11"
          />
          <Rect
            id="Rectangle_46"
            data-name="Rectangle 46"
            fill="#60c260"
            width="20"
            height="20"
            rx="10"
            transform="translate(17 1)"
          />
          <G
            id="Group_152"
            data-name="Group 152"
            transform="translate(23 6.691)">
            <G id="Layer_6" data-name="Layer 6" transform="translate(0)">
              <G id="Group_103" data-name="Group 103">
                <Line
                  id="Line_29"
                  data-name="Line 29"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeMiterlimit={10}
                  y1="8.047"
                  transform="translate(3.696)"
                />
                <Path
                  id="Path_69"
                  data-name="Path 69"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M276.551,656.849l-3.7,3.7-3.7-3.7"
                  transform="translate(-269.159 -651.963)"
                />
              </G>
            </G>
          </G>
        </Svg>
      ) : (
        <Svg
          id="Component_20_7"
          data-name="Component 20 – 7"
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="22"
          viewBox="0 0 38 22">
          <Rect
            id="Rectangle_45"
            data-name="Rectangle 45"
            fill="#fff"
            width="38"
            height="22"
            rx="11"
          />
          <Rect
            id="Rectangle_46"
            data-name="Rectangle 46"
            fill="#919191"
            width="20"
            height="20"
            rx="10"
            transform="translate(1 1)"
          />
          <G
            id="Group_152"
            data-name="Group 152"
            transform="translate(7 6.691)">
            <G id="Layer_6" data-name="Layer 6" transform="translate(0)">
              <G id="Group_103" data-name="Group 103">
                <Line
                  id="Line_29"
                  data-name="Line 29"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeMiterlimit={10}
                  y1="8.047"
                  transform="translate(3.696)"
                />
                <Path
                  id="Path_69"
                  data-name="Path 69"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M276.551,656.849l-3.7,3.7-3.7-3.7"
                  transform="translate(-269.159 -651.963)"
                />
              </G>
            </G>
          </G>
        </Svg>
      )}
    </View>
  );
}
export default DownloadSwitch;
