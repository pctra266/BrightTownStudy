import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Stack,
  Chip,
  Divider,
  Alert,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  FormControl,
  InputLabel,
  Select,
  Pagination,
} from "@mui/material";
import {
  ArrowBack,
  Person,
  AccessTime,
  Send,
  MoreVert,
  Edit,
  Delete,
  EditNote,
  Visibility,
} from "@mui/icons-material";
import { useAuth } from "../../../context/AuthContext";
import {
  discussionService,
  type Discussion,
  type Answer,
} from "../services/discussionService";
import VoteButtons from "./VoteButtons";

const DiscussionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [discussion, setDiscussion] = useState<Discussion | null>(null);
  const [loading, setLoading] = useState(true);
  const [answerContent, setAnswerContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [currentAnswerPage, setCurrentAnswerPage] = useState(1);
  const [answerSortBy, setAnswerSortBy] = useState("newest");
  const [filteredAnswers, setFilteredAnswers] = useState<Answer[]>([]);
  const answersPerPage = 3;

  const [editingQuestion, setEditingQuestion] = useState(false);
  const [editQuestionTitle, setEditQuestionTitle] = useState("");
  const [editQuestionContent, setEditQuestionContent] = useState("");
  const [editingAnswer, setEditingAnswer] = useState<string | null>(null);
  const [editAnswerContent, setEditAnswerContent] = useState("");

  const [questionMenuAnchor, setQuestionMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [answerMenuAnchor, setAnswerMenuAnchor] = useState<{
    [key: string]: HTMLElement | null;
  }>({});

  const [deleteQuestionDialog, setDeleteQuestionDialog] = useState(false);
  const [deleteAnswerDialog, setDeleteAnswerDialog] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (id) {
      loadDiscussion();
    }
  }, [id]);

  useEffect(() => {
    if (discussion) {
      filterAndSortAnswers();
    }
  }, [discussion, answerSortBy]);

  const loadDiscussion = async () => {
    try {
      const data = await discussionService.getDiscussionById(id!);
      setDiscussion(data);
      setEditQuestionTitle(data.title);
      setEditQuestionContent(data.content);

      if (user && user.id !== data.authorId) {
        try {
          const updatedData = await discussionService.trackView(id!, user.id);
          setDiscussion(updatedData);
        } catch (error) {
          console.error("Error tracking view:", error);
        }
      }
    } catch (error) {
      console.error("Error loading discussion:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortAnswers = () => {
    if (!discussion) return;

    let sorted = [...discussion.answers];

    switch (answerSortBy) {
      case "newest":
        sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        sorted.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "highestScore":
        sorted.sort((a, b) => b.score - a.score);
        break;
      case "lowestScore":
        sorted.sort((a, b) => a.score - b.score);
        break;
    }

    setFilteredAnswers(sorted);
    setCurrentAnswerPage(1);
  };

  const handleVoteOnQuestion = async (voteType: "upvote" | "downvote") => {
    if (!user || !id || !discussion) return;

    try {
      const updatedDiscussion = await discussionService.voteOnDiscussion(id, {
        userId: user.id,
        voteType,
      });
      setDiscussion(updatedDiscussion);
    } catch (error) {
      console.error("Error voting on question:", error);
    }
  };

  const handleVoteOnAnswer = async (
    answerId: string,
    voteType: "upvote" | "downvote"
  ) => {
    if (!user || !id || !discussion) return;

    try {
      const updatedDiscussion = await discussionService.voteOnAnswer(
        id,
        answerId,
        {
          userId: user.id,
          voteType,
        }
      );
      setDiscussion(updatedDiscussion);
    } catch (error) {
      console.error("Error voting on answer:", error);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!answerContent.trim() || !user || !id || !discussion) return;

    setSubmitting(true);
    try {
      const updatedDiscussion = await discussionService.addAnswer({
        content: answerContent.trim(),
        authorId: user.id,
        authorName: user.username,
        discussionId: id,
      });

      setDiscussion(updatedDiscussion);
      setAnswerContent("");
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateQuestion = async () => {
    if (
      !editQuestionTitle.trim() ||
      !editQuestionContent.trim() ||
      !id ||
      !discussion
    )
      return;

    try {
      const updatedDiscussion = await discussionService.updateDiscussion(id, {
        title: editQuestionTitle.trim(),
        content: editQuestionContent.trim(),
      });

      setDiscussion(updatedDiscussion);
      setEditingQuestion(false);
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleDeleteQuestion = async () => {
    if (!id) return;

    try {
      await discussionService.deleteDiscussion(id);
      navigate("/talk");
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleUpdateAnswer = async (answerId: string) => {
    if (!editAnswerContent.trim() || !id || !discussion) return;

    try {
      const updatedDiscussion = await discussionService.updateAnswer(
        id,
        answerId,
        {
          content: editAnswerContent.trim(),
        }
      );

      setDiscussion(updatedDiscussion);
      setEditingAnswer(null);
      setEditAnswerContent("");
    } catch (error) {
      console.error("Error updating answer:", error);
    }
  };

  const handleDeleteAnswer = async (answerId: string) => {
    if (!id || !discussion) return;

    try {
      const updatedDiscussion = await discussionService.deleteAnswer(
        id,
        answerId
      );
      setDiscussion(updatedDiscussion);
    } catch (error) {
      console.error("Error deleting answer:", error);
    }
  };

  const totalAnswerPages = Math.ceil(filteredAnswers.length / answersPerPage);
  const startAnswerIndex = (currentAnswerPage - 1) * answersPerPage;
  const currentAnswers = filteredAnswers.slice(
    startAnswerIndex,
    startAnswerIndex + answersPerPage
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const canEditDelete = useCallback(
    (authorId: string) => {
      return isAuthenticated && user?.id === authorId;
    },
    [isAuthenticated, user?.id]
  );

  const canVote = useCallback(
    (authorId: string) => {
      // Allow both users and admins to vote, but not on their own posts
      return isAuthenticated && user?.id !== authorId;
    },
    [isAuthenticated, user?.id]
  );

  const openAnswerMenu = (
    answerId: string,
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnswerMenuAnchor((prev) => ({
      ...prev,
      [answerId]: event.currentTarget,
    }));
  };

  const closeAnswerMenu = (answerId: string) => {
    setAnswerMenuAnchor((prev) => ({ ...prev, [answerId]: null }));
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!discussion) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Question not found.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/talk")}
        sx={{ mb: 3 }}
      >
        Back to list
      </Button>

      {/* Question */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stack direction="row" spacing={2}>
            {/* Vote buttons for question */}
            <VoteButtons
              score={discussion.score}
              userVote={
                user && discussion.userVotes
                  ? discussion.userVotes[user.id]
                  : undefined
              }
              onUpvote={() => handleVoteOnQuestion("upvote")}
              onDownvote={() => handleVoteOnQuestion("downvote")}
              disabled={!canVote(discussion.authorId)}
            />

            <Box sx={{ flex: 1 }}>
              {editingQuestion ? (
                <Box>
                  <TextField
                    fullWidth
                    label="Question Title"
                    value={editQuestionTitle}
                    onChange={(e) => setEditQuestionTitle(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Question Content"
                    value={editQuestionContent}
                    onChange={(e) => setEditQuestionContent(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      onClick={handleUpdateQuestion}
                      disabled={
                        !editQuestionTitle.trim() || !editQuestionContent.trim()
                      }
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setEditingQuestion(false);
                        setEditQuestionTitle(discussion.title);
                        setEditQuestionContent(discussion.content);
                      }}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Box>
              ) : (
                <Box>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Typography
                      variant="h4"
                      component="h1"
                      sx={{ mb: 2, fontWeight: 600, flex: 1 }}
                    >
                      {discussion.title}
                      {discussion.isEdited && (
                        <Chip
                          icon={<EditNote />}
                          label="Edited"
                          size="small"
                          color="secondary"
                          sx={{ ml: 2 }}
                        />
                      )}
                    </Typography>

                    {canEditDelete(discussion.authorId) && (
                      <IconButton
                        onClick={(e) => setQuestionMenuAnchor(e.currentTarget)}
                      >
                        <MoreVert />
                      </IconButton>
                    )}
                  </Stack>

                  <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
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
                      label={`Created: ${formatDate(discussion.createdAt)}`}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      icon={<Visibility />}
                      label={`${discussion.views} views`}
                      size="small"
                      variant="outlined"
                    />
                    {discussion.isEdited && discussion.updatedAt && (
                      <Chip
                        icon={<EditNote />}
                        label={`Edited: ${formatDate(discussion.updatedAt)}`}
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                    )}
                  </Stack>
                </Box>
              )}
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Question Menu */}
      <Menu
        anchorEl={questionMenuAnchor}
        open={Boolean(questionMenuAnchor)}
        onClose={() => setQuestionMenuAnchor(null)}
      >
        <MenuItem
          onClick={() => {
            setEditingQuestion(true);
            setQuestionMenuAnchor(null);
          }}
        >
          <Edit sx={{ mr: 1 }} /> Edit Question
        </MenuItem>
        <MenuItem
          onClick={() => {
            setDeleteQuestionDialog(true);
            setQuestionMenuAnchor(null);
          }}
        >
          <Delete sx={{ mr: 1 }} /> Delete Question
        </MenuItem>
      </Menu>

      {/* Answers section */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Answers ({discussion.answers.length})
        </Typography>

        {discussion.answers.length > 0 && (
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Sort answers by</InputLabel>
            <Select
              value={answerSortBy}
              label="Sort answers by"
              onChange={(e) => setAnswerSortBy(e.target.value)}
            >
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
              <MenuItem value="highestScore">Highest Score</MenuItem>
              <MenuItem value="lowestScore">Lowest Score</MenuItem>
            </Select>
          </FormControl>
        )}
      </Stack>

      {discussion.answers.length === 0 ? (
        <Alert severity="info" sx={{ mb: 4 }}>
          No answers yet. Be the first to answer this question!
        </Alert>
      ) : (
        <>
          <Stack spacing={3} sx={{ mb: 4 }}>
            {currentAnswers.map((answer: Answer) => (
              <Card key={answer.id} variant="outlined">
                <CardContent>
                  <Stack direction="row" spacing={2}>
                    {/* Vote buttons for answer */}
                    <VoteButtons
                      score={answer.score}
                      userVote={
                        user && answer.userVotes
                          ? answer.userVotes[user.id]
                          : undefined
                      }
                      onUpvote={() => handleVoteOnAnswer(answer.id, "upvote")}
                      onDownvote={() =>
                        handleVoteOnAnswer(answer.id, "downvote")
                      }
                      disabled={!canVote(answer.authorId)}
                    />

                    <Box sx={{ flex: 1 }}>
                      {editingAnswer === answer.id ? (
                        <Box>
                          <TextField
                            fullWidth
                            multiline
                            rows={4}
                            value={editAnswerContent}
                            onChange={(e) =>
                              setEditAnswerContent(e.target.value)
                            }
                            sx={{ mb: 2 }}
                          />
                          <Stack direction="row" spacing={2}>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleUpdateAnswer(answer.id)}
                              disabled={!editAnswerContent.trim()}
                            >
                              Save Changes
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => {
                                setEditingAnswer(null);
                                setEditAnswerContent("");
                              }}
                            >
                              Cancel
                            </Button>
                          </Stack>
                        </Box>
                      ) : (
                        <Box>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                          >
                            <Typography
                              variant="body1"
                              sx={{ mb: 2, lineHeight: 1.6, flex: 1 }}
                            >
                              {answer.content}
                              {answer.isEdited && (
                                <Chip
                                  icon={<EditNote />}
                                  label="Edited"
                                  size="small"
                                  color="secondary"
                                  sx={{ ml: 1 }}
                                />
                              )}
                            </Typography>

                            {canEditDelete(answer.authorId) && (
                              <IconButton
                                size="small"
                                onClick={(e) => openAnswerMenu(answer.id, e)}
                              >
                                <MoreVert />
                              </IconButton>
                            )}
                          </Stack>

                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            flexWrap="wrap"
                          >
                            <Chip
                              icon={<Person />}
                              label={answer.authorName}
                              size="small"
                              variant="outlined"
                            />
                            <Chip
                              icon={<AccessTime />}
                              label={`Created: ${formatDate(answer.createdAt)}`}
                              size="small"
                              variant="outlined"
                            />
                            {answer.isEdited && answer.updatedAt && (
                              <Chip
                                icon={<EditNote />}
                                label={`Edited: ${formatDate(
                                  answer.updatedAt
                                )}`}
                                size="small"
                                color="secondary"
                                variant="outlined"
                              />
                            )}
                          </Stack>
                        </Box>
                      )}

                      {/* Answer Menu */}
                      <Menu
                        anchorEl={answerMenuAnchor[answer.id]}
                        open={Boolean(answerMenuAnchor[answer.id])}
                        onClose={() => closeAnswerMenu(answer.id)}
                      >
                        <MenuItem
                          onClick={() => {
                            setEditingAnswer(answer.id);
                            setEditAnswerContent(answer.content);
                            closeAnswerMenu(answer.id);
                          }}
                        >
                          <Edit sx={{ mr: 1 }} /> Edit Answer
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setDeleteAnswerDialog(answer.id);
                            closeAnswerMenu(answer.id);
                          }}
                        >
                          <Delete sx={{ mr: 1 }} /> Delete Answer
                        </MenuItem>
                      </Menu>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>

          {/* Answer Pagination */}
          {totalAnswerPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
              <Pagination
                count={totalAnswerPages}
                page={currentAnswerPage}
                onChange={(event, value) => setCurrentAnswerPage(value)}
                color="primary"
                size="medium"
              />
            </Box>
          )}
        </>
      )}

      <Divider sx={{ my: 4 }} />

      {/* Answer form */}
      {isAuthenticated ? (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Your Answer
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Write your answer..."
              value={answerContent}
              onChange={(e) => setAnswerContent(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button
              variant="contained"
              startIcon={<Send />}
              onClick={handleSubmitAnswer}
              disabled={!answerContent.trim() || submitting}
            >
              {submitting ? "Posting..." : "Post Answer"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Alert severity="warning">
          You need to log in to answer questions.
        </Alert>
      )}

      {/* Delete Question Dialog */}
      <Dialog
        open={deleteQuestionDialog}
        onClose={() => setDeleteQuestionDialog(false)}
      >
        <DialogTitle>Delete Question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this question? This action cannot be
            undone. All answers will also be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteQuestionDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleDeleteQuestion();
              setDeleteQuestionDialog(false);
            }}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Answer Dialog */}
      <Dialog
        open={Boolean(deleteAnswerDialog)}
        onClose={() => setDeleteAnswerDialog(null)}
      >
        <DialogTitle>Delete Answer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this answer? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteAnswerDialog(null)}>Cancel</Button>
          <Button
            onClick={() => {
              if (deleteAnswerDialog) {
                handleDeleteAnswer(deleteAnswerDialog);
                setDeleteAnswerDialog(null);
              }
            }}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DiscussionDetail;
