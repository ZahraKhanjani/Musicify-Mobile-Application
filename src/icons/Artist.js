// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Rect, Path, G, Circle} from 'react-native-svg';

function Artist({style, color = '#fff'}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="34.214"
        height="24.733"
        viewBox="0 0 34.214 24.733">
        <G
          id="Group_217"
          data-name="Group 217"
          transform="translate(-286.276 -691.037)">
          <G id="Group_216" data-name="Group 216">
            <Path
              id="Path_112"
              data-name="Path 112"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M295.972,692.838a10.667,10.667,0,0,0-.209,21.095"
            />
            <Path
              id="Path_113"
              data-name="Path 113"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M296.045,707.02a3.883,3.883,0,0,1,.088-7.267"
            />
            <Path
              id="Path_114"
              data-name="Path 114"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M293.151,711.528a9.193,9.193,0,0,1-3.263-2.907"
            />
            <Path
              id="Path_115"
              data-name="Path 115"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M294.153,709.638a7.041,7.041,0,0,1-2.5-2.231"
            />
          </G>
          <Rect
            id="Rectangle_54"
            data-name="Rectangle 54"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            width="23.733"
            height="23.733"
            transform="translate(296.258 691.537)"
          />
          <Path
            id="Path_116"
            data-name="Path 116"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M304.607,711.315h-2.139v-4.126a2.142,2.142,0,0,1,1.517-2.048l.458-.14a2.142,2.142,0,0,0,1.517-2.048"
          />
          <Path
            id="Path_117"
            data-name="Path 117"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M311.148,711.315h3.911v-4.126a2.14,2.14,0,0,0-1.517-2.048l-.458-.14a2.142,2.142,0,0,1-1.517-2.048"
          />
          <Rect
            id="Rectangle_55"
            data-name="Rectangle 55"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            width="8.455"
            height="9.143"
            rx="4.081"
            transform="translate(304.474 694.598)"
          />
        </G>
      </Svg>
    </View>
  );
}
export default Artist;
