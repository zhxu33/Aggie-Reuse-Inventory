import { AppBar, IconButton, Toolbar, } from "@mui/material";
import { React } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
// import { createMuiTheme } from "@material-ui/core/styles";  
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Navbar = () => {

  const customTheme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#45ab1d',
        darker: '#053e85',
      },
      secondary: {
        main: "#2f4170",
        contrastText: "#ffffff",
      },
      neutral: {
        main: '#ffffff',
        contrastText: '#fff',
      },
    },
  });

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <ThemeProvider theme={customTheme}>
      <AppBar position='sticky' color={"secondary"}>
        <Toolbar >
          {/* variant="dense */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <ThemeProvider theme={customTheme}>
            <Button 
            variant="text" color="neutral" onClick={handleClick}
            style={{
              fontSize: "16px"
            }}>
              Home
            </Button>
          </ThemeProvider>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
