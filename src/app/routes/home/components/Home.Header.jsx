import React from "react";
import { Box } from "@mui/material";
import { colors } from "../../../../settings";

const HomeHeader = () => {
  return (
    <Box>
      <Box
        sx={{
          fontWeight: "700",
          fontFamily: "Poppins",
          color: colors.logoPrimary,
          padding: 10,
          px: { xs: 2, md: 10 },
          py: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
          }}
          className="unselect_text"
        >
          <Box
            as="img"
            src="/logos/logo_lucia2d.svg"
            sx={{ width: { xs: 50, md: "100px" }, height: "auto" }}
            alt="logo"
          />

          <Box
            as="img"
            src="/items/nome.svg"
            alt="Nome"
            sx={{ width: "auto", height: { xs: 30, md: 80 } }}
          />
        </Box>
        <Box flexGrow={1} sx={{ my: 0 }}>
          <Box
            width={1}
            height="1px"
            sx={{
              py: 1,
              borderBottom: "2px solid",
              borderColor: colors.logoPrimary,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HomeHeader;
