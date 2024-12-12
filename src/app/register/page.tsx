"use client";
import JPFileUpload from "@/Forms/JPFileUploader";
import JPForm from "@/Forms/JPForm";
import JPInput from "@/Forms/JPInput";
import { UserRegister } from "@/services/actions/UserRegister";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { UserLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { useRouter } from "next/navigation";

const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleRegister = async (value: FieldValues) => {
    console.log("Input values:", value);
    setLoading(true);

    try {
      // Check if file is provided
      const file = value.file;
      if (!file) {
        toast.error("Please upload a valid file.");
        return;
      }
      // Upload image to imgBB
      const formData = new FormData();
      formData.append("image", file);

      const imgUploadResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      // Check if image upload was successful
      if (!imgUploadResponse.ok) {
        throw new Error("Failed to upload image to imgBB. Please try again.");
      }
      const imgUploadData = await imgUploadResponse.json();
      if (!imgUploadData.success) {
        throw new Error("Image upload failed. Please try again.");
      }
      const imageUrl = imgUploadData?.data?.url;
      console.log("Image uploaded successfully:", imageUrl);
      // Prepare user registration payload
      const payload = {
        password: value.password,
        user: {
          photoUrl: imageUrl,
          name: value.name,
          email: value.email,
        },
      };
      console.log("Payload for registration:", payload);

      // Register user
      const registrationRes = await UserRegister(payload);
      console.log(registrationRes);
      // Check if user registration was successful
      if (registrationRes?.success) {
        // User login
        const loginRes = await UserLogin({
          email: payload.user.email,
          password: payload.password,
        });
        // Check if login was successful
        if (loginRes?.data?.accessToken) {
          storeUserInfo(loginRes?.data?.accessToken);
          router.push("/"); // Redirect to homepage
          toast.success(registrationRes?.message);
        } else {
          toast.error(loginRes?.message);
        }
      } else {
        toast.error(registrationRes?.message);
      }
    } catch (err: any) {
      // Handle errors at any step
      console.error("Error in handleRegister:", err);
      toast.error(err?.message);
    } finally {
      setLoading(false); // Stop loading after the request is completed
    }
  };

  return (
    <Container>
      <Stack
        sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
          }}
        >
          <Stack
            sx={{ justifyContent: "center", alignItems: "center", gap: 2 }}
          >
            <Box>
              <Image
                height={80}
                width={80}
                src="https://img.icons8.com/stickers/50/language.png"
                alt="Pet-icon"
              />
            </Box>
            <Box>
              <Typography fontSize={24} fontWeight="bold">
                User Registration
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ py: 2 }}>
            <JPForm onSubmit={handleRegister}>
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
                    label="Email"
                    name="email"
                    fullWidth={true}
                    type="email"
                    required={true}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <JPInput
                    label="Password"
                    name="password"
                    fullWidth={true}
                    type="password"
                    required={true}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <JPFileUpload label="Photo" name="file" required={true} />
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
                  "Please Register"
                )}
              </Button>
            </JPForm>
            <Typography align="center">
              Already have an account? Please{" "}
              <Link href="/login">
                <Box component="span" color="primary.main" fontWeight="bold">
                  Login
                </Box>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
