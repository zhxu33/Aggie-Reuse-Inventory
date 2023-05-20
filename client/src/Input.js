import React, { useState } from "react";
import { Button, Card, CardHeader, Grid, TextField, Box } from "@mui/material";
import Navbar from "./NavBar.js";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//import FormGroup from "@mui/material/FormGroup";
//import FormControlLabel from "@mui/material/FormControlLabel";

const Input = () => {
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");

  const handleDescChange = () => {
    console.log("desc changed");
  };

  const handleNameChange = () => {
    console.log("name changed");
  };

  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/items";

  const handleSubmit = async () => {
    const itemData = { name: itemName, description: itemDesc };
    console.log(itemData);
    try {
      const response = await axios.post(API_URL, itemData);
      if (response.data) {
        alert("Item added successfully!");
        navigate("/");
      }
    } catch (error) {
      alert("Failed, please add item data");
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <Navbar />
      <form autoComplete="off" noValidate md={6} style={{ height: "100vh" }}>
        <Card
          sx={{
            border: 1,
            borderColor: "grey.500",
            backgroundColor: "#fff1a3",
            margin: 5,
            marginBottom: 0,
          }}
          style={{
            minHeight: "78vh",
            overflow: "auto",
            minWidth: "45vw",
          }}
        >
          {/*<CardHeader subheader="Add your item: " />*/}
          <Typography
            variant="h5"
            component="div"
            marginTop={3}
            paddingRight={3}
            paddingLeft={3}
            sx={{ mb: 1.5, fontWeight: "bold", color: "#054287" }}
          >
            Add your items:
          </Typography>
          <Grid
            container
            rowSpacing={7}
            columnSpacing={{ xs: 1, sm: 2, md: 4 }}
            paddingRight={3}
            paddingLeft={3}
          >
            <Grid item md={4} xs={12}>
              <TextField
                sx={{ backgroundColor: "#ffffff" }}
                required
                fullWidth
                label="Item name"
                variant="outlined"
                value={itemName}
                onChange={(event) => {
                  setItemName(event.target.value);
                }}
              />
            </Grid>

            <Grid item md={10} xs={12}>
              <TextField
                sx={{ backgroundColor: "#ffffff" }}
                required
                fullWidth
                label="Item Description"
                variant="outlined"
                multiline
                onChange={(event) => {
                  setItemDesc(event.target.value);
                }}
                value={itemDesc}
                rows={3}
              />
            </Grid>
          </Grid>
        </Card>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "right",
            margin: 5,
            marginTop: 0,
            pt: 2,
          }}
        >
          <Button
            sx={{ fontWeight: "bold", color: "#054287" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Input;
