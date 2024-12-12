import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";

type TLessonCardProps = {
  imageUrl: string;
  name: string;
  id: string;
};

const LessonCard = ({ imageUrl, name, id }: TLessonCardProps) => {
  return (
    <Link href={`/lesson/${id}`}>
      <Card
        sx={{
          cursor: "pointer",
          "&:hover": {
            boxShadow: 6,
          },
        }}
      >
        <CardMedia
          component="img"
          image={imageUrl}
          alt={name}
          sx={{ height: 200 }}
        />
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: "primary.main",
            }}
          >
            {name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LessonCard;
