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

const ManageLesson = () => {
  const query: Record<string, any> = {};
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedValue = useDebounced({ searchQuery: searchQuery, delay: 900 });
  if (!!debouncedValue) {
    query["searchTerm"] = debouncedValue;
  }
  const { data, isLoading } = useGetAllLessonQuery({ ...query });
  const lessons = data?.lessons;
  console.log(lessons);
  const [deleteLesson] = useDeleteLessonMutation();

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
        await deleteLesson(id).unwrap();
      } catch (err: any) {
        console.error(err);
      }
      Swal.fire("Deleted!", "Lesson, has been deleted.", "success");
    } else {
      Swal.fire("Cancelled", "Lesson item is safe :)", "info");
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
      field: "imageUrl",
      headerName: "Image",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Image
              src={
                row?.photoUrl ||
                "https://i.postimg.cc/6qRH1Y3S/profile-icon.png"
              }
              alt="profile"
              height={30}
              width={30}
            />
          </Box>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography>{row?.name}</Typography>
          </Box>
        );
      },
    },
    {
      field: "lessonNumber",
      headerName: "Lesson No",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },

    {
      field: "isPublish",
      headerName: "Publish Status",
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Chip
            label={row?.isPublish === true ? "true" : "false"}
            color={row?.isPublish === "ACTIVE" ? "success" : "error"}
          />
        );
      },
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
            rows={lessons || []}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection
            sx={{ border: 0 }}
          />
          {(!lessons || lessons.length === 0) && (
            <Typography sx={{ textAlign: "center", mt: 2, pb: 2 }} variant="h6">
              No pets found!
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default ManageLesson;
