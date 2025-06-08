import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link as MuiLink,
  IconButton,
  InputAdornment,
  Alert,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { Link, useNavigate, useLocation, replace } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { authService } from "../services/authService";

const ForgotPassword = () => {
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState("");
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authService.checkUsernameExists(username);

      if (result.exists) {
        setStep(1);
      } else {
        setError("Username does not exist");
      }
    } catch (error) {
      setError("An error occurred while checking username");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirm password do not match");
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const result = await authService.resetPassword(
        username,
        formData.newPassword
      );

      if (result.success) {
        setFormData({ newPassword: "", confirmPassword: "" });
        setSuccess("Password changed successfully!");
        window.location.replace("/login");
      } else {
        setError(result.message || "An error occurred while changing password");
        setLoading(false);
      }
    } catch (error) {
      console.error("Password reset error:", error);
      setError("An error occurred while changing password");
      setLoading(false);
    }
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const steps = ["Enter Username", "Reset Password"];

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Forgot Password
          </Typography>

          <Stepper activeStep={step} sx={{ width: "100%", mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
              {success}
            </Alert>
          )}

          {step === 0 && (
            <Box
              component="form"
              onSubmit={handleUsernameSubmit}
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? "Checking..." : "Continue"}
              </Button>
            </Box>
          )}

          {step === 1 && (
            <Box
              component="form"
              onSubmit={handlePasswordSubmit}
              sx={{ mt: 1, width: "100%" }}
            >
              <Typography variant="body1" sx={{ mb: 2 }}>
                Set new password for account: <strong>{username}</strong>
              </Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                name="newPassword"
                label="New Password"
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                autoComplete="new-password"
                autoFocus
                value={formData.newPassword}
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? "Updating..." : "Reset Password"}
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setStep(0)}
                sx={{ mb: 2 }}
              >
                Back
              </Button>
            </Box>
          )}

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body2">
              Remember your password?{" "}
              <MuiLink component={Link} to="/login" underline="hover">
                Sign in
              </MuiLink>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
