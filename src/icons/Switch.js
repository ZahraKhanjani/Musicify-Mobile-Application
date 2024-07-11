import React from 'react';
import {View} from 'react-native';
import Svg, {Path, Rect} from 'react-native-svg';

function Switch({style, active = false, color = '#fff'}) {
  return (
    <View style={style}>
      {active ? (
        <Svg
          id="Component_20_3"
          data-name="Component 20 – 3"
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="22"
          viewBox="0 0 38 22">
          <Rect
            id="Rectangle_45"
            data-name="Rectangle 45"
            fill={color}
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
        </Svg>
      ) : (
        <Svg
          id="Component_20_4"
          data-name="Component 20 – 4"
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="22"
          viewBox="0 0 38 22">
          <Rect
            id="Rectangle_45"
            data-name="Rectangle 45"
            fill={color}
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
        </Svg>
      )}
    </View>
  );
}

export default Switch;
