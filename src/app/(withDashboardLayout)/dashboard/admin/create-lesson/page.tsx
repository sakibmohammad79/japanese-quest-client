"use client";
import JPFileUpload from "@/Forms/JPFileUploader";
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
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useCreateLessonMutation } from "@/redux/api/lessonApi";
import { getUserInfo } from "@/services/auth.services";
const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
const CreateLessonPage = () => {
  const { reset } = useForm();
  const [createLesson] = useCreateLessonMutation();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const { userId } = getUserInfo();
    setUserId(userId);
  }, []);
  const handleCreateLesson = async (value: FieldValues) => {
    setLoading(true);
    try {
      const file = value.file;
      if (!file || file.length === 0) {
        toast.error("Please upload a valid file.");
        setLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append("image", file);

      const imgUploadResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!imgUploadResponse.ok) {
        throw new Error("Failed to upload image. Please try again.");
      }
      const imgUploadData = await imgUploadResponse.json();
      if (!imgUploadData.success) {
        throw new Error("Image upload failed. Please try again.");
      }
      const imageUrl = imgUploadData.data.url;
      const payload = {
        name: value.name,
        description: value.description,
        content: value.content,
        imageUrl: imageUrl,
        createdById: userId,
      };
      try {
        const res = await createLesson(payload).unwrap();
        if (res?.id) {
          reset();
          toast.success("Lesson created successfully!");
        }
      } catch (err) {
        console.error(err);
      }
    } catch (err: any) {
      console.error("Error in handleCreateLesson:", err);
      toast.error(err.message);
    } finally {
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
                Create New Lesson
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ py: 2 }}>
            <JPForm onSubmit={handleCreateLesson}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6}>
                  <JPInput
                    label="Name"
                    name="name"
                    fullWidth={true}
                    required={true}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <JPInput
                    label="Description"
                    name="description"
                    fullWidth={true}
                    type="text"
                    required={true}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <JPInput
                    label="Content"
                    name="content"
                    fullWidth={true}
                    type="text"
                    required={true}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <JPFileUpload label="Image" name="file" required={true} />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth={true}
                sx={{ backgroundColor: "ActiveBorder", mt: 3, mb: 2 }}
                disabled={loading} // Disable button while loading
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Create New Lesson"
                )}
              </Button>
            </JPForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default CreateLessonPage;
