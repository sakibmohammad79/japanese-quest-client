import JPModal from "@/components/Shared/Modal/JPModal";
import JPForm from "@/Forms/JPForm";
import JPInput from "@/Forms/JPInput";
import {
  useGetSingleLessonQuery,
  useUpdateLessonMutation,
} from "@/redux/api/lessonApi";
import {
  useGetSingleVocabularyQuery,
  useUpdateVocabularyMutation,
} from "@/redux/api/vobulary.Api";
import { Button, CircularProgress, Grid } from "@mui/material";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

interface IModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  vocabularyId: string;
}
const VocabularyModal = ({ open, setOpen, vocabularyId }: IModalProps) => {
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useGetSingleVocabularyQuery(vocabularyId);
  const [updateVocabulary] = useUpdateVocabularyMutation();

  const handleVocabularyUpdate = async (value: FieldValues) => {
    setLoading(true);
    try {
      const res = await updateVocabulary({ data: value, id: data?.id });
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
      <JPForm onSubmit={handleVocabularyUpdate}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <JPInput
              label="Word"
              name="word"
              fullWidth={true}
              defaultValue={data?.word}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <JPInput
              label="Pronunciation"
              name="pronunciation"
              fullWidth={true}
              defaultValue={data?.pronunciation}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <JPInput
              label="Meaning"
              name="meaning"
              fullWidth={true}
              defaultValue={data?.meaning}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <JPInput
              label="WhenToSay"
              name="whenToSay"
              fullWidth={true}
              defaultValue={data?.whenToSay}
            />
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
            "Update Vocabulary"
          )}
        </Button>
      </JPForm>
    </JPModal>
  );
};

export default VocabularyModal;
