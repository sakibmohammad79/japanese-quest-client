"use client";
import React from "react";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import { useGetSingleLessonQuery } from "@/redux/api/lessonApi";
import Image from "next/image";
import { useGetAllVocabularyByLessonQuery } from "@/redux/api/vobulary.Api";
import Link from "next/link";

const LessonDetails = ({ params }: { params: any }) => {
  const { lessonId } = params;
  const { data, isLoading } = useGetSingleLessonQuery(params?.lessonId);
  const { data: vocabulary, isLoading: VocabularyLoading } =
    useGetAllVocabularyByLessonQuery(params?.lessonId);
  if (VocabularyLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  const { name, description, content, imageUrl, id } = data;

  const vocabularies = vocabulary?.vocabularies;

  return (
    <Box sx={{ backgroundColor: "#F4F1EA", py: 16 }}>
      <Stack justifyContent="center" alignItems="center">
        <Box
          sx={{
            backgroundColor: "white",
            p: 6,
            boxShadow: 1,
            borderRadius: 2,
            maxWidth: 800,
            width: "100%",
          }}
        >
          <Box>
            <Typography
              variant="h4"
              component="h1"
              fontWeight={600}
              color="black"
              mb={2}
            >
              {name}
            </Typography>
            <Typography mb={2}>{description}</Typography>
            <Box mb={2}>
              <Image
                height={300}
                width={800}
                src={imageUrl}
                alt="lesson_image"
              ></Image>
            </Box>
            <Typography
              mb={2}
              variant="h5"
              component="h1"
              color="black"
              fontWeight={600}
            >
              About Lesson
            </Typography>
            <Typography mb={2}>{content}</Typography>
            <Typography
              mb={2}
              variant="h5"
              component="h1"
              color="black"
              fontWeight={600}
            >
              Vocabulary Information
            </Typography>
            <Divider sx={{ mb: 2 }}></Divider>

            <Box ml={2} pt={2}>
              <Grid container spacing={2}>
                <Grid xs={12} md={6} lg={6}>
                  <Typography fontWeight={600} fontSize={20} color="#0A303A">
                    Number Of Vocabulary
                  </Typography>
                  <Typography
                    fontWeight={600}
                    color="primary.main"
                    fontSize={20}
                  >
                    {vocabularies?.length}
                  </Typography>
                </Grid>
                <Grid xs={6} md={4} lg={3}>
                  <Typography fontWeight={600} fontSize={20} color="#0A303A">
                    Read Time
                  </Typography>
                  <Typography
                    fontWeight={600}
                    color="primary.main"
                    fontSize={20}
                  >
                    30 Minute
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Link href={`/lesson/${lessonId}/vocabulary`}>
            <Button sx={{ mt: 4 }}>All vocabulary for this lesson</Button>
          </Link>
        </Box>
      </Stack>
    </Box>
  );
};

export default LessonDetails;
