"use client";
import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import LessonCard from "@/components/LessonCard";
import { useGetAllLessonQuery } from "@/redux/api/lessonApi";

const LessonPage = () => {
  const { data, isLoading } = useGetAllLessonQuery({});
  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  const lessons = data?.lessons;
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Lessons
      </Typography>

      <Grid container spacing={3} pt={8} mb={4}>
        {lessons?.map((lesson: any, index: number) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
            <LessonCard
              imageUrl={lesson?.imageUrl}
              name={lesson?.name}
              id={lesson?.id}
              lessonNumber={lesson?.lessonNumber}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LessonPage;
