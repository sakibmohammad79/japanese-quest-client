import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
type TVideoCardProps = {
  videoUrl: string;
  title: string;
  description: string;
};

const VideoCard = ({ videoUrl, title, description }: TVideoCardProps) => {
  return (
    <Card>
      <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
        <iframe
          src={videoUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        ></iframe>
      </Box>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
