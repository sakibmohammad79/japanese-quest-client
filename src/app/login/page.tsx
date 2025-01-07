"use client";
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
import React, { useState } from "react";
import { getUserInfo, storeUserInfo } from "@/services/auth.services";
import { userLoginValidationSchema } from "@/validations/userValidation";
import LoginModal from "./components/LoginModal";

const defaultValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: FieldValues) => {
    setLoading(true);
    try {
      const res = await UserLogin(data);
      if (res?.data?.accessToken) {
        storeUserInfo(res?.data?.accessToken);
        const { role } = getUserInfo();
        if (role == "admin") {
          router.push("/dashboard/admin");
          toast.success(res?.message);
        } else if (role == "user") {
          router.push("/");
          toast.success(res?.message);
        }
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.log(err.message);
      toast.error("An error occurred while logging in.");
    } finally {
      setLoading(false);
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
                src="https://i.postimg.cc/gj2HQjX8/learning-japanese-language-class-logo-language-exchange-program-forum-international-communication-si.webp"
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
              resolver={zodResolver(userLoginValidationSchema)}
              defaultValues={defaultValues}
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
                  "Please Login"
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
          <Box pt={1} sx={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={() => setIsModalOpen(true)}>
              Demo Credentials
            </Button>
            <LoginModal open={isModalOpen} setOpen={setIsModalOpen} />
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
