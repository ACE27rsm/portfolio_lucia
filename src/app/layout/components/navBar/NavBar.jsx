import { animate, motion, stagger } from "framer-motion";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

// * statics
import routes from "../../../../routes";
import { colors } from "../../../../settings";

// * hooks
import useIntro from "../intro/useIntro";
import usePageTransition from "../transition/usePageTransition";

const NabButtonContent = ({ handleNav, setStateHover, route }) => {
  return (
    <Box
      sx={{
        width: { xs: 70, md: 120 },
        height: { xs: 70, md: 120 },
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
        onClick={() => handleNav(route.path)}
        onHoverStart={() => setStateHover(route)}
        onHoverEnd={() => setStateHover(null)}
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

const NavBar = () => {
  //=y State
  //y *********************************************************
  const [stateHover, setStateHover] = useState(null);
  const { navigate, currentLocation } = usePageTransition();
  const { introDone } = useIntro();
  const [stateStagger, setStateStagger] = useState(false);
  const location = useLocation();

  //? *********************************************************
  useEffect(() => {
    if (stateStagger) {
      animate(".navbar_menu", { y: 0 }, { delay: stagger(0.2) });
    } else {
      animate(".navbar_menu", { y: 300 }, { delay: stagger(0.2) });
    }
  }, [stateStagger]);

  //? *********************************************************
  useEffect(() => {
    if (currentLocation) {
      if (window.location.pathname !== "/") {
        setStateStagger(true);
      }
    }
  }, [currentLocation]);

  //? *********************************************************
  useEffect(() => {
    if (introDone) {
      if (window.location.pathname !== "/") {
        setStateStagger(true);
      }
    }
  }, [introDone]);

  //=+ Handlers
  //+ *********************************************************
  const handleNav = useCallback(
    (path) => {
      setStateStagger(false);

      navigate(path);
    },
    [navigate]
  );

  //o *********************************************************
  const filteredRoutes = useMemo(() => {
    const routesArray = Object.values(routes);

    return routesArray.filter((route) => route.path !== location.pathname);
  }, [location.pathname]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        padding: 10,
        width: "100vw",
        pointerEvents: "none",
        left: 0,
        display: "flex",
        justifyContent: "center",
        gap: 20,
      }}
    >
      {filteredRoutes.map((route) => {
        return (
          <motion.div
            className="navbar_menu"
            key={route.path}
            style={{ pointerEvents: "all" }}
            initial={{ y: 300 }}
          >
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <motion.div
                style={{
                  textAlign: "center",
                  color: colors.logoPrimary,
                  fontWeight: 400,
                  mb: 1,
                  display: "flex",
                  justifyContent: "center",
                }}
                initial={{ opacity: 0, x: 3 }}
                animate={{
                  x: 3,
                  opacity: stateHover?.path === route.path ? 1 : 0,
                }}
              >
                <Box
                  sx={{
                    width: "fit-content",
                    bgcolor: `${colors.background}AA`,
                    lineHeight: 0.7,
                    p: 0.3,
                    borderRadius: 1,
                  }}
                >
                  {route.label2 || route.label}
                </Box>
              </motion.div>
            </Box>

            {route.path === "/portfolioButton" ? (
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
      })}
    </div>
  );
};

export default NavBar;
