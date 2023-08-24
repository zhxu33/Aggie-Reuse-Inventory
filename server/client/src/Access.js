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
  const [editedData, setEditedData] = useState({
    name: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    setselectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
  };

  const handleAddItem = async () => {
    if (editedData.name && editedData.description && editedData.category) {
      try {
        const response = await axios.post(API_URL, editedData);
        getItems();
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

  const handleEditItem = async () => {
    if (selectedRows.length === 1) {
      try {
        await axios.put(API_URL + "/" + selectedRows[0], editedData);
        getItems();
      } catch (error) {
        alert("Failed, please add item data");
      }
    } else {
      alert("Please select data");
    }
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
        let items = response.data;
        if (selectedCategory !== "All") {
          items = items.filter((item) => {
            return item.category === selectedCategory;
          });
        }
        setItems(items);
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
            label="Category"
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
        <Grid item md={2} alignItems="center">
          <Button sx={{ mt: 1.5 }} onClick={getItems}>
            Search
          </Button>
        </Grid>
        <Paper style={{ marginTop: 20, height: "90%", width: "90%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 10,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{
                marginRight: 8,
              }}
              onClick={handleAddItem}
            >
              Add
            </Button>
            <TextField
              label="Name"
              variant="outlined"
              size="small"
              value={editedData.name}
              onChange={(e) =>
                setEditedData({ ...editedData, name: e.target.value })
              }
              style={{
                marginRight: 8,
                flexShrink: 1,
                minWidth: 100,
                maxWidth: 200,
                flexGrow: 1,
              }}
            />
            <TextField
              select
              label="Edit Category"
              size="small"
              value={editedData.category}
              variant="outlined"
              style={{
                marginRight: 8,
                flexShrink: 1,
                minWidth: 100,
                maxWidth: 200,
                flexGrow: 1,
              }}
              onChange={(e) =>
                setEditedData({ ...editedData, category: e.target.value })
              }
            >
              {categories.map(
                (category, i) =>
                  i !== 0 && (
                    <MenuItem key={i} value={category}>
                      {category}
                    </MenuItem>
                  )
              )}
            </TextField>
            <TextField
              label="Description"
              variant="outlined"
              size="small"
              value={editedData.description}
              onChange={(e) =>
                setEditedData({ ...editedData, description: e.target.value })
              }
              style={{
                marginRight: 8,
                flexShrink: 1,
                minWidth: 100,
                flexGrow: 1,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              disabled={selectedRows.length !== 1}
              onClick={handleEditItem}
            >
              Update
            </Button>
          </div>
          <DataGrid
            rows={items}
            columns={columns}
            checkboxSelection
            onRowSelectionModelChange={handleSelectionChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeleteClick}
            style={{ marginTop: 10 }}
            disabled={selectedRows.length === 0}
            initialState={{
              sorting: {
                sortModel: [{ field: "id", sort: "desc" }],
              },
            }}
          >
            Delete
          </Button>
        </Paper>
      </Grid>
    </div>
  );
};
export default Access;
