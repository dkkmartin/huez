import Svg, { Path } from 'react-native-svg';

export function HueBridgeSVG(props) {
  const { color = 'black', size = 24, ...otherProps } = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...otherProps}
    >
      <Path
        stroke={color}
        d="M17.7,4.4c-0.53,0-0.95-0.42-0.95-0.95S17.18,2.5,17.7,2.5s0.95,0.42,0.95,0.95S18.23,4.4,17.7,4.4z M12,8.2 c2.1,0,3.8,1.7,3.8,3.8s-1.7,3.8-3.8,3.8S8.2,14.1,8.2,12S9.9,8.2,12,8.2z M12,17.7c-3.15,0-5.7-2.56-5.7-5.7S8.85,6.3,12,6.3 s5.7,2.56,5.7,5.7S15.15,17.7,12,17.7 M5.35,3.45c0-0.53,0.42-0.95,0.95-0.95s0.95,0.42,0.95,0.95S6.82,4.4,6.3,4.4 S5.35,3.97,5.35,3.45 M12,2.5c0.53,0,0.95,0.42,0.95,0.95S12.53,4.4,12,4.4s-0.95-0.42-0.95-0.95S11.47,2.5,12,2.5 M19.6,0.59H4.4 c-2.09,0-3.8,1.71-3.8,3.8V19.6c0,2.09,1.71,3.8,3.8,3.8h15.2c2.09,0,3.8-1.71,3.8-3.8V4.4C23.41,2.31,21.69,0.59,19.6,0.59"
      />
    </Svg>
  );
}
