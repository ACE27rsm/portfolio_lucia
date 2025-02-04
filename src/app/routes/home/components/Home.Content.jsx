import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { stagger, animate } from "framer-motion";
import { motion } from "framer-motion";

// * hooks
import useIntro from "../../../layout/components/intro/useIntro";
import usePageTransition from "../../../layout/components/transition/usePageTransition";

// * statics
import { colors } from "../../../../settings";

// * components
import NavButton from "./Home.Content.NavButton";

const HomeContent = () => {
  //y *********************************************************
  const { introDone } = useIntro();
  const [stateStagger, setStateStagger] = useState(false);
  const { currentLocation } = usePageTransition();

  //=? Cycle
  //? *********************************************************
  useEffect(() => {
    if (stateStagger) {
      animate(
        "#home-content-nav .home-content-nav-button",
        {
          x: 0,
        },
        { delay: stagger(0.25), duration: 1, type: "spring", bounce: 0.1 }
      );
    } else {
      animate(
        "#home-content-nav .home-content-nav-button",
        {
          x: 1000,
        },
        { duration: 0 }
      );
    }
  }, [stateStagger]);

  //? *********************************************************
  useEffect(() => {
    if (currentLocation) {
      if (currentLocation === "/") {
        setStateStagger(true);
      } else {
        setStateStagger(false);
      }
    }
  }, [currentLocation]);

  //? *********************************************************
  useEffect(() => {
    if (introDone) {
      if (!currentLocation || currentLocation === "/") {
        setStateStagger(true);
      }
    }
  }, [introDone]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: 1,
          overflowX: "hidden",
          justifyContent: { xs: "space-between", lg: "center" },
          alignItems: "stretch",
          px: { xs: 2, lg: 10 },
          py: 0,
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            flexGrow: { xs: 0, lg: 1 },
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            alignItems: { xs: "flex-end", lg: "center" },
            justifyContent: { xs: "flex-end", lg: "flex-start" },
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            width={1}
            color={colors.logoPrimary}
            fontWeight={700}
            sx={{ flexGrow: { xs: 0, lg: 1 }, cursor: "default" }}
            className="unselect_text"
          >
            <Box
              sx={{
                fontSize: { xs: "2.5rem", lg: "11rem" },
                lineHeight: { xs: "2.5rem", lg: "8rem" },
                textAlign: "start",
                pl: { xs: 0, lg: 2 },
              }}
            >
              <Box>GRAPHIC</Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "-webkit-text-stroke": {
                    xs: `1px ${colors.logoPrimary}`,
                    md: "unset",
                  },
                  textStroke: { xs: `1px ${colors.logoPrimary}`, md: "unset" },
                }}
              >
                <motion.div
                  style={{
                    color: colors.orangeBackground,
                    mixBlendMode: "multiply",
                  }}
                  initial={{ x: -1000 }}
                  animate={{ x: introDone ? 0 : -1000 }}
                  transition={{ duration: 0.5 }}
                >
                  &
                </motion.div>
                WEB
              </Box>
              <Box>DESIGNER</Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: { xs: 3, lg: 2 },
            mt: { xs: 2, lg: 0 },
            flexWrap: "wrap",
            maxWidth: "100vw",
            pr: { xs: 0, lg: 3 },
            width: "fit-content",
          }}
          id="home-content-nav"
        >
          <NavButton path="/portfolioButton" />
          <NavButton path="/cosafaccio" />
          <NavButton path="/competenze" />
          <NavButton path="/contatti" />
        </Box>
      </Box>
    </>
  );
};

export default HomeContent;
