import React from 'react';
import {Text as RNText} from 'react-native';

const Text = ({children, ...props}) => <RNText {...props}>{children}</RNText>;

export default Text;
