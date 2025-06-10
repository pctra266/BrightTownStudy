import React from "react";
import { Stack, IconButton, Typography } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { useAuth } from "../../../context/AuthContext";

interface VoteButtonsProps {
  score: number;
  userVote?: "upvote" | "downvote";
  onUpvote: () => void;
  onDownvote: () => void;
  disabled?: boolean;
}

const VoteButtons: React.FC<VoteButtonsProps> = ({
  score,
  userVote,
  onUpvote,
  onDownvote,
  disabled = false,
}) => {
  const { isAuthenticated } = useAuth();

  const canVote = isAuthenticated && !disabled;

  return (
    <Stack direction="column" alignItems="center" sx={{ minWidth: 40 }}>
      <IconButton
        onClick={onUpvote}
        disabled={!canVote}
        color={userVote === "upvote" ? "primary" : "default"}
        sx={{
          p: 0.5,
          "&:hover": {
            backgroundColor: canVote
              ? "rgba(25, 118, 210, 0.04)"
              : "transparent",
          },
        }}
      >
        <KeyboardArrowUp
          sx={{
            fontSize: 24,
            color: userVote === "upvote" ? "primary.main" : "text.secondary",
          }}
        />
      </IconButton>

      <Typography
        variant="body2"
        fontWeight="bold"
        sx={{
          minHeight: 20,
          display: "flex",
          alignItems: "center",
          color:
            score > 0
              ? "success.main"
              : score < 0
              ? "error.main"
              : "text.secondary",
        }}
      >
        {score || 0}
      </Typography>

      <IconButton
        onClick={onDownvote}
        disabled={!canVote}
        color={userVote === "downvote" ? "error" : "default"}
        sx={{
          p: 0.5,
          "&:hover": {
            backgroundColor: canVote
              ? "rgba(211, 47, 47, 0.04)"
              : "transparent",
          },
        }}
      >
        <KeyboardArrowDown
          sx={{
            fontSize: 24,
            color: userVote === "downvote" ? "error.main" : "text.secondary",
          }}
        />
      </IconButton>
    </Stack>
  );
};

export default VoteButtons;
