// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Line, Path, G, Circle} from 'react-native-svg';

function Home({style, active = true, color = '#fff'}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="20.032"
        height="22.32"
        viewBox="0 0 20.032 22.32">
        <G
          id="Component_1_9"
          data-name="Component 1 – 9"
          transform="translate(-0.5)">
          <Path
            id="Path_27"
            data-name="Path 27"
            stroke={active ? 'none' : color}
            fill={active ? color : 'none'}
            d="M124.883,554.948l-6.726-5.449a3.288,3.288,0,0,0-4.142,0l-6.726,5.449a3.291,3.291,0,0,0-1.219,2.557v12.011a1.568,1.568,0,0,0,1.569,1.569h5.295V566.3a3.152,3.152,0,0,1,3.152-3.152h0a3.151,3.151,0,0,1,3.151,3.152v4.78h5.3a1.568,1.568,0,0,0,1.569-1.569V557.505A3.291,3.291,0,0,0,124.883,554.948Z"
            transform="translate(-105.57 -548.765)"
          />
        </G>
      </Svg>
    </View>
  );
}
export default Home;
