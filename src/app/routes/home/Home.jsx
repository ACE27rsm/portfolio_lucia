import { Box } from "@mui/material";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

//* compnents
import HomeContent from "./components/Home.Content";
import HomeHeader from "./components/Home.Header";

//* static
import { useAnimationFrame } from "framer-motion";
import { colors } from "../../../settings";
import Background from "../../layout/components/background/Background";

//=STRT ================================
const Home = () => {
  //=y State
  //y *********************************************************

  //=? Cycle
  //? *********************************************************

  //=+ Handlers

  //=g Utils

  //=o Variables

  return (
    <>
      <Box
        sx={{
          height: "100svh",
          minHeight: 650,
          display: "flex",
          flexDirection: "column",
          zIndex: 1,
          overflowX: "hidden",
        }}
      >
        
        <HomeHeader />

        <HomeContent />
      </Box>
    </>
  );
};

export default Home;
