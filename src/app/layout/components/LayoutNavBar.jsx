import React, { useState, useEffect, createRef } from "react";
import { Box } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import { withRouter } from "react-router-dom";
import clsx from "clsx";
import { a, config, useTransition } from "@react-spring/web";

//* hooks
import usePageTransition from "./transition/usePageTransition";

//=b css
const style = (theme) => {
  let size = 100;

  // if (theme.breakpoints.down("lg") === "@media (max-width:1919.95px)") {
  //   size = 100;
  // } else if (theme.breakpoints.down("sm") === "@media (max-width:959.95px)") {
  //   size = 80;
  // } else if (theme.breakpoints.down("xs") === "@media (max-width:599.95px)") {
  //   size = 70;
  // }

  return {
    rootNav: {
      position: "fixed",
      bottom: 30,
      left: `calc(50vw - ${size / 2}px)`,
    },

    "@keyframes leftIcon": {
      "0%": { opacity: 0, left: 0 },
      "100%": {
        opacity: 1,
        left: -size,
      },
    },

    "@keyframes leftIconReverse": {
      "0%": {
        opacity: 1,
        left: -size,
      },
      "90%": {
        opacity: 1,
        left: -size,
      },
      "100%": { opacity: 0, left: 0 },
    },

    "@keyframes topIcon": {
      "0%": { opacity: 0, top: 0 },
      "25%": {
        opacity: 0,
        top: 0,
        left: size * Math.cos(3.14159),
      },
      "55%": {
        opacity: 0.3,
        top: -size * Math.sin(2.79253),
        left: size * Math.cos(2.79253),
      },
      "70%": {
        opacity: 0.7,
        top: -size * Math.sin(2.35619),
        left: size * Math.cos(2.35619),
      },
      "85%": {
        opacity: 0.7,
        top: -size * Math.sin(1.8326),
        left: size * Math.cos(1.8326),
      },
      "100%": {
        opacity: 1,
        top: -size * Math.sin(1.5708),
        left: size * Math.cos(1.5708),
      },
    },

    "@keyframes topIconReverse": {
      "0%": {
        opacity: 1,
        top: -size * Math.sin(1.5708),
        left: size * Math.cos(1.5708),
      },
      "30%": {
        opacity: 1,
        top: -size * Math.sin(1.5708),
        left: size * Math.cos(1.5708),
      },
      "45%": {
        opacity: 1,
        top: -size * Math.sin(1.8326),
        left: size * Math.cos(1.8326),
      },
      "60%": {
        opacity: 0.7,
        top: -size * Math.sin(2.35619),
        left: size * Math.cos(2.35619),
      },
      "75%": {
        opacity: 0.3,
        top: -size * Math.sin(2.79253),
        left: size * Math.cos(2.79253),
      },

      "90%": {
        opacity: 0,
        top: 0,
        left: size * Math.cos(3.14159),
      },
      "100%": { opacity: 0, top: 0 },
    },

    "@keyframes rightIcon": {
      "0%": {
        opacity: 0,
        top: -size * Math.sin(1.5708),
        left: size * Math.cos(1.5708),
      },
      "35%": {
        opacity: 0,
        top: -size * Math.sin(1.5708),
        left: size * Math.cos(1.5708),
      },
      "55%": {
        opacity: 0,
        top: -size * Math.sin(1.309),
        left: size * Math.cos(1.309),
      },
      "70%": {
        opacity: 0.7,
        top: -size * Math.sin(0.785398),
        left: size * Math.cos(0.785398),
      },
      "85%": {
        opacity: 1,
        top: -size * Math.sin(0.349066),
        left: size * Math.cos(0.349066),
      },
      "100%": {
        opacity: 1,
        top: -size * Math.sin(0),
        left: size * Math.cos(0),
      },
    },

    "@keyframes rightIconReverse": {
      "0%": {
        opacity: 1,
        top: -size * Math.sin(0),
        left: size * Math.cos(0),
      },

      "5%": {
        opacity: 1,
        top: -size * Math.sin(0),
        left: size * Math.cos(0),
      },

      "15%": {
        opacity: 1,
        top: -size * Math.sin(0.349066),
        left: size * Math.cos(0.349066),
      },

      "25%": {
        opacity: 0.7,
        top: -size * Math.sin(0.785398),
        left: size * Math.cos(0.785398),
      },

      "35%": {
        opacity: 0,
        top: -size * Math.sin(1.309),
        left: size * Math.cos(1.309),
      },

      "55%": {
        opacity: 0,
        top: -size * Math.sin(1.5708),
        left: size * Math.cos(1.5708),
      },

      "100%": {
        opacity: 0,
        top: -size * Math.sin(1.5708),
        left: size * Math.cos(1.5708),
      },
    },

    "@keyframes iconTooltip": {
      "0%": { opacity: 0 },
      "80%": { opacity: 0 },
      "100%": { opacity: 1 },
    },
    "@keyframes iconTooltipReverse": {
      "0%": { opacity: 1 },
      "20%": { opacity: 0 },
      "100%": { opacity: 0 },
    },

    "@keyframes root": {
      "0%": { opacity: 0 },
      "90%": { opacity: 0 },
      "100%": { opacity: 1 },
    },

    rootIconContainer: {
      width: size,
      height: size,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      // animationName: "$root",
      // animationDuration: "2.2s",
      // animationTimingFunction: "linear",
      // animationFillMode: "forwards",
      // background: "red",
      position: "relative",
      "& .navIconTooltip": {
        position: "absolute",
        opacity: 1,
        top: -30,
        color: "white",
        borderRadius: 10,
      },
    },

    clickable: {
      cursor: "pointer",
    },

    menuOpen: {
      "& .navIconTooltip": {
        animationName: "$iconTooltip",
        animationDuration: "1s",
        animationTimingFunction: "linear",
        animationFillMode: "forwards",
      },
      "& .navIconTop": {
        animationName: "$topIcon",
        animationDuration: "1s",
        animationTimingFunction: "linear",
        animationFillMode: "forwards",
      },

      "& .navIconRight": {
        animationName: "$rightIcon",
        animationDuration: "1.7s",
        animationTimingFunction: "linear",
        animationFillMode: "forwards",
      },

      "& .navIconLeft": {
        animationName: "$leftIcon",
        animationDuration: "0.2s",
        animationTimingFunction: "linear",
        animationFillMode: "forwards",
      },
    },

    menuClose: {
      "& .navIconTooltip": {
        animationName: "$iconTooltipReverse",
        animationDuration: "1s",
        animationTimingFunction: "linear",
        animationFillMode: "forwards",
      },
      "& .navIconLeft": {
        animationName: "$leftIconReverse",
        animationDuration: "1s",
        animationTimingFunction: "linear",
        animationFillMode: "forwards",
      },
      "& .navIconTop": {
        animationName: "$topIconReverse",
        animationDuration: "1s",
        animationTimingFunction: "linear",
        animationFillMode: "forwards",
      },
      "& .navIconRight": {
        animationName: "$rightIconReverse",
        animationDuration: "1s",
        animationTimingFunction: "linear",
        animationFillMode: "forwards",
      },
    },

    iconContainer: {
      width: size,
      height: size,
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    iconRoot: {
      background: "rgba(255,255,255,0.8)",
      boxShadow: theme.shadows[2],
      borderRadius: "50%",
      transition: "0.4s",
      position: "absolute",
    },

    navIcon: {
      position: "absolute",
      borderRadius: "50%",
    },

    navIconLeft: {
      left: -size,
      top: 0,
    },
    navIconRight: {
      left: size,
      top: 0,
    },
    navIconTop: {
      top: -size,
      left: 0,
    },
  };
};

//g --------------------------------------
const NavIcon = withStyles(style)(({ classes, icon, onClick, label }) => (
  <Box
    width={!label ? 1 : "70%"}
    height={!label ? 1 : "70%"}
    className={classes.iconRoot}
    zIndex={1000}
    onClick={onClick}
    position="relative"
    display="flex"
    justifyContent="center"
    alignItems="center"
    style={{
      WebkitTapHighlightColor: "rgba(0,0,0,0)",
      WebkitTapHighlightColor: "transparent",
    }}
  >
    {label && (
      <Box
        className={clsx("navIconTooltip")}
        textAlign="center"
        width="100%"
        fontWeight="bold"
        style={{
          WebkitTapHighlightColor: "rgba(0,0,0,0)",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {label}
      </Box>
    )}
    <img src={icon} alt={icon} style={{ width: "90%", height: "90%" }} />
  </Box>
));

//=STRT ================================
const LayoutNavBar = ({ classes, location, history }) => {
  //=y State
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(null);
  const { navigate } = usePageTransition();
  // const [disableTimeout, setDisableTimeout] = useState(null);

  const transition = useTransition(open, {
    from: {
      opacity: 0,
      leftLeft: 1.5708,
      leftBottom: 1.5708,
      rightLeft: 1.5708,
      rightTop: 1.5708,
      topTop: 0,
      topLeft: 3.14159,
    },
    enter: {
      opacity: 1,
      leftLeft: 0,
      leftBottom: 0,
      rightLeft: 0,
      rightTop: 0,
      topTop: 1.5708,
      topLeft: 1.5708,
    },
    leave: {
      opacity: 0,
      leftLeft: 1.5708,
      leftBottom: 1.5708,
      rightLeft: 1.5708,
      rightTop: 1.5708,
      topTop: 0,
      topLeft: 3.14159,
    },
    reverse: open,
    delay: 200,
    config: config.slow,
    // onRest: () => setOpen(!open),
  });

  //=? Cycle
  // useEffect(
  //   () => () => {
  //     if (disableTimeout) {
  //       clearTimeout(disableTimeout);
  //     }
  //   },
  //   [disableTimeout]
  // );

  //=+ Handlers
  //+ ******************************************************************
  const handleToggleMenu = () => {
    if (!disabled) {
      setOpen((prevState) => !Boolean(prevState));
    }
  };

  //+ ******************************************************************
  const handleNavigate = (path) => {
    navigate(path);
  };
  //=g Utils

  //=o Variables
  let icon = null;
  let leftIcon = null;
  let rightIcon = null;
  let leftNavigate = null;
  let rightNavigate = null;
  let rightLabel = "";
  let leftLabel = "";

  if (location.pathname === "/portfolio") {
    icon = "icons/portfolio.svg";
    leftIcon = "icons/skills.svg";
    leftNavigate = "/cosafaccio";
    leftLabel = "Competenze";
    rightIcon = "icons/contatti.svg";
    rightNavigate = "/contatti";
    rightLabel = "Contatti";
  } else if (location.pathname === "/cosafaccio") {
    icon = "icons/skills.svg";
    leftIcon = "icons/portfolio.svg";
    leftNavigate = "/portfolio";
    leftLabel = "Portfolio";
    rightIcon = "icons/contatti.svg";
    rightNavigate = "/contatti";
    rightLabel = "Contatti";
  } else if (location.pathname === "/contatti") {
    icon = "icons/contatti.svg";
    leftIcon = "icons/portfolio.svg";
    leftNavigate = "/portfolio";
    leftLabel = "Portfolio";
    rightIcon = "icons/skills.svg";
    rightNavigate = "/cosafaccio";
    rightLabel = "Competenze";
  }

  return (
    <>
      {icon && (
        <Box
          className={classes.rootNav}
          style={{
            WebkitTapHighlightColor: "rgba(0,0,0,0)",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <Box
            className={clsx(
              classes.rootIconContainer,
              !disabled && classes.clickable,
              open && classes.menuOpen,
              !open && open !== null && classes.menuClose
            )}
            onClick={handleToggleMenu}
          >
            <Box position="relative">
              <Box className={classes.iconContainer}>
                <NavIcon icon={icon} />
              </Box>

              {transition(
                (style, item) =>
                  item && (
                    <>
                      {/* //=? Top Icon */}
                      <a.div
                        className={clsx(classes.navIcon, classes.navIconTop)}
                        style={{
                          ...style,
                          left: style.topLeft.to(
                            (left) => 100 * Math.cos(left)
                          ),
                          top: style.topTop.to((top) => -100 * Math.sin(top)),
                        }}
                      >
                        <Box className={classes.iconContainer}>
                          <NavIcon
                            icon="/icons/home.svg"
                            onClick={() => handleNavigate("/")}
                            label="Home"
                          />
                        </Box>
                      </a.div>

                      {/* //=? Left Icon */}
                      <a.div
                        className={clsx(classes.navIcon, classes.navIconLeft)}
                        style={{
                          ...style,
                          left: style.leftLeft.to(
                            (left) => -100 * Math.cos(left)
                          ),
                          top: style.leftBottom.to(
                            (bottom) => 100 * Math.sin(bottom)
                          ),
                        }}
                      >
                        <Box className={classes.iconContainer}>
                          <NavIcon
                            icon={leftIcon}
                            onClick={() => handleNavigate(leftNavigate)}
                            label={leftLabel}
                          />
                        </Box>
                      </a.div>

                      {/* //=? Right Icon */}
                      <a.div
                        className={clsx(classes.navIcon, classes.navIconRight)}
                        style={{
                          ...style,
                          left: style.rightLeft.to(
                            (left) => 100 * Math.cos(left)
                          ),
                          top: style.rightTop.to((top) => -100 * Math.sin(top)),
                        }}
                      >
                        <Box className={classes.iconContainer}>
                          <NavIcon
                            icon={rightIcon}
                            onClick={() => handleNavigate(rightNavigate)}
                            label={rightLabel}
                          />
                        </Box>
                      </a.div>
                    </>
                  )
              )}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default withStyles(style)(withRouter(LayoutNavBar));
