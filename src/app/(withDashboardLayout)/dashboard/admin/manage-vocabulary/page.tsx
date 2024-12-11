"use client";
import { Box, Button, Chip, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDebounced } from "@/redux/hooks";
import { useDeleteUserMutation, useGetAllUserQuery } from "@/redux/api/userApi";
import {
  useDeleteLessonMutation,
  useGetAllLessonQuery,
} from "@/redux/api/lessonApi";
import {
  useDeleteVocabularyMutation,
  useGetAllVocabularyQuery,
} from "@/redux/api/vobulary.Api";

const ManageVocabulary = () => {
  const query: Record<string, any> = {};
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedValue = useDebounced({ searchQuery: searchQuery, delay: 900 });
  if (!!debouncedValue) {
    query["searchTerm"] = debouncedValue;
  }
  const { data, isLoading } = useGetAllVocabularyQuery({ ...query });
  const vocabularies = data?.vocabularies;
  console.log(vocabularies);
  const [deleteVocabulary] = useDeleteVocabularyMutation();

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteVocabulary(id).unwrap();
      } catch (err: any) {
        console.error(err);
      }
      Swal.fire("Deleted!", "vocabulary, has been deleted.", "success");
    } else {
      Swal.fire("Cancelled", "vocabulary item is safe :)", "info");
    }
  };

  // Handle different states
  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  const columns: GridColDef[] = [
    {
      field: "word",
      headerName: "Word",
      align: "center",
      headerAlign: "center",
      flex: 1,
      //   renderCell: ({ row }) => {
      //     return (
      //       <Box>
      //         <Typography>{row?.name}</Typography>
      //       </Box>
      //     );
      //   },
    },
    {
      field: "pronunciation",
      headerName: "Pronunciation",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "meaning",
      headerName: "Meaning",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "whenToSay",
      headerName: "When To Say",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },

    {
      field: "action",
      headerName: "Action",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => {
        return (
          <IconButton onClick={() => handleDelete(row?.id)} aria-label="delete">
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h4"
          component="h1"
          color="primary.main"
          fontWeight={400}
        >
          ALL USERS:{" "}
        </Typography>
        <TextField
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Users"
        ></TextField>
      </Stack>
      <Box mt={4}>
        <Paper sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={vocabularies || []}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection
            sx={{ border: 0 }}
          />
          {(!vocabularies || vocabularies.length === 0) && (
            <Typography sx={{ textAlign: "center", mt: 2, pb: 2 }} variant="h6">
              No pets found!
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default ManageVocabulary;
