import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";

// * hooks
import usePageTransition from "../../../layout/components/transition/usePageTransition";

// * statics
import { colors } from "../../../../settings";
import routes from "../../../../routes";
import { Box } from "@mui/material";

export const NabButtonContent = ({ handleNav, setStateHover, route }) => {
  return (
    <Box
      sx={{
        width: { xs: 80, md: 120 },
        height: { xs: 80, md: 120 },
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          background: colors.background,
          borderRadius: 4,
          border: `1px solid ${colors.logoPrimary}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        whileHover={{
          boxShadow: "0px 0px 0px 0px rgba(61,161,251,1)",
          y: 3,
          x: 3,
        }}
        whileTap={{
          boxShadow: "0px 0px 0px 0px rgba(61,161,251,1)",
          y: 3,
          x: 3,
        }}
        initial={{
          boxShadow: "5px 5px 0px 0px rgba(61,161,251,1)",
          x: 0,
          y: 0,
        }}
        onClick={handleNav}
        onHoverStart={() => setStateHover(true)}
        onHoverEnd={() => setStateHover(false)}
      >
        <Box
          as="img"
          sx={{
            width: { xs: "50%", md: "70%" },
            height: { xs: "50%", md: "70%" },
            objectFit: "contain",
          }}
          src={route.icon}
          alt={route.label}
        />
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            fontSize: 10,
            textUnderline: "none",
            mt: 0.5,
            color: colors.logoPrimary,
          }}
        >
          {route.label2 || route.label}
        </Box>
      </motion.div>
    </Box>
  );
};

const HomeContentNavButton = ({ path }) => {
  //=y State
  //y *********************************************************
  const [stateHover, setStateHover] = useState(false);
  const { navigate } = usePageTransition();

  //=? Cycle
  //? *********************************************************

  //=+ Handlers
  //+ *********************************************************
  const handleNav = useCallback(() => {
    navigate(path);
  }, [navigate, path]);

  //=g Utils
  //g *********************************************************

  //=o Variables
  //o *********************************************************
  const route = routes[path];

  return (
    <motion.div
      className="home-content-nav-button"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
      initial={{ x: 1000 }}
    >
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.5 }}
          animate={stateHover ? "visible" : "hidden"}
          initial="hidden"
        >
          <Box
            sx={{
              color: colors.logoPrimary,
              fontSize: "2.5rem",
              fontWeight: "medium",
            }}
          >
            {route.label}
          </Box>
        </motion.div>
      </Box>

      {path === "/portfolioButton" ? (
        <Box
          as="a"
          href="/docs/portfolio 2025_Lucia Zavatta.pdf"
          target="_blank"
          rel="noreferrer noopener"
        >
          <NabButtonContent
            handleNav={() => {}}
            setStateHover={setStateHover}
            route={route}
          />
        </Box>
      ) : (
        <Box>
          <NabButtonContent
            handleNav={handleNav}
            setStateHover={setStateHover}
            route={route}
          />
        </Box>
      )}
    </motion.div>
  );
};

export default HomeContentNavButton;
