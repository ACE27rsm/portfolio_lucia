import React, { useState, useEffect, useLayoutEffect } from "react";
import { Box, Typography, Divider } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import VisibilitySensor from "react-visibility-sensor";
import clsx from "clsx";

//* components
import Layout from "../../layout/Layout";

//* satic
import skills from "./static/skillsValues";
import { colors, fonts } from "../../../settings";

//=b css
import "react-image-lightbox/style.css";
import usePageTransition from "../../layout/components/transition/usePageTransition";
const style = (theme) => {
  let height = 100;
  let startWidth = 180;
  let endWidth = 160;

  if (theme.breakpoints.values.xs < window.innerWidth) {
    height = 40;
    startWidth = 180 * 0.4;
    endWidth = 160 * 0.4;
  } else if (theme.breakpoints.values.md < window.innerWidth) {
    height = 60;
    startWidth = 180 * 0.6;
    endWidth = 160 * 0.6;
  } else if (theme.breakpoints.values.lg < window.innerWidth) {
    height = 80;
    startWidth = 180 * 0.8;
    endWidth = 160 * 0.8;
  }
  const finalWidth = startWidth + endWidth;

  return {
    root: {
      color: theme.palette.primary.main,
    },

    firstLetter: {
      fontFamily: fonts.title,
      fontWeight: "bold",
      fontSize: "2rem",
    },

    //b ******* PENCIL ******************************
    pencilStart: {
      height,
      width: startWidth,
    },
    pencilEnd: {
      height,
      width: endWidth,
    },
    pencilCenter: {
      height,
      width: 10,
      transition: "width 2s ease-in",
    },

    pencil6: {
      width: `calc(60% - ${finalWidth}px)`,
    },
    pencil7: {
      width: `calc(70% - ${finalWidth}px)`,
    },
    pencil8: {
      width: `calc(80% - ${finalWidth}px)`,
    },
    pencil9: {
      width: `calc(90% - ${finalWidth}px)`,
    },

    //b ******* TITLE *******************************
    title: {
      marginRight: theme.spacing(2),
      fontSize: "3rem",
      width: 376,
      color: colors.logoPrimary,
      [theme.breakpoints.down("md")]: {
        marginRight: 0,
        marginBottom: theme.spacing(1),
        width: "100%",
        fontSize: "2rem",
      },
      [theme.breakpoints.down("xs")]: {
        marginBottom: theme.spacing(1),
        marginRight: 0,
        width: "100%",
        fontSize: "1.3rem",
      },
    },

    //b ******* VALUE *******************************
    skillValueContainer: {
      fontFamily: fonts.title,
      opacity: 0,
      transition: "opacity 0.2s ease-in",
      transitionDelay: "2s",
      fontSize: "4rem",
      marginLeft: theme.spacing(2),
      textAlign: "end",
      [theme.breakpoints.down("md")]: {
        marginLeft: 0,
        width: "100%",
        fontSize: "2rem",
      },
      [theme.breakpoints.down("xs")]: {
        marginLeft: 0,
        width: "100%",
        fontSize: "1.8rem",
      },
    },

    skillValueContainerVisible: {
      opacity: 1,
      color: colors.logoPrimary,
    },

    //b ******* RULER *******************************
    rulerContainer: {
      opacity: 0.5,
      marginRight: "50px",
      right: 50,
      width: "calc(100% - 360px - 120px)",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
  };
};

//g -------------------------------------------------
const Skill = withStyles(style)(({ classes, title, value }) => {
  //=y State
  const [startTimeOut, setStartTimeOut] = useState(false);
  const [visible, setVisible] = useState(false);

  //=? Cycle
  useEffect(() => {
    let timeout = setTimeout(() => setStartTimeOut(true), 500);

    return () => clearTimeout(timeout);
  }, []);

  //=+ Handlers
  const handleVisible = (isVisible) => {
    if (isVisible && !visible) setVisible(true);
  };

  return (
    <Box color="primary.main" px={2} sx={{ minHeight: 96 }}>
      <Box display="flex" alignItems="center" flexWrap="wrap" mb={1}>
        <Box className={classes.title}>{title}:</Box>
        <VisibilitySensor onChange={handleVisible}>
          <Box display="flex" flexGrow={1}>
            <img
              className={classes.pencilStart}
              src="images/pencilStart.png"
              alt="pencilStart"
            />
            <img
              className={clsx(
                classes.pencilCenter,
                visible && startTimeOut && classes[`pencil${value}`]
              )}
              src="images/pencilCenter.png"
              alt="pencilCenter"
            />
            <img
              className={classes.pencilEnd}
              src="images/pencilEnd.png"
              alt="pencilEnd"
            />
          </Box>
        </VisibilitySensor>

        <Box
          className={clsx(
            classes.skillValueContainer,
            visible && classes.skillValueContainerVisible
          )}
        >
          {value}/10
        </Box>
      </Box>
      <Box pl={2} pr={2} mb={1}>
        <Divider />
      </Box>
    </Box>
  );
});

//=STRT ================================
const Skills = ({ classes }) => {
  //=y State
  const { currentLocation } = usePageTransition();
  const [isVisible, setIsVisible] = useState(!currentLocation);

  //=? Cycle
  useLayoutEffect(() => {
    if (!currentLocation) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, [currentLocation]);

  //=+ Handlers

  //=g Utils

  //=o Variables

  return (
    <Layout section="COMPETENZE">
      <Box mb={4} sx={{ color: colors.orangeBackground }}>
        <Typography
          paragraph
          sx={{ textAlign: "justify", textIndent: 50, p: 2 }}
        >
          <Box component="span" className={classes.firstLetter}>
            M
          </Box>
          i chiamo Lucia. Nasco a Rimini nel 1990 da una famiglia numerosa. Mi
          innamoro presto del disegno e per assecondare una costante ricerca di
          creatività, frequento il Liceo Artistico a Rimini. Il naturale
          proseguimento dei miei studi mi porta a Bologna per disegnare e
          dipingere fino ad ottenere un diploma di laurea presso la Scuola di
          Pittura dell’Accademia di Belle Arti con il massimo dei voti.
          Terminato il primo ciclo di studi, completo la mia formazione
          sfruttando le tecniche pittoriche e del disegno presso la Scuola di
          Grafica d’Arte dell’Accademia di Belle Arti di Bologna. Ho l’occasione
          di formarmi con menti geniali nel campo dell’Incisione e di conoscere
          artisti che sanno fare arte in numerosi campi. La Calcografia mi
          affascina immensamente. Partecipo a mostre e concorsi e ottengo
          citazioni in alcuni cataloghi per collettive. Lascio l’Accademia
          ancora una volta con il massimo dei voti e un importante bagaglio
          personale.
        </Typography>
        <Typography
          paragraph
          sx={{ textAlign: "justify", textIndent: 50, p: 2 }}
        >
          <Box component="span" className={classes.firstLetter}>
            D
          </Box>
          al 2016 lavoro e mi formo a Rimini. Mi inserisco nell’immenso mondo
          della grafica digitale. Approfondisco l’utilizzo del pacchetto Adobe.
          Uso quotidianamente Photoshop, Illustrator, Indesign. Sperimento il
          mondo dell’animazione grazie allo studio di Adobe Animate e After
          Effects. Progetto prototipi interattivi per la creazione di wireframe
          e ne curo il design.
        </Typography>
        <Typography
          paragraph
          sx={{ textAlign: "justify", textIndent: 50, p: 2 }}
        >
          <Box component="span" className={classes.firstLetter}>
            H
          </Box>
          o partecipato a Workshop e corsi di formazione che mi hanno permesso
          di apprendere le tecniche dell’illustrazione e della narrazione di
          maestri come Chiara Carrer, Emidio Clementi e Francesco Poroli. Amo i
          ritratti e gli animali. E amo fondere le due cose. Lo strumento con il
          quale ora prendono vita le mie illustrazioni è Procreate.
        </Typography>
      </Box>
      <Box p={2}>
        <Divider />
      </Box>
      <Box sx={{ minHeight: skills.length * 96 }}>
        {isVisible && (
          <>
            {skills.map((s) => (
              <Skill title={s.title} value={s.value} key={s.title} />
            ))}
          </>
        )}
      </Box>
      {/* <Box
        width={1}
        display="flex"
        justifyContent="flex-end"
        position="fixed"
        bottom={10}
        right={45}
      >
        <Box className={classes.rulerContainer}>
          <img
            src="images/ruler.svg"
            style={{ height: "auto", width: "100%" }}
            alt="righello"
          />
        </Box>
      </Box> */}
      <Box width={1} height={100} />
    </Layout>
  );
};

export default withStyles(style)(Skills);
