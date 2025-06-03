import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const pages = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Flashcards", path: "/flashcards" },
      { name: "library", path: "/library" },
  ];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <CastForEducationIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".0.5rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Bright Town Study
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map(({ name, path }) => (
                  <MenuItem
                    key={path}
                    onClick={handleCloseNavMenu}
                    disableGutters
                  >
                    <Link
                      to={path}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        width: "100%",
                        display: "block",
                        padding: "6px 16px",
                      }}
                    >
                      {name}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <CastForEducationIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".0.5rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Bright Town Study
            </Typography>

            <Box
              sx={{
                ml: "auto",
                display: { xs: "none", md: "flex" },
                alignItems: "center",
              }}
            >
              {pages.map(({ name, path }) => (
                <Button
                  key={path}
                  component={Link}
                  to={path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "inherit",
                    display: "block",
                    textTransform: "none",
                    fontWeight: isActive(path) ? "bold" : "normal",
                    borderBottom: isActive(path)
                      ? "2px solid currentColor"
                      : "none",
                  }}
                >
                  {name.toUpperCase()}
                </Button>
              ))}
              <ThemeToggle />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
