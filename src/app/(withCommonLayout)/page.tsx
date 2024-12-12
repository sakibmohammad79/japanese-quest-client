"use client";
import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  // Redirect to the Lessons page
  const handleGoToLessons = () => {
    router.push("/lesson");
  };

  // Redirect to the Tutorial page
  const handleGoToTutorial = () => {
    router.push("/tutorial");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(145deg, #3a3a3a, #121212)",
        padding: 3,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h3"
          gutterBottom
          align="center"
          sx={{
            color: "white",
            fontWeight: 700,
            letterSpacing: 2,
            marginBottom: 3,
            fontFamily: '"Roboto", sans-serif',
          }}
        >
          Welcome to Your Learning Portal
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          paragraph
          align="center"
          sx={{
            color: "white",
            marginBottom: 4,
            fontSize: "1.1rem",
            fontFamily: '"Roboto", sans-serif',
            fontWeight: 300,
          }}
        >
          Explore a wide variety of lessons to enhance your knowledge and
          skills. Get started with our comprehensive tutorials today!
        </Typography>

        {/* Button to navigate to lessons page */}
        <Button
          onClick={handleGoToLessons}
          variant="contained"
          color="primary"
          sx={{
            fontSize: "1.1rem",
            padding: "14px 28px",
            borderRadius: 4,
            boxShadow: 6,
            marginBottom: 3,
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              boxShadow: 12,
              transform: "scale(1.05)",
              backgroundColor: "#1976d2",
            },
            fontFamily: '"Roboto", sans-serif',
          }}
        >
          Go to Lessons
        </Button>

        {/* Button to navigate to tutorial page */}
        <Button
          onClick={handleGoToTutorial}
          variant="contained"
          color="secondary"
          sx={{
            fontSize: "1.1rem",
            padding: "14px 28px",
            borderRadius: 4,
            boxShadow: 6,
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              boxShadow: 12,
              transform: "scale(1.05)",
              backgroundColor: "#9c27b0", // Custom hover color for secondary button
            },
            fontFamily: '"Roboto", sans-serif',
          }}
        >
          Go to Tutorials
        </Button>
      </Container>
    </Box>
  );
};

export default HomePage;
