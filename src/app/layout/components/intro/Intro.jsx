import { useGSAP } from "@gsap/react";
import { Box } from "@mui/material";
import gsap from "gsap";
import React, { useRef } from "react";

// * hooks
import useIntro from "./useIntro";

// * statics
import { colors } from "../../../../settings";
import Background from "../background/Background";

//=STRT ================================
const Intro = ({ children }) => {
  //=y State
  //y *********************************************************
  const bubbleRef = useRef(null);
  const { completeIntro } = useIntro();

  //=? Cycle
  //? *********************************************************
  useGSAP(
    () => {
      const tl = gsap.timeline({});

      tl.set("body", { overflow: "hidden" });
      tl.to("#logo", {
        opacity: 1,
        duration: 1,
      });
      tl.to("#intro", {
        x: "-100vw",
        duration: 2,
        delay: 1,
        ease: "power4.inOut",
      });
      tl.to(
        "#bubble",
        {
          scaleX: 0,
          duration: 4,
          ease: "elastic.inOut",
        },
        1.5
      );
      tl.to(
        "#background",
        {
          opacity: 1,
        },
        4
      );
      tl.to(
        ".site_content",
        {
          pointerEvents: "all",
          opacity: 1,
          duration: 1,
          onComplete: () => {
            completeIntro();
          },
        },
        4.5
      );
      tl.to(".site_content", { pointerEvents: "all" });
      tl.set("#intro", { pointerEvents: "none" });
      tl.set("body", {
        overflow: "auto",
        onComplete: () => {
          completeIntro();
        },
      });
    },
    { dependencies: [] }
  );

  //=+ Handlers
  //+ *********************************************************

  //=g Utils
  //g *********************************************************

  //=o Variables
  //o *********************************************************

  return (
    <>
      <Box id="background" sx={{ opacity: 1, pointerEvents: "none" }}>
        <Background />
      </Box>

      <Box
        id="intro"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100dvh",
          display: "flex",
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
          }}
          id="intro_root"
        >
          <Box
            sx={{
              width: "100dvw",
              height: "100dvh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: colors.orangeBackground,
            }}
          >
            <Box sx={{ width: "50vw", height: "50vh", opacity: 0 }} id="logo">
              <img
                src="/logos/logo_lucia3d.svg"
                alt="logo"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Box>
          </Box>
          {/* 
          <Box
            id="bubble"
            ref={bubbleRef}
            sx={{
              position: "absolute",
              width: "8000px",
              height: "8000px",
              borderRadius: "50%",
              backgroundColor: colors.background,
            }}
          /> */}
          <Box
            sx={{
              position: "absolute",
              right: "-10vw",
              height: "125vh",
              width: "20vw",
              top: "-10%",
              borderRadius: "65%",
              bgcolor: colors.orangeBackground,
            }}
            id="bubble"
          />
        </Box>
      </Box>

      <Box className="site_content" sx={{ opacity: 0, pointerEvents: "none" }}>
        {children}
      </Box>
    </>
  );
};

export default Intro;
