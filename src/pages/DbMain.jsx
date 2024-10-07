import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import bgImage from "../assets/blueBg.png";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const DbMain = () => {
  const [showMessageBox, setShowMessageBox] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setShowMessageBox(true);
    }, 1000);
  }, []);

  const GradientTypography = styled(Typography)({
    background: "linear-gradient(45deg, #3e74a6, #1aafb2, #e19b39)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "1.2rem",
    fontFamily: "Helvetica",
    fontWeight: 600,
    marginTop: "0.3rem",
    marginBottom: "-1rem",
  });

  const YourComponent = () => (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <GradientTypography>EMPOWER YOUR SALES JOURNEY</GradientTypography>
    </Box>
  );

  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "2rem",
          fontFamily: "Bebas Neue sans-serif",
          fontWeight: "900",
          color: "#3b3b3b",
          mt: "3rem",
        }}
      >
        <ReactTyped strings={["HOW TO SELL"]} typeSpeed={200} />
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: "5rem",
          transform: showMessageBox ? "translateY(0rem)" : "translateY(4rem)",
          transition: "transform 0.7s ease-in-out, opacity 0.7s ease-in-out",
          opacity: showMessageBox ? "1" : "0",
          paddingLeft: "2rem",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          mt: "4rem",
        }}
      >
        <YourComponent />
      </Box>

      <Box
        sx={{
          width: "100%",
          mt: "2rem",
          transition: "opacity 0.5s ease-in-out",
          transitionDelay: "1.5s",

          opacity: showMessageBox ? "1" : "0",
        }}
      >
        <Typography
          sx={{
            ml: "2rem",
            fontFamily: "sans-serif",
            fontSize: "1.1rem",
            fontWeight: "700",
            color: "#535353",
          }}
        >
          DATA BASE MANAGEMENT SYSTEM
        </Typography>
        <Typography
          sx={{
            m: "1rem 2rem",
            fontFamily: "sans-serif",
            fontSize: "1rem",
            color: "#363636",
          }}
        >
          Secure and reliable data storage for seamless data management,
          empowering your sales journey worldwide.
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          mt: "3rem",
          transition: "opacity 0.5s ease-in-out",
          transitionDelay: "2s",
          opacity: showMessageBox ? "1" : "0",
          display: "flex",
          gap: 2,
          justifyContent: "center",
        }}
      >
        <Button
          sx={{
            backgroundColor: "#F2F2F2",
            color: "#242424",
            borderRadius: "1rem",
            width: "5rem",
            transition: "0.4s",
            "&:hover": {
              backgroundColor: "#537c87",
              color: "white",
            },
          }}
          onClick={() => navigate("/dbmain/login")}
        >
          Sign in
        </Button>
        <Button
          sx={{
            backgroundColor: "#F2F2F2",
            color: "#242424",
            borderRadius: "1rem",
            width: "5rem",
            transition: "0.4s",
            "&:hover": {
              backgroundColor: "#537c87",
              color: "white",
            },
          }}
          onClick={() => navigate("/dbmain/register")}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default DbMain;
