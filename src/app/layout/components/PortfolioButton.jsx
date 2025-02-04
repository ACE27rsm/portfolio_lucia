import { motion } from "framer-motion";
import React, { useState } from "react";
import { colors } from "../../../settings";

//=STRT ================================
const PortfolioButton = () => {
  //=y State
  //y *********************************************************
  const [stateHover, setStateHover] = useState(false);

  //=? Cycle
  //? *********************************************************

  //=+ Handlers
  //+ *********************************************************

  //=g Utils
  //g *********************************************************

  //=o Variables
  //o *********************************************************

  return (
    <motion.a
      style={{
        textDecoration: "none",
        color: "inherit",
        padding: "10px 20px",
        borderRadius: 10,
      }}
      variants={{
        big: {
          scale: 1.2,
          backgroundColor: "#4b2c20",
          color: colors.background,
        },
        regular: {
          scale: 1,
          backgroundColor: colors.background,
          color: "#4b2c20",
        },
      }}
      initial="regular"
      animate={stateHover ? "big" : "regular"}
      href="/docs/portfolio 2025_Lucia Zavatta.pdf"
      // download
      target="_blank"
      rel="noreferrer noopener"
      onMouseEnter={() => setStateHover(true)}
      onMouseLeave={() => setStateHover(false)}
    >
      Scarica il mio Portfolio
    </motion.a>
  );
};

export default PortfolioButton;
