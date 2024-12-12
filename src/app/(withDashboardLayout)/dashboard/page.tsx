"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Paper from "@mui/material/Paper";

import { Box, Typography } from "@mui/material";
import { useGetAllLessonQuery } from "@/redux/api/lessonApi";
import { useGetAllVocabularyQuery } from "@/redux/api/vobulary.Api";

const DashboardPage = () => {
  const { data: lessons } = useGetAllLessonQuery({});
  const allLessons = [
    { name: "Total Lesson", value: lessons?.meta?.total || 0 },
  ];

  const { data: allVocabulary } = useGetAllVocabularyQuery({});

  const allVocabularys = [
    { name: "Total Vocabulary", value: allVocabulary?.meta?.total || 0 },
  ];

  return (
    <Box>
      <Paper elevation={3} sx={{ padding: 2, mb: 3 }}>
        <Typography
          textAlign="center"
          sx={{ fontSize: { xs: 20, sm: 20, md: 24, lg: 30 } }}
          fontWeight={600}
          py={2}
        >
          ALL Lessons
        </Typography>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={allLessons}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
      <Paper elevation={3} sx={{ padding: 2, mb: 3 }}>
        <Typography
          textAlign="center"
          sx={{ fontSize: { xs: 20, sm: 20, md: 24, lg: 30 } }}
          fontWeight={600}
          py={2}
        >
          All Vocabulary
        </Typography>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={allVocabularys}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default DashboardPage;
