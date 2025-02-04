import React, { useState, useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import Lightbox from "react-image-lightbox";
import { a, useTransition, config } from "@react-spring/web";
import clsx from "clsx";
import { motion } from "framer-motion";

//* components
import Layout from "../../layout/Layout";

//* statics
import { illustrazioni, siti, allestimenti } from "./static/images";

//=b css
import "react-image-lightbox/style.css";
import usePageTransition from "../../layout/components/transition/usePageTransition";
import { colors } from "../../../settings";
import useIntro from "../../layout/components/intro/useIntro";
const style = (theme) => ({
  picRoot: {
    margin: theme.spacing(1),
    flexGrow: 1,
    cursor: "pointer",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },

  picLarge: {
    width: "70%",
  },

  picMedium: {
    width: "33%",
  },

  picSmall: {
    width: "25%",
  },
});

//g -------------------------------------------------------
const Pic = withStyles(style)(
  ({ classes, src, alt, type, handleOpen, index, style, objectFit }) => {
    return (
      <a.div
        className={clsx(
          classes.picRoot,
          type === "large" && classes.picLarge,
          type === "medium" && classes.picMedium,
          type === "small" && classes.picSmall
        )}
        style={{
          ...style,
          height: objectFit === "contain" ? "auto" : undefined,
        }}
      >
        <Box width={1} height={1} onClick={() => handleOpen(index)}>
          <img src={src} alt={alt} style={{ objectFit }} />
        </Box>
      </a.div>
    );
  }
);

//g -------------------------------------------------------
const Button = ({ section, setStateSection }) => {
  return (
    <motion.div
      style={{
        background: colors.background,
        color: colors.logoPrimary,
        width: { xs: 50, md: 150 },
        p: 1,
        borderRadius: 3,
        textAlign: "center",
        cursor: "pointer",
        fontSize: { xs: 5, md: 20 },
      }}
      whileHover={{
        color: colors.orangeBackground,
        scale: 1.1,
        duration: 0.3,
      }}
      transition={{ duration: 0.3 }}
      onClick={() => setStateSection(section)}
      className="unselect_text"
    >
      {section.toUpperCase()}
    </motion.div>
  );
};

//g -------------------------------------------------------
const Gallery = ({ images, currentLocation, handleOpen, objectFit }) => {
  const transition = useTransition(images, {
    key: (s, i) => i,
    trail: 50,
    config: config.stiff,
    delay: 0,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });
  return (
    <Box display="flex" flexWrap="wrap" overflow="hidden" p={1} pt={0}>
      {/* {images.map((image, index) => ( */}
      {transition((style, image, { key }) => (
        <Pic
          key={image.src}
          type={image.type}
          src={image.src}
          index={key}
          handleOpen={handleOpen}
          style={style}
          objectFit={objectFit || "cover"}
        />
      ))}
    </Box>
  );
};

//=STRT ================================
const Portfolio = ({ classes }) => {
  //=y State
  const [isOpen, setIsOpen] = useState(false);
  const [stateRenderGallery, setStateRenderGallery] = useState(false);
  const [stateSection, setStateSection] = useState("interfacce");
  const [photoIndex, setPhotoIndex] = useState(0);
  const { currentLocation } = usePageTransition();
  const { introDone } = useIntro();

  //=? Cycle
  // ? *********************************************************
  useEffect(() => {
    if (!introDone) {
      setStateRenderGallery(false);
    } else {
      if (!currentLocation) setStateRenderGallery(true);
      else if (currentLocation === "/cosafaccio") setStateRenderGallery(true);
      else setStateRenderGallery(false);
    }
  }, [introDone, currentLocation]);

  //=+ Handlers
  const handleOpen = (index) => {
    setIsOpen(true);
    setPhotoIndex(index);
  };

  //=g Utils

  //=o Variables
  //o *********************************************************
  const { images, objectFit } = useMemo(() => {
    if (stateSection === "illustrazioni")
      return { images: illustrazioni, objectFit: "cover" };
    if (stateSection === "interfacce")
      return { images: siti, objectFit: "contain" };
    if (stateSection === "allestimenti")
      return { images: allestimenti, objectFit: "contain" };
  }, [stateSection]);

  return (
    <Layout section="COSA FACCIO">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pointerEvents: "all",
            gap: 3,
            bgcolor: colors.background,
            mt: { xs: 6, md: 2 },
            mb: 1,
          }}
        >
          <Button section="interfacce" setStateSection={setStateSection} />
          <Button section="allestimenti" setStateSection={setStateSection} />
          <Button section="illustrazioni" setStateSection={setStateSection} />
        </Box>
      </Box>

      <Box
        sx={{
          minHeight: 500,
          height: "calc(100svh - 135px)",
          overflowY: "auto",
          mb: 1,
        }}
      >
        {stateRenderGallery && (
          <Gallery
            key={stateSection}
            images={images}
            currentLocation={currentLocation}
            handleOpen={handleOpen}
            objectFit={objectFit}
          />
        )}
      </Box>

      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex].hd}
          nextSrc={images[(photoIndex + 1) % images.length].hd}
          prevSrc={images[(photoIndex + images.length - 1) % images.length].hd}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (prevIndex) => (prevIndex + images.length - 1) % images.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex((prevIndex) => (prevIndex + 1) % images.length)
          }
        />
      )}
    </Layout>
  );
};

export default withStyles(style)(Portfolio);
