import React, { useState } from "react";
import { Button, Card, CardHeader, Grid, TextField, Box, InputAdornment} from "@mui/material";
import Navbar from "./NavBar.js";
import MenuItem from '@mui/material/MenuItem';
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import SortIcon from '@mui/icons-material/Sort';
import { Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  accordion: {
    // Adjust the height value to your desired height
    minHeight: '6vh',
    backgroundColor: '#f0f2f2',
  },
}));

const Access = () => {

  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortOrder, setSortOrder] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState('');

  const handleSelectChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const a = Array.from({ length: 100 }, (_, index) => index + 1); // array that will store the items (currently has a fixed length of 100)
  const elementsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * elementsPerPage;
  const endIndex = startIndex + elementsPerPage;
  const visibleElements = a.slice(startIndex, endIndex);

  const totalPages = Math.ceil(a.length / elementsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const classes = useStyles();

  return (
    <div style={{height: '100vh'}}>
      <Navbar />
      <Grid container spacing={2} columns={16} padding={5} rowSpacing={10} justifyContent='center' height='80vh'>
        {/*<Grid item xs={2}>
          <TextField
            select
            fullWidth
            label={
            <div>
              <SortIcon />
            </div>}
            value={sortOrder}
            onChange={handleSortChange}
            variant="outlined"
          >
            <MenuItem value="sortNew">Sort by New</MenuItem>
            <MenuItem value="Sort">Sort by Old</MenuItem>
          </TextField>
        </Grid>*/}
        <Grid item xs={3}>
          <TextField
            select
            fullWidth
            label="Item Type"
            value={selectedItem}
            onChange={handleSelectChange}
            variant="outlined"
          >
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
          <Button sx={{mt: 1.5}}>
              Search
          </Button>
        </Grid>
        <Grid item md={14} alignItems="center">
          <div>
            {visibleElements.map((element) => (
              <Accordion key={element} className={classes.accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{element}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Accordion Content for {element}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </Grid>
        <Grid item md={12} alignItems="flex-end" justifyContent="center">
        <Grid container justifyContent="center" alignItems="center" mb={3}>
          {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                variant={currentPage === index + 1 ? 'contained' : 'outlined'}
                color="primary"
                justifyContent="center"
                alignItems="center"
                sx={{
                  mr: 2
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
}
export default Access;