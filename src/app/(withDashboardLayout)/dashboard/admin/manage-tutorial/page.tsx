"use client";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import Swal from "sweetalert2";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDebounced } from "@/redux/hooks";

import {
  useDeleteTutorialMutation,
  useGetAllTutorialQuery,
} from "@/redux/api/tutorialApi";
import TutorialModal from "./components/TutorialModal";

const ManageTutorial = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const query: Record<string, any> = {};
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedValue = useDebounced({ searchQuery: searchQuery, delay: 900 });
  if (!!debouncedValue) {
    query["searchTerm"] = debouncedValue;
  }
  const { data, isLoading } = useGetAllTutorialQuery({ ...query });
  const tutorials = data?.tutorials;
  const [deleteTutorial] = useDeleteTutorialMutation();

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
        await deleteTutorial(id).unwrap();
      } catch (err: any) {
        console.error(err);
      }
      Swal.fire("Deleted!", "tutorial, has been deleted.", "success");
    } else {
      Swal.fire("Cancelled", "tutorial item is safe :)", "info");
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Tutoril Title",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "id",
      headerName: "Tutorial ID",
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
          <>
            <IconButton
              onClick={() => handleDelete(row?.id)}
              aria-label="delete"
            >
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
            <IconButton sx={{ py: 2 }} onClick={() => setIsModalOpen(true)}>
              <EditLocationAltIcon sx={{ color: "red" }} />
            </IconButton>
            <TutorialModal
              open={isModalOpen}
              setOpen={setIsModalOpen}
              tutorialId={row?.id}
            />
          </>
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
          ALL TUTORIAL:{" "}
        </Typography>
        <TextField
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Tutorial"
        ></TextField>
      </Stack>
      <Box mt={4}>
        <Paper sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={tutorials || []}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection
            sx={{ border: 0 }}
          />
          {(!tutorials || tutorials.length === 0) && (
            <Typography sx={{ textAlign: "center", mt: 2, pb: 2 }} variant="h6">
              No tutorial found!
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default ManageTutorial;
