import React from "react";
import Antigravity from "../assets/Antigravity";

const AppBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Antigravity
        count={300}
        magnetRadius={6}
        ringRadius={7}
        waveSpeed={0.4}
        waveAmplitude={1}
        particleSize={1.5}
        lerpSpeed={0.05}
        color="#14ef76"
        autoAnimate
        particleVariance={1}
        rotationSpeed={0}
        depthFactor={1}
        pulseSpeed={3}
        particleShape="capsule"
        fieldStrength={10}
      />
    </div>
  );
};

export default AppBackground;