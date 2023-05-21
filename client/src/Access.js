import React, { useState, useEffect } from "react";
import { Button, Grid, TextField, InputAdornment } from "@mui/material";
import Navbar from "./NavBar.js";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import SortIcon from "@mui/icons-material/Sort";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  accordion: {
    // Adjust the height value to your desired height
    minHeight: "6vh",
    backgroundColor: "#f0f2f2",
  },
}));

const Access = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState("SortNew");
  const [selectedItem, setSelectedItem] = React.useState("");
  const [items, setItems] = useState([]);

  setTimeout(function () {
    if (window.location.hash !== "#r") {
      window.location.hash = "r";
      window.location.reload(1);
    }
  }, 0);

  useEffect(() => {
    getItems();
  }, [sortOrder, selectedItem]);

  const handleSelectChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const a = Array.from({ length: items.length }, (_, index) => index + 1);
  const elementsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * elementsPerPage;
  const endIndex = startIndex + elementsPerPage;
  const totalPages = Math.ceil(a.length / elementsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const classes = useStyles();

  const API_URL = "/items";
  const getItems = async () => {
    try {
      let response;
      if (searchTerm === "") {
        response = await axios.get(API_URL);
      } else {
        console.log(API_URL + "/" + searchTerm);
        response = await axios.get(API_URL + "/" + searchTerm);
      }
      if (response.data) {
        let tempItems = response.data;
        if (selectedItem !== "") {
          tempItems = tempItems.filter((item) => {
            return item.category === selectedItem;
          });
        }
        console.log(sortOrder);
        if (sortOrder === "SortNew") {
          tempItems.sort((a, b) => {
            let date = new Date(a.createdAt);
            let date2 = new Date(b.createdAt);
            return date < date2 ? 1 : -1;
          });
        }
        setItems(tempItems);
      }
    } catch (error) {
      alert("Failed, please retry");
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(API_URL + "/" + id);
      if (response.data) {
        alert("Successfully Deleted Item!");
        getItems();
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
        <Grid item xs={2}>
          <TextField
            select
            fullWidth
            label={
              <div>
                <SortIcon />
              </div>
            }
            value={sortOrder}
            onChange={handleSortChange}
            variant="outlined"
          >
            <MenuItem value="SortNew">Sort by Newest</MenuItem>
            <MenuItem value="SortOld">Sort by Oldest</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField
            select
            fullWidth
            label="Item Type"
            value={selectedItem}
            onChange={handleSelectChange}
            variant="outlined"
          >
            <MenuItem value=""> </MenuItem>
            <MenuItem value="clothing">Clothing</MenuItem>
            <MenuItem value="school-supplies">School Supplies</MenuItem>
            <MenuItem value="accessories-bags">Accessories & Bags</MenuItem>
            <MenuItem value="craft-art-supplies">Craft & Art Supplies</MenuItem>
            <MenuItem value="fabric-textiles">Fabric and textiles</MenuItem>
            <MenuItem value="others">Other</MenuItem>
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
        <Grid item md={8} alignItems="center">
          <div>
            {items.slice(startIndex, endIndex).map((item, index) => (
              <Accordion key={index} className={classes.accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>
                    {item.name} - {item.category}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{item.description}</Typography>
                </AccordionDetails>
                <AccordionDetails>
                  <Typography>
                    Date: {Date(item.createdAt).substring(0, 25)}
                  </Typography>
                </AccordionDetails>
                <AccordionDetails>
                  <Typography>ID: {item._id}</Typography>
                </AccordionDetails>
                <Button sx={{ mt: 1.5 }} md={2} color="error">
                  Delete
                </Button>
                <Button sx={{ mt: 1.5 }} md={2}>
                  Edit
                </Button>
              </Accordion>
            ))}
          </div>
        </Grid>
        <Grid item md={12} alignItems="flex-end" justifyContent="center">
          <Grid container justifyContent="center" alignItems="center" mb={3}>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                variant={currentPage === index + 1 ? "contained" : "outlined"}
                color="primary"
                justifyContent="center"
                alignItems="center"
                sx={{
                  mr: 2,
                }}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default Access;
