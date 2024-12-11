import { getUserInfo, removeUser } from "@/services/auth.services";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
const AuthButtonSm = () => {
  const userInfo = getUserInfo();
  const router = useRouter();

  const handleLogout = () => {
    removeUser();
    router.refresh();
  };
  return (
    <Stack justifyContent="center">
      {userInfo?.userId ? (
        <Button
          onClick={handleLogout}
          color="error"
          sx={{ width: "50%", mx: "auto" }}
        >
          Logout
        </Button>
      ) : (
        <Button
          component={Link}
          href="/login"
          sx={{ width: "50%", mx: "auto" }}
        >
          Login
        </Button>
      )}
    </Stack>
  );
};

export default AuthButtonSm;
