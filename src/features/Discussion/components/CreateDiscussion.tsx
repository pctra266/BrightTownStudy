import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Stack,
  Alert,
} from "@mui/material";
import { ArrowBack, Send } from "@mui/icons-material";
import { useAuth } from "../../../context/AuthContext";
import { discussionService } from "../services/discussionService";

const CreateDiscussion = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Please fill in both title and content of the question.");
      return;
    }

    if (!user) {
      setError("You must be logged in to ask questions.");
      return;
    }

    // Allow both users (role "2") and admins (role "1") to create discussions
    if (user.role !== "2" && user.role !== "1") {
      setError("You don't have permission to ask questions.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const newDiscussion = await discussionService.createDiscussion({
        title: title.trim(),
        content: content.trim(),
        authorId: user.id,
        authorName: user.username,
      });

      navigate(`/talk/${newDiscussion.id}`);
    } catch (error) {
      console.error("Error creating discussion:", error);
      setError(
        "An error occurred while posting the question. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/talk", { state: { refresh: true } });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Back button */}
      <Button startIcon={<ArrowBack />} onClick={handleBack} sx={{ mb: 3 }}>
        Back to list
      </Button>

      <Card>
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            sx={{ mb: 3, fontWeight: 600 }}
          >
            Ask New Question
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Question Title"
              placeholder="Enter your question title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <TextField
              fullWidth
              multiline
              rows={8}
              label="Question Content"
              placeholder="Describe your question in detail..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />

            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<Send />}
                onClick={handleSubmit}
                disabled={!title.trim() || !content.trim() || submitting}
              >
                {submitting ? "Posting..." : "Post Question"}
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CreateDiscussion;
