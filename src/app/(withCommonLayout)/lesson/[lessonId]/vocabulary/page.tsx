"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Stack,
  Container,
} from "@mui/material";

import { useGetAllVocabularyByLessonQuery } from "@/redux/api/vobulary.Api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const VocabularyPage = ({ params }: { params: { lessonId: string } }) => {
  const { lessonId } = params;

  const { data, isLoading } = useGetAllVocabularyByLessonQuery(lessonId);
  const vocabulary = data?.vocabularies;
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    { field: "word", headerName: "Word", flex: 1 },
    { field: "pronunciation", headerName: "Pronunciation", flex: 1 },
    { field: "meaning", headerName: "Meaning", flex: 1 },
    { field: "whenToSay", headerName: "When to Say", flex: 2 },
  ];

  return (
    <Container>
      <Box mt={16} mb={4}>
        <Box mt={4}>
          <Paper sx={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={vocabulary || []}
              columns={columns}
              pageSizeOptions={[5, 10, 20]}
              sx={{ border: 0 }}
            />
            {(!vocabulary || vocabulary.length === 0) && (
              <Typography
                sx={{ textAlign: "center", mt: 2, pb: 2 }}
                variant="h6"
              >
                No vocabulary found!
              </Typography>
            )}
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default VocabularyPage;
