import React, { memo } from 'react';
import type { IconProps } from '@tamagui/helpers-icon';
import { Svg, Path, G } from 'react-native-svg';
import { themed } from '@tamagui/helpers-icon';

// Single Lightbulb Icon
const LightbulbIcon = (props) => {
  const { color = 'black', ...otherProps } = props;
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...otherProps}
    >
      <Path
        d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
        stroke={color}
      />
      <Path d="M9 18h6" stroke={color} />
      <Path d="M10 22h4" stroke={color} />
    </Svg>
  );
};

LightbulbIcon.displayName = 'Lightbulb';

// Lightbulb Group Icon
const LightbulbGroupIcon = (props) => {
  const { color = 'black', size = 24, ...otherProps } = props;
  // Adjust the overall width to accommodate the side-by-side, slightly overlapping icons
  const overallWidth = size * 1.5; // Adjust based on desired overlap
  return (
    <Svg
      width={overallWidth} // Adjusted width
      height={size} // Height remains the same for a single icon size
      viewBox={`0 0 ${overallWidth} ${size}`} // Adjust viewBox accordingly
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...otherProps}
    >
      {/* Render the third icon (smallest and furthest back) */}
      <G transform={`translate(${size * 0.6}, 0) scale(0.9)`}>
        <LightbulbIcon color={color} fill="#fff" />
      </G>
      {/* Render the second icon */}
      <G transform={`translate(${size * 0.3}, 0) scale(0.95)`}>
        <LightbulbIcon color={color} fill="#fff" />
      </G>
      {/* Render the first icon (largest and at the front) */}
      <G transform="translate(0,0) scale(1)">
        <LightbulbIcon color={color} fill="#fff" />
      </G>
    </Svg>
  );
};

LightbulbGroupIcon.displayName = 'LightbulbGroup';

// Export both icons
export const Lightbulb = memo<IconProps>(themed(LightbulbIcon));
export const LightbulbGroup = memo<IconProps>(themed(LightbulbGroupIcon));
