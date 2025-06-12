import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import { useAuth } from "../../../context/AuthContext";

const User: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            User Dashboard
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Welcome, {user?.username}!
          </Typography>
          <Typography variant="body1">
            You are logged in as a user. This is your personal dashboard.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default User;
