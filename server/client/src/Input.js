import React, { useState } from "react";
import { Button, Card, Grid, TextField, Box } from "@mui/material";
import Navbar from "./NavBar.js";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import axios from "axios";

const Input = () => {
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [selectedItem, setSelectedItem] = React.useState("");

  const categories = [
    "Clothing",
    "School Supplies",
    "Accessories & Bags",
    "Craft & Art Supplies",
    "Fabric & Texiles",
    "Others",
  ];

  const handleChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const API_URL = "/items";

  const handleSubmit = async () => {
    const itemData = {
      name: itemName,
      description: itemDesc,
      category: selectedItem,
    };
    if (itemName && itemDesc && selectedItem) {
      try {
        const response = await axios.post(API_URL, itemData);
        if (response.data) {
          alert("Successfully added item id " + response.data.id);
        }
      } catch (error) {
        alert("Failed, please add item data");
      }
    } else {
      alert("Please enter data");
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <Navbar />
      <form autoComplete="off" noValidate md={6} style={{ height: "50vh" }}>
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
          <Typography
            variant="h5"
            component="div"
            marginTop={3}
            paddingRight={3}
            paddingLeft={3}
            sx={{ mb: 1.5, fontWeight: "bold", color: "#054287" }}
          >
            Add item:
          </Typography>
          <Grid
            container
            rowSpacing={7}
            columnSpacing={{ xs: 1, sm: 2, md: 4 }}
            paddingRight={3}
            paddingLeft={3}
          >
            <Grid item md={12} xs={12}>
              <TextField
                sx={{ minWidth: "49%", backgroundColor: "#ffffff" }}
                required
                label="Item Name"
                variant="outlined"
                value={itemName}
                onChange={(event) => {
                  setItemName(event.target.value);
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                sx={{ backgroundColor: "#ffffff" }}
                select
                required
                label="Item Type"
                value={selectedItem}
                onChange={handleChange}
              >
                {categories.map(function (category, i) {
                  return (
                    <MenuItem key={i} value={category}>
                      {category}
                    </MenuItem>
                  );
                })}
              </TextField>
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
