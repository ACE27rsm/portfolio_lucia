import { Box } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";

//* static
import { colors, fonts } from "../../settings";
import usePageTransition from "./components/transition/usePageTransition";

//=b css
const style = (theme) => {
  const pad = theme.spacing(5);

  return {
    root: {
      padding: pad,
      position: "relative",
      background: colors.background,
      minHeight: "100svh",
      width: "100vw",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
      },
    },

    section: {
      background: colors.background,
      fontFamily: fonts.title,
      padding: theme.spacing(3),
      color: colors.orangeBackground,
      position: "absolute",
      top: 0,
      right: 0,
      fontSize: "1.5rem",
      textAlign: "end",
      minWidth: 160,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 70% 100%, 70% 60%, 0% 60%)",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0),
        clipPath:
          "polygon(0% 0%, 100% 0%, 100% 100%, 85% 100%, 85% 80%, 0% 80%)",
      },
    },

    children: {
      paddingTop: pad / 1.5,
      border: "2px solid",
      borderColor: colors.orangeBackground,
      minHeight: `calc(100svh - ${pad * 2}px)`,
      padding: pad / 2,
      [theme.breakpoints.down("xs")]: {
        paddingTop: pad,
        minHeight: `calc(100svh - ${pad}px)`,
        padding: pad / 4,
      },
    },
  };
};

//=STRT ================================
const Layout = ({ classes, section, children }) => {
  //=y State

  //=? Cycle
  useEffect(() => window.scrollTo(0, 0), [section]);

  //=+ Handlers

  //=g Utils

  //=o Variables

  return (
    <>
      <motion.div
        className={classes.root}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            background: colors.background,

            padding: 2,
            clipPath:
              "polygon(0% 0%, 100% 0%, 100% 70%, 70% 70%, 70% 100%, 0% 100%)",
          }}
        >
          <img
            src="/logos/logo_lucia2d.svg"
            style={{ width: "50px", height: "auto" }}
            alt="logo"
          />
        </Box>
        <Box className={classes.section}>{section}</Box>
        <Box className={classes.children}>
          <Box style={{ position: "relative" }}>{children}</Box>
        </Box>
      </motion.div>
    </>
  );
};

//=+ REDUX ----------------------------------------
const mapStateToProps = (state, ownProps) => {
  return {
    ui: state.ui,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Layout));
