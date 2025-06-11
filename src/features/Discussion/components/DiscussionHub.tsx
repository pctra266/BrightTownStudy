import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Chip,
  Stack,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import {
  Add as AddIcon,
  QuestionAnswer,
  AccessTime,
  Person,
  EditNote,
  Visibility,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { discussionService } from "../services/discussionService";

interface Discussion {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string | null;
  isEdited: boolean;
  upvotes: number;
  downvotes: number;
  score: number;
  userVotes: { [userId: string]: "upvote" | "downvote" };
  views: number;
  viewedBy: string[];
  answers: any[];
}

const DiscussionHub = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [filteredDiscussions, setFilteredDiscussions] = useState<Discussion[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const discussionsPerPage = 5;

  useEffect(() => {
    loadDiscussions();
  }, []);

  // Refresh discussions when returning from detail page
  useEffect(() => {
    if (location.state?.refresh) {
      loadDiscussions();
      // Clear the state to prevent multiple refreshes
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    filterAndSortDiscussions();
  }, [discussions, searchTerm, sortBy]);

  const loadDiscussions = async () => {
    try {
      const data = await discussionService.getAllDiscussions();
      setDiscussions(data);
    } catch (error) {
      console.error("Error loading discussions:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortDiscussions = () => {
    let filtered = discussions.filter(
      (discussion) =>
        discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discussion.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "mostAnswers":
        filtered.sort((a, b) => b.answers.length - a.answers.length);
        break;
      case "mostViews":
        filtered.sort((a, b) => b.views - a.views);
        break;
      case "highestScore":
        filtered.sort((a, b) => b.score - a.score);
        break;
      case "unanswered":
        filtered = filtered.filter(
          (discussion) => discussion.answers.length === 0
        );
        break;
    }

    setFilteredDiscussions(filtered);
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDiscussionClick = (id: string) => {
    navigate(`/talk/${id}`);
  };

  const handleCreateQuestion = () => {
    navigate("/talk/new");
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredDiscussions.length / discussionsPerPage);
  const startIndex = (currentPage - 1) * discussionsPerPage;
  const currentDiscussions = filteredDiscussions.slice(
    startIndex,
    startIndex + discussionsPerPage
  );

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography variant="h4" component="h1" fontWeight="bold">
            Discussion Hub
          </Typography>
          {isAuthenticated && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateQuestion}
              sx={{ minWidth: "160px" }}
            >
              Ask Question
            </Button>
          )}
        </Stack>

        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Total questions: {filteredDiscussions.length}
        </Typography>

        {!isAuthenticated && (
          <Box sx={{ p: 2, bgcolor: "info.light", borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" color="info.contrastText">
              You need to log in to ask questions and answer questions.
            </Typography>
          </Box>
        )}
      </Box>

      {/* Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortBy}
                label="Sort by"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="oldest">Oldest</MenuItem>
                <MenuItem value="mostAnswers">Most Answers</MenuItem>
                <MenuItem value="mostViews">Most Views</MenuItem>
                <MenuItem value="highestScore">Highest Score</MenuItem>
                <MenuItem value="unanswered">Unanswered</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Questions List */}
      <Box sx={{ mb: 4 }}>
        {currentDiscussions.length === 0 ? (
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            sx={{ py: 4 }}
          >
            No questions found.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {currentDiscussions.map((discussion) => (
              <Card
                key={discussion.id}
                sx={{
                  cursor: "pointer",
                  "&:hover": { bgcolor: "action.hover" },
                  transition: "background-color 0.2s",
                }}
                onClick={() => handleDiscussionClick(discussion.id)}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ mb: 1, fontWeight: 600 }}
                  >
                    {discussion.title}
                    {discussion.isEdited && (
                      <Chip
                        icon={<EditNote />}
                        label="Edited"
                        size="small"
                        color="secondary"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {discussion.content}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    <Chip
                      icon={<Person />}
                      label={discussion.authorName}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      icon={<AccessTime />}
                      label={formatDate(discussion.createdAt)}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      icon={<QuestionAnswer />}
                      label={`${discussion.answers.length} answers`}
                      size="small"
                      color={
                        discussion.answers.length > 0 ? "primary" : "default"
                      }
                    />
                    <Chip
                      icon={<Visibility />}
                      label={`${discussion.views} views`}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      label={`Score: ${discussion.score}`}
                      size="small"
                      color={
                        discussion.score > 0
                          ? "success"
                          : discussion.score < 0
                          ? "error"
                          : "default"
                      }
                      variant="outlined"
                    />
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Box>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Container>
  );
};

export default DiscussionHub;
