import { getUserInfo, removeUser } from "@/services/auth.services";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButtonLg = () => {
  const userInfo = getUserInfo();
  const router = useRouter();

  const handleLogout = () => {
    removeUser();
    router.refresh();
  };

  return (
    <Box>
      {userInfo?.userId ? (
        <Button
          onClick={handleLogout}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Logout
        </Button>
      ) : (
        <Link href="/login">
          <Button sx={{ display: { xs: "none", sm: "block" } }}>Login</Button>
        </Link>
      )}
    </Box>
  );
};

export default AuthButtonLg;
