import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import { useAuth } from "../../../context/AuthContext";

const Admin: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            Admin Dashboard
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Welcome, {user?.username}!
          </Typography>
          <Typography variant="body1">
            You are logged in as an administrator. You have full access to the
            system.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Admin;
