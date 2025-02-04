import { useGSAP } from "@gsap/react";
import { Box } from "@mui/material";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrail, a } from "@react-spring/web";

// * hooks
import usePageTransition from "./usePageTransition";

// * components
import Router from "../../../routes/Router";
import NavBar from "../navBar/NavBar";

// * statics
import routes from "../../../../routes";
import { colors, fonts } from "../../../../settings";
const fast = { tension: 1200, friction: 40 };
const slow = { mass: 10, tension: 200, friction: 50 };
const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

//=STRT ================================
const PageTransition = () => {
  //=y State
  //y *********************************************************
  const history = useNavigate();
  const { newLocation, setCurrentLocation } = usePageTransition();
  const [stateSize, setStateSize] = useState(20);
  const [trail, api] = useTrail(3, (i) => ({
    xy: [0, 0],
    config: i === 0 ? fast : slow,
  }));

  //=? Cycle
  //? *********************************************************
  useGSAP(
    () => {
      if (newLocation) {
        const tl = gsap.timeline({});
        tl.set("body", { overflow: "hidden" });
        tl.set("#circle_peach", { opacity: 1 });
        tl.to(
          "#circle_peach",
          {
            clipPath: "circle(100% at 50% 50%)",
            duration: 1,
            ease: "power4.in",
            onComplete: () => {
              history(newLocation);
            },
          },
          "<+=0.5"
        );
        tl.to("#circle_peach", {
          clipPath: "circle(0% at 50% 50%)",
          duration: 1.5,
          delay: 0,
          ease: "power3.in",
          onComplete: () => {
            gsap.set("body", { overflow: "auto" });
            setCurrentLocation(newLocation);
          },
        });
        tl.to("#circle_peach", {
          opacity: 0,
          duration: 0.5,
          delay: 1,
          ease: "power3.in",
        });
      }
    },
    { dependencies: [newLocation] }
  );

  //? *********************************************************
  useGSAP(() => {
    let mouseX = 0;
    let mouseY = 0;

    const mouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      const circleX = mouseX - 1500;
      const circleY = mouseY - 1500;

      const peachCircle = document.getElementById("circle_peach");

      if (peachCircle) {
        peachCircle.style.left = circleX + "px";
        peachCircle.style.top = circleY + "px";
      }
      if (window.innerWidth > 540) {
        api.start({
          xy: [event.clientX, event.clientY],
        });
        setStateSize(20);
      } else {
        setStateSize(0);
      }
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  });

  //=+ Handlers
  //+ *********************************************************

  //=g Utils
  //g *********************************************************

  //=o Variables
  //o *********************************************************

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Router />

        {trail.map((props, index) => (
          <a.div
            key={index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              transform: props.xy.to(trans),
              width: stateSize,
              height: stateSize,
              borderRadius: "50%",
              background: `${colors.logoPrimary}DD`,
              mixBlendMode: "difference",
              opacity: 0.5,
              zIndex: 500,
              pointerEvents: "none",
            }}
          ></a.div>
        ))}

        <div id="circle_peach">
          <div id="circle_peach_content">
            <Box
              sx={{
                fontFamily: fonts.title,
                padding: 3,
                color: colors.logoSecondary,
                fontSize: "3.5rem",
              }}
            >
              {routes[newLocation]?.label.toUpperCase()}
            </Box>
          </div>
        </div>
      </Box>

      <NavBar />
    </>
  );
};

export default PageTransition;
