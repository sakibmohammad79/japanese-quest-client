import JPModal from "@/components/Shared/Modal/JPModal";
import { Box, Typography } from "@mui/material";

type TModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginModal = ({ open, setOpen }: TModalProps) => {
  return (
    <JPModal open={open} setOpen={setOpen} title="Demo Credentials">
      <Box>
        <Box>
          <Typography fontSize={20} fontWeight={500}>
            Admin:
          </Typography>
          <Typography>Email: sakib@gmail.com</Typography>
          <Typography>Password: 123456</Typography>
        </Box>
        <Box>
          <Typography fontSize={20} fontWeight={500}>
            User:
          </Typography>
          <Typography>Email: sohan@gmail.com</Typography>
          <Typography>Password: 123456</Typography>
        </Box>
      </Box>
    </JPModal>
  );
};

export default LoginModal;
