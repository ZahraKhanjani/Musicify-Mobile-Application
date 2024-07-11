// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Path, G, Text, TSpan} from 'react-native-svg';

function RepeatSingle({style, color = '#ff3636'}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="15.099"
        height="16.925"
        viewBox="0 0 15.099 16.925">
        <G
          id="Component_5_4"
          dataName="Component 5 – 4"
          transform="translate(0.5 0.707)">
          <G id="Group_91" dataName="Group 91" transform="translate(-376 -600)">
            <G id="Group_86" dataName="Group 86" transform="translate(303 -31)">
              <G
                id="Group_81"
                dataName="Group 81"
                transform="translate(125.129 479.776)">
                <Path
                  id="Path_71"
                  dataName="Path 71"
                  d="M-40.165,162.483l2.126,2.126-2.126,2.126"
                  fill="none"
                  stroke="#ff3636"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                />
                <Path
                  id="Path_72"
                  dataName="Path 72"
                  d="M-50,156.476l-2.126-2.126L-50,152.224"
                  transform="translate(0 -1)"
                  fill="none"
                  stroke="#ff3636"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                />
                <Path
                  id="Path_73"
                  dataName="Path 73"
                  d="M-38.484,164.609H-48.76a3.369,3.369,0,0,1-3.369-3.369v-2.982"
                  fill="none"
                  stroke="#ff3636"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="1"
                />
                <Path
                  id="Path_74"
                  dataName="Path 74"
                  d="M-51.675,154.35H-41.4a3.368,3.368,0,0,1,3.369,3.368v2.618"
                  transform="translate(0 -1)"
                  fill="none"
                  stroke="#ff3636"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="1"
                />
              </G>
            </G>
            <G id="Group_90" dataName="Group 90" transform="translate(-11 9)">
              <Text
                id="_1"
                dataName="1"
                transform="translate(394 602)"
                fill="#ff3636"
                fontSize="10"
                fontFamily="Helvetica-Bold, Helvetica"
                fontWeight="700">
                <TSpan x="-2.781" y="0">
                  1
                </TSpan>
              </Text>
            </G>
          </G>
        </G>
      </Svg>
    </View>
  );
}
export default RepeatSingle;
