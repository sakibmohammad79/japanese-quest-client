"use client";
import React, { useState, useEffect } from "react";
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
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";

const LessonDetails = ({ params }: { params: any }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const { lessonId } = params;
  const { data, isLoading } = useGetSingleLessonQuery(params?.lessonId);
  const { data: vocabulary, isLoading: VocabularyLoading } =
    useGetAllVocabularyByLessonQuery(params?.lessonId);

  if (VocabularyLoading || isLoading) {
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

  const pronounceWord = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "ja-JP"; // Change language as needed
    window.speechSynthesis.speak(utterance);
  };

  const handleNext = () => {
    if (currentIndex < vocabularies.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const router = useRouter();
  const handleComplete = () => {
    setShowConfetti(true);
    setTimeout(() => {
      router.push("/lesson");
    }, 3000);
  };

  const currentVocabulary = vocabularies ? vocabularies[currentIndex] : null;

  return (
    <Box sx={{ backgroundColor: "#F4F1EA", py: 16 }}>
      <Stack justifyContent="center" alignItems="center">
        {showConfetti && <Confetti />}
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
              />
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
            <Divider sx={{ mb: 2 }} />

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
                    10 Minute
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>

          {/* Vocabulary Details */}
          {currentVocabulary && (
            <Box mt={4} sx={{ textAlign: "center" }}>
              <Box sx={{ padding: "20px", borderRadius: "8px", boxShadow: 2 }}>
                <Typography variant="h4" component="h2">
                  {currentVocabulary.word}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  Pronunciation: {currentVocabulary.pronunciation}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  Meaning: {currentVocabulary.meaning}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  When to Say: {currentVocabulary.whenToSay}
                </Typography>
                <Box mt={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => pronounceWord(currentVocabulary.word)}
                  >
                    Pronounce
                  </Button>
                </Box>
                <Box mt={2}>
                  <Button
                    variant="outlined"
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleNext}
                    sx={{ marginLeft: "16px" }}
                    disabled={currentIndex === vocabularies.length - 1}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
            </Box>
          )}

          {/* Show Complete button when all vocabularies have been shown */}
          {currentIndex === vocabularies?.length - 1 && (
            <Box mt={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleComplete}
              >
                Complete
              </Button>
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default LessonDetails;
