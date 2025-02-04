import { motion } from "framer-motion";
import React, { useCallback, useState } from "react";
import { Box } from "@mui/material";

// * statics
import routes from "../../../../routes";
import { colors } from "../../../../settings";

// * hooks
import usePageTransition from "../transition/usePageTransition";

//=STRT ================================
const NavButton = ({ path }) => {
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
      style={{
        width: 150,
        height: 150,
        background: "white",
        borderRadius: 4,
        border: `1px solid ${colors.logoPrimary}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      variants={{
        normal: {
          "-webkit-box-shadow": "5px 5px 0px 0px rgba(130,57,43,1)",
          "-moz-box-shadow": "5px 5px 0px 0px rgba(130,57,43,1)",
          boxShadow: "5px 5px 0px 0px rgba(130,57,43,1)",
          x: 0,
          y: 0,
        },
        hover: {
          "-webkit-box-shadow": "0px 0px 0px 0px rgba(130,57,43,1)",
          "-moz-box-shadow": "0px 0px 0px 0px rgba(130,57,43,1)",
          boxShadow: "0px 0px 0px 0px rgba(130,57,43,1)",
          y: 3,
          x: 3,
        },
      }}
      animate={stateHover ? "hover" : "normal"}
      initial="normal"
      onMouseEnter={() => setStateHover(true)}
      onMouseLeave={() => setStateHover(false)}
      onMouseDown={() => setStateHover(true)}
      onMouseUp={() => setStateHover(false)}
      onKeyDown={() => setStateHover(true)}
      onKeyUp={() => setStateHover(false)}
      onTouchStart={() => setStateHover(true)}
      onTouchEnd={() => setStateHover(false)}
      onClick={handleNav}
    >
     
      <img
        style={{ width: "100%", height: "100%" }}
        src={route.icon}
        alt={route.label}
      />
    </motion.div>
  );
};

export default NavButton;
