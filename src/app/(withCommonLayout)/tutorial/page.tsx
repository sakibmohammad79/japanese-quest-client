"use client";
import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import VideoCard from "@/components/TutorialCard";
import { useGetAllTutorialQuery } from "@/redux/api/tutorialApi";

const TutorialPage = () => {
  const { data, isLoading } = useGetAllTutorialQuery({});
  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  const videos = data?.tutorials;
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Video Tutorials
      </Typography>

      <Grid container spacing={3} px={2} my={6}>
        {videos?.map((video: any) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={video.createdById}>
            <VideoCard
              videoUrl={video?.videoUrl}
              title={video?.title}
              description={video?.description}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TutorialPage;
