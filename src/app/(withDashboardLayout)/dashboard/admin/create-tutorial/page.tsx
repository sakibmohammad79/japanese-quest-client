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
import { useRouter } from "next/navigation";
import { useCreateTutorialMutation } from "@/redux/api/tutorialApi";

const CreateTutorial = () => {
  const router = useRouter();
  const [createTutorial] = useCreateTutorialMutation();

  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const { userId } = getUserInfo();
    setUserId(userId);
  }, []);

  const handleCreateTutorial = async (value: FieldValues) => {
    setLoading(true);

    const payload = {
      description: value?.description,
      title: value?.title,
      videoUrl: value.videoUrl,
      createdById: userId,
    };

    try {
      const res = await createTutorial(payload).unwrap();

      if (res?.id) {
        toast.success("New tutorial successfully successfully!");
        router.push("/dashboard/admin/manage-tutorial");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to added tutorial!");
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
                Added New Tutorial
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ py: 2 }}>
            <JPForm onSubmit={handleCreateTutorial}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6}>
                  <JPInput
                    label="VideoUrl"
                    name="videoUrl"
                    fullWidth={true}
                    required={true}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <JPInput
                    label="title"
                    name="title"
                    fullWidth={true}
                    type="text"
                    required={true}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <JPInput
                    label="description"
                    name="description"
                    fullWidth={true}
                    type="text"
                    required={true}
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
                  "Create New Tutorial"
                )}
              </Button>
            </JPForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default CreateTutorial;
