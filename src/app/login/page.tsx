"use client";
import JPFileUpload from "@/Forms/JPFileUploader";
import JPForm from "@/Forms/JPForm";
import JPInput from "@/Forms/JPInput";
import { UserLogin } from "@/services/actions/userLogin";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";

const defaultValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: FieldValues) => {
    console.log(data);
    setLoading(true); // Start loading
    try {
      const res = await UserLogin(data);
      console.log(res);
      if (res?.data?.accessToken) {
        toast.success(res?.message);
        // redirect or store tokens here
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.log(err.message);
      toast.error("An error occurred while logging in.");
    } finally {
      setLoading(false); // Stop loading
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
            <JPForm
              onSubmit={handleLogin}
              // resolver={zodResolver(userRegisterValidationSchema)}
              // defaultValues={defaultValues}
            >
              <Grid container spacing={3}>
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
              </Grid>
              <Button
                type="submit"
                fullWidth={true}
                disabled={loading} // Disable button when loading
                sx={{ backgroundColor: "ActiveBorder", mt: 3, mb: 2 }}
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
              <Link href="/register">
                <Box component="span" color="primary.main" fontWeight="bold">
                  register
                </Box>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
