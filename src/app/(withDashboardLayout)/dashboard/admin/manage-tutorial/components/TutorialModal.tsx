import JPModal from "@/components/Shared/Modal/JPModal";
import JPForm from "@/Forms/JPForm";
import JPInput from "@/Forms/JPInput";
import {
  useGetSingleTutorialQuery,
  useUpdateTutorialMutation,
} from "@/redux/api/tutorialApi";
import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

interface IModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tutorialId: string;
}
const TutorialModal = ({ open, setOpen, tutorialId }: IModalProps) => {
  console.log(tutorialId);
  const [loading, setLoading] = useState(false);

  const [updateTutorial] = useUpdateTutorialMutation();

  const handleTutorialUpdate = async (value: FieldValues) => {
    setLoading(true);
    try {
      const res = await updateTutorial({ data: value, id: tutorialId });
      if (res?.data?.id) {
        toast.success("Tutorial Update successfully!");
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
    <JPModal open={open} setOpen={setOpen} title="Update Tutorial">
      <JPForm onSubmit={handleTutorialUpdate}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <JPInput label="title" name="title" fullWidth={true} />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <JPInput label="Description" name="description" fullWidth={true} />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <JPInput label="Video URL" name="videoUrl" fullWidth={true} />
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
            "Update Tutorial"
          )}
        </Button>
      </JPForm>
    </JPModal>
  );
};

export default TutorialModal;
