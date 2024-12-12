import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";

type TLessonCardProps = {
  imageUrl: string;
  name: string;
  id: string;
  lessonNumber: number;
};

const LessonCard = ({ imageUrl, name, id, lessonNumber }: TLessonCardProps) => {
  return (
    <Link href={`/lesson/${id}`} passHref>
      <Card
        sx={{
          cursor: "pointer",
          borderRadius: 2,
          boxShadow: 3,
          "&:hover": {
            boxShadow: 8,
            transform: "scale(1.05)",
            transition: "all 0.3s ease-in-out",
          },
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <CardMedia
          component="img"
          image={imageUrl}
          alt={name}
          sx={{
            height: 220,
            objectFit: "cover",
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
          }}
        />
        <CardContent sx={{ padding: 3 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: "primary.main",
              marginBottom: 1,
              fontSize: "1.2rem",
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "text.secondary",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            Lesson Number: {lessonNumber}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LessonCard;
