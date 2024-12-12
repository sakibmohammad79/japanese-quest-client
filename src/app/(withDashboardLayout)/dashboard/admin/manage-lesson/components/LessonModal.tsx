import JPModal from "@/components/Shared/Modal/JPModal";
import JPForm from "@/Forms/JPForm";
import JPInput from "@/Forms/JPInput";
import {
  useGetSingleLessonQuery,
  useUpdateLessonMutation,
} from "@/redux/api/lessonApi";
import { Button, CircularProgress, Grid } from "@mui/material";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

interface IModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  lessonId: string;
}
const LessonModal = ({ open, setOpen, lessonId }: IModalProps) => {
  const { data } = useGetSingleLessonQuery(lessonId);

  const [loading, setLoading] = useState(false);

  const [updateLesson] = useUpdateLessonMutation();

  const handleLessonUpdate = async (value: FieldValues) => {
    setLoading(true);
    try {
      const res = await updateLesson({ data: value, id: data?.id });
      if (res?.data?.id) {
        toast.success("Lesson Update successfully!");
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
    <JPModal open={open} setOpen={setOpen} title="Update Lesson">
      <JPForm onSubmit={handleLessonUpdate}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <JPInput label="Name" name="name" fullWidth={true} />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <JPInput label="Description" name="description" fullWidth={true} />
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
            "Update Lesson"
          )}
        </Button>
      </JPForm>
    </JPModal>
  );
};

export default LessonModal;
