import JPModal from "@/components/Shared/Modal/JPModal";
import JPForm from "@/Forms/JPForm";
import JPInput from "@/Forms/JPInput";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.services";
import { Button, CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

interface IModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const UserModal = ({ open, setOpen }: IModalProps) => {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const { userId } = getUserInfo();
    setUserId(userId);
  }, []);
  const { data } = useGetSingleUserQuery(userId);
  const [loading, setLoading] = useState(false);

  const [updateUser] = useUpdateUserMutation();

  const handleUserUpdate = async (value: FieldValues) => {
    setLoading(true);
    try {
      const res = await updateUser({ data: value, id: userId });

      if (res?.data?.id) {
        toast.success("User update successfully!");
        setOpen(false);
        setLoading(false);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <JPModal open={open} setOpen={setOpen} title="Update User">
      <JPForm onSubmit={handleUserUpdate}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <JPInput
              label="Name"
              name="name"
              fullWidth={true}
              defaultValue={data?.name}
            />
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
            "Update User"
          )}
        </Button>
      </JPForm>
    </JPModal>
  );
};

export default UserModal;
