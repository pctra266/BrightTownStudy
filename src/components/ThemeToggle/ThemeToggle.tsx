import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  SettingsBrightness,
} from "@mui/icons-material";
import { useThemeMode } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { mode, setMode, actualTheme } = useThemeMode();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModeChange = (newMode: "system" | "light" | "dark") => {
    setMode(newMode);
    handleClose();
  };

  const getIcon = () => {
    if (mode === "system") return <SettingsBrightness />;
    return actualTheme === "dark" ? <Brightness4 /> : <Brightness7 />;
  };

  const getTooltipText = () => {
    switch (mode) {
      case "system":
        return "System theme";
      case "light":
        return "Light theme";
      case "dark":
        return "Dark theme";
      default:
        return "Theme";
    }
  };

  return (
    <>
      <Tooltip title={getTooltipText()}>
        <IconButton
          color="inherit"
          onClick={handleClick}
          aria-controls={open ? "theme-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          {getIcon()}
        </IconButton>
      </Tooltip>
      <Menu
        id="theme-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => handleModeChange("system")}
          selected={mode === "system"}
        >
          <ListItemIcon>
            <SettingsBrightness fontSize="small" />
          </ListItemIcon>
          <ListItemText>System</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => handleModeChange("light")}
          selected={mode === "light"}
        >
          <ListItemIcon>
            <Brightness7 fontSize="small" />
          </ListItemIcon>
          <ListItemText>Light</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => handleModeChange("dark")}
          selected={mode === "dark"}
        >
          <ListItemIcon>
            <Brightness4 fontSize="small" />
          </ListItemIcon>
          <ListItemText>Dark</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ThemeToggle;
