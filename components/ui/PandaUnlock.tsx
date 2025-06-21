import React from "react";
import Svg, { Circle, Ellipse, Path, Rect } from "react-native-svg";

const PandaUnlock = () => {
  return (
    <Svg width="200" height="200" viewBox="0 0 200 200" fill="none">
      {/* Head */}
      <Circle
        cx="100"
        cy="100"
        r="60"
        fill="#fff"
        stroke="#000"
        strokeWidth="3"
      />

      {/* Eyes */}
      <Ellipse cx="75" cy="90" rx="10" ry="14" fill="#000" />
      <Ellipse cx="125" cy="90" rx="10" ry="14" fill="#000" />

      {/* Pupils */}
      <Circle cx="75" cy="92" r="4" fill="#fff" />
      <Circle cx="125" cy="92" r="4" fill="#fff" />

      {/* Ears */}
      <Circle cx="60" cy="50" r="15" fill="#000" />
      <Circle cx="140" cy="50" r="15" fill="#000" />

      {/* Nose */}
      <Ellipse cx="100" cy="110" rx="6" ry="4" fill="#000" />

      {/* Mouth */}
      <Path
        d="M90 125 Q100 135 110 125"
        stroke="#000"
        strokeWidth="2"
        fill="none"
      />

      {/* Body */}
      <Ellipse
        cx="100"
        cy="170"
        rx="40"
        ry="20"
        fill="#fff"
        stroke="#000"
        strokeWidth="2"
      />

      {/* Lock */}
      <Rect x="85" y="140" width="30" height="30" rx="5" fill="#22c065" />
      <Path
        d="M92 140 v-10 a8 8 0 0 1 16 0 v10"
        stroke="#000"
        strokeWidth="2"
        fill="none"
      />
    </Svg>
  );
};

export default PandaUnlock;
