"use client";
import JPForm from "@/Forms/JPForm";
import JPInput from "@/Forms/JPInput";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";

import { useGetAllLessonQuery } from "@/redux/api/lessonApi";
import { getUserInfo } from "@/services/auth.services";
import { useCreateVocabularyMutation } from "@/redux/api/vobulary.Api";
import JPSelect from "@/Forms/JPSelect";

const CreateVocabularyPage = () => {
  const [createVocabulary] = useCreateVocabularyMutation();
  const { data } = useGetAllLessonQuery({});
  const lessons = data?.lessons;
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const { userId } = getUserInfo();
    setUserId(userId);
  }, []);

  const handleCreateVocabulary = async (value: FieldValues) => {
    setLoading(true);

    const payload = {
      ...value,
      adminId: userId,
    };
    try {
      const res = await createVocabulary(payload).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Vocabulary created successfully!");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create vocabulary!");
      setLoading(false);
    }
  };
  return (
    <Container>
      <Stack
        sx={{ height: "80vh", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            mt: 4,
          }}
        >
          <Stack
            sx={{ justifyContent: "center", alignItems: "center", gap: 2 }}
          >
            <Box>
              <Typography fontSize={24} fontWeight="bold">
                Create New Vocabulary
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ py: 2 }}>
            <JPForm onSubmit={handleCreateVocabulary}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6}>
                  <JPInput label="Word" name="word" fullWidth={true} />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <JPInput
                    label="Pronunciation"
                    name="pronunciation"
                    fullWidth={true}
                    type="text"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <JPInput
                    label="Meaning"
                    name="meaning"
                    fullWidth={true}
                    type="text"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <JPInput
                    label="When To Say"
                    name="whenToSay"
                    fullWidth={true}
                    type="text"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <JPSelect
                    label="Select Lesson"
                    name="lessonId"
                    fullWidth={true}
                    options={lessons?.map((lesson: any) => ({
                      value: lesson?.id,
                      label: lesson?.name,
                    }))}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth={true}
                sx={{ backgroundColor: "ActiveBorder", mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Create New Vocabulary"
                )}
              </Button>
            </JPForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default CreateVocabularyPage;
