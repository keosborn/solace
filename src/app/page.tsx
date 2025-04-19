"use client";

import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow  } from '@mui/material';

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    console.log("filtering advocates...");
    const filteredAdvocatesNew = advocates.filter((advocate) => {
      return (
        advocate?.firstName?.toLowerCase().includes(searchTerm) ||
        advocate?.lastName?.toLowerCase().includes(searchTerm) ||
        advocate?.city?.toLowerCase().includes(searchTerm) ||
        advocate?.degree?.toLowerCase().includes(searchTerm)  ||
        advocate?.specialties?.filter(specialty=>specialty.toLowerCase().includes(searchTerm)).lengTableCell > 0 ||
        advocate?.yearsOfExperience.toString()===(searchTerm) ||
        advocate?.phoneNumber.toString()===(searchTerm)
      );
    });
    
    setFilteredAdvocates(filteredAdvocatesNew);
  };

  const onClick = () => {
    document.getElementById("search-input").value = "";
    setFilteredAdvocates(advocates);
  };

  const paginationModel = { page: 0, pageSize: 25 };

  const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'city',
      headerName: 'City',
      width: 90,
    },    
    {
      field: 'degree',
      headerName: 'Degree',
      width: 90,
    },    
    {
      field: 'specialties',
      headerName: 'Specialties',
      width: 90,
      sortable: false
    },
    {
      field: 'yearsOfExperience',
      headerName: 'Years of Experience',
      type: 'number',
      width: 160,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      type: 'number',
      width: 140,
    }
  ];


  return (
  <>
    <Container maxWidTableCell="sm">
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input id="search-input" style={{ border: "1px solid black" }} onChange={onChange} />

        <Button variant="contained" onClick={onClick}>Reset Search</Button>;
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />


      {/* <Paper sx={{ height: 400, width: '100%' }}> */}
      <DataGrid
          rows={filteredAdvocates}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          //checkboxSelection
          sx={{ border: 0 }}
        />
      {/* </Paper> */}


      <Table>
        <TableHead >
          <TableRow >
          <TableCell>First Name</TableCell>
          <TableCell>Last Name</TableCell>
          <TableCell>City</TableCell>
          <TableCell>Degree</TableCell>
          <TableCell>Specialties</TableCell>
          <TableCell>Years of Experience</TableCell>
          <TableCell>Phone Number</TableCell>
          </TableRow >
        </TableHead >
        <TableBody >
          {filteredAdvocates.map((advocate, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{advocate.firstName}</TableCell>
                <TableCell>{advocate.lastName}</TableCell>
                <TableCell>{advocate.city}</TableCell>
                <TableCell>{advocate.degree}</TableCell>
                <TableCell> 
                  {advocate.specialties.map((s, i) => (
                    <div key={i + s}>{s}</div>
                  ))}
                </TableCell>
                <TableCell>{advocate.yearsOfExperience}</TableCell>
                <TableCell>{advocate.phoneNumber}</TableCell>
              </TableRow>
            );
          })}
        </TableBody >
      </Table>
    </main>
    </Container>

    </>
  );
}
