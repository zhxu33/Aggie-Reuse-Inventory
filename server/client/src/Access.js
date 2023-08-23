import React, { useState, useEffect } from "react";
import { Button, Grid, TextField, InputAdornment } from "@mui/material";
import Navbar from "./NavBar.js";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search.js";
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "time", headerName: "Date", width: 300 },
  { field: "name", headerName: "Name", width: 300 },
  { field: "category", headerName: "Category", width: 300 },
  { field: "description", headerName: "Description", width: 600 },
];

const categories = [
  "All",
  "Clothing",
  "School Supplies",
  "Accessories & Bags",
  "Craft & Art Supplies",
  "Fabric & Texiles",
  "Others",
];

const Access = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setselectedCategory] = React.useState("All");
  const [items, setItems] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, searchTerm]);

  const handleCategoryChange = (event) => {
    setselectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
  };

  const handleDeleteClick = async () => {
    try {
      selectedRows.map(async function (id) {
        await axios.delete(API_URL + "/" + id);
      });
      getItems();
    } catch (error) {
      alert("Failed to delete one or more items!");
    }
    setSelectedRows([]);
  };

  const API_URL = "/items";
  const getItems = async () => {
    try {
      let response;
      if (searchTerm === "") {
        response = await axios.get(API_URL);
      } else {
        response = await axios.get(API_URL + "/" + searchTerm);
      }
      if (response.data) {
        let tempItems = response.data;
        if (selectedCategory !== "All") {
          tempItems = tempItems.filter((item) => {
            return item.category === selectedCategory;
          });
        }
        setItems(tempItems);
      }
    } catch (error) {
      alert("Failed, please retry");
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <Navbar />
      <Grid
        container
        spacing={2}
        columns={16}
        padding={5}
        rowSpacing={10}
        justifyContent="center"
        height="80vh"
      >
        <Grid item xs={3}>
          <TextField
            select
            fullWidth
            label="Item Type"
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant="outlined"
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
        <Grid item md={9} xs={9}>
          <TextField
            value={searchTerm}
            fullWidth
            onChange={handleSearchChange}
            placeholder="Search"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Paper style={{ mt: "20%", height: "100%", width: "90%" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeleteClick}
            style={{ marginTop: 10 }}
            disabled={selectedRows.length === 0}
          >
            Delete
          </Button>
          <DataGrid
            rows={items}
            columns={columns}
            checkboxSelection
            onRowSelectionModelChange={handleSelectionChange}
          />
        </Paper>
      </Grid>
    </div>
  );
};
export default Access;
