import { useAnimationFrame } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

import { colors } from "../../../../settings";

const Background = () => {
  //y *********************************************************
  const [stateMouse, setStateMouse] = useState({ x: 0, y: 0 });
  const [stateTouch, setStateTouch] = useState({ x: 0, y: 0 });
  const backgroundRef = useRef(null);

  useAnimationFrame((time, delta) => {
    if (backgroundRef.current) {
      let centerX = 0;
      let centerY = 0;
      let deltaX = stateMouse.x - centerX;
      let deltaY = stateMouse.y - centerY;

      const rad = Math.atan(deltaY / deltaX);
      const deg = Math.abs(rad * (180 / Math.PI));
      let perc = (Math.abs(deltaX) / window.innerWidth) * 100;

      let final = 0;
      if (deltaX > 0 && deltaY > 0) {
        final = 90 - deg;
      } else if (deltaX > 0 && deltaY < 0) {
        final = 90 + deg;
      } else if (deltaX < 0 && deltaY < 0) {
        final = 90 + deg;
      } else if (deltaX < 0 && deltaY > 0) {
        final = 90 - deg;
      }

      if (window.innerWidth > 540) {
        backgroundRef.current.style.background = `linear-gradient(${final}deg, rgba(204,90,68,1) 0%, rgba(204,90,68,0.5) ${perc}%, rgba(243,231,233,1) 100%)`;
      }
    }
  });

  //=? Cycle
  //? *********************************************************
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    const mouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      setStateMouse({ x: mouseX, y: mouseY });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  //? *********************************************************
  useEffect(() => {
    const touch = (event) => {
      const mouseX = event.touches[0].clientX;
      const mouseY = event.touches[0].clientY;

      let centerX = 0;
      let centerY = 0;
      let deltaX = mouseX - centerX;
      let deltaY = mouseY - centerY;

      const rad = Math.atan(deltaY / deltaX);
      const deg = Math.abs(rad * (180 / Math.PI));
      let perc = (Math.abs(deltaX) / window.innerWidth) * 100;

      let final = 0;
      if (deltaX > 0 && deltaY > 0) {
        final = 90 - deg;
      } else if (deltaX > 0 && deltaY < 0) {
        final = 90 + deg;
      } else if (deltaX < 0 && deltaY < 0) {
        final = 90 + deg;
      } else if (deltaX < 0 && deltaY > 0) {
        final = 90 - deg;
      }

      animate(
        "#background",
        {
          background: `linear-gradient(${final}deg, rgba(204,90,68,1) 0%, rgba(204,90,68,0.5) ${perc}%, rgba(243,231,233,1) 100%)`,
          duration: 2,
        },
        { tramstion: "easeInOut" }
      );
    };

    window.addEventListener("touchstart", touch);

    return () => {
      window.removeEventListener("touchstart", touch);
    };
  }, []);

  return (
    <div
      id="background"
      ref={backgroundRef}
      style={{
        height: "100svh",
        width: "100vw",
        position: "fixed",
        overflow: "hidden",
        background:
          "linear-gradient(330deg, rgba(204,90,68,1) 0%, rgba(204,90,68,1) 26%, rgba(243,231,233,1) 100%)",
      }}
    />
  );
};

export default Background;
