"use client";

import JPFileUpload from "@/Forms/JPFileUploader";
import JPForm from "@/Forms/JPForm";
import JPInput from "@/Forms/JPInput";
import { UserRegister } from "@/services/actions/UserRegister";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

// const defaultValues = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
//   role: "",
//   gender: "",
//   contactNumber: "",
//   address: "",
// };
const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

const RegisterPage = () => {
  // const router = useRouter();
  const handleRegister = async (value: FieldValues) => {
    console.log("Input values:", value);
    try {
      const file = value.file;
      if (!file) {
        toast.error("Please upload a valid file");
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

      if (!imgUploadResponse.ok) {
        throw new Error("Failed to upload image to imgBB.");
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
      const userResponse = await UserRegister(payload);
      console.log(userResponse);
      if (userResponse?.data?.id) {
        toast.success(
          userResponse?.data?.message || "User created successfully!"
        );
      } else {
        throw new Error(
          userResponse?.data?.message || "Unknown error during registration."
        );
      }
    } catch (err: any) {
      // Handle errors
      console.error("Error in handleRegister:", err);
      toast.error(err.message || "An unexpected error occurred.");
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
              ></Image>
            </Box>
            <Box>
              <Typography fontSize={24} fontWeight="bold">
                User Registration
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ py: 2 }}>
            <JPForm
              onSubmit={handleRegister}
              // resolver={zodResolver(registerValidationSchema)}
              // defaultValues={defaultValues}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6}>
                  <JPInput label="Name" name="name" fullWidth={true} />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <JPInput
                    label="Email"
                    name="email"
                    fullWidth={true}
                    type="email"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <JPInput
                    label="Password"
                    name="password"
                    fullWidth={true}
                    type="password"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <JPFileUpload
                    label="Photo"
                    name="file"
                    // fullWidth={true}
                    // type="password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth={true}
                sx={{ backgroundColor: "ActiveBorder", mt: 3, mb: 2 }}
              >
                Please Register
              </Button>
            </JPForm>
            <Typography align="center">
              Alrady have an acount? please{" "}
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
