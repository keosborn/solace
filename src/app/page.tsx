"use client";

import { useCallback, useEffect, useState } from "react";
import { DataGrid, GridColDef, GridFilterModel} from '@mui/x-data-grid';
import {Box, Card, Container, Paper, Typography  } from '@mui/material';
import CustomToolbar from "../components/CustomToolbar";
import ChipSet from "../components/ChipSet";
import Alert from '@mui/material/Alert';
import ErrorIcon from '@mui/icons-material/Error';

export default function Home() {
  function useFetchData(url: string) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const response = await fetch(url);
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const json = (await response.json());

          setData(json.data);

        } catch (e: any) {
          setError(e.message);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [url]);

    return { data, isLoading, error };
  }
 
  const [filteredData, setFilteredData] = useState([])
  
  const { data, isLoading, error } = useFetchData(`/api/advocates`);

  useEffect(() => {
    setFilteredData(data)
  }, [isLoading]);

  const onSpecialtyClick = useCallback((event:any) => {
    const selectedSpecialty = event.currentTarget.id
    const results = selectedSpecialty ? 
    data
      .filter(itm=>itm.specialties
      .includes(selectedSpecialty))
      : data
    setFilteredData(results)

}, [setFilteredData, data]);

  const paginationModel = { page: 0, pageSize: 100 };

  const columns: GridColDef[] = [
    { field: 'firstName', 
      headerName: 'First name', 
      width: 120
    },
    { field: 'lastName', 
      headerName: 'Last name', 
      width: 120 
    },
    {
      field: 'city',
      headerName: 'City',
      width: 130,
    },    
    {
      field: 'degree',
      headerName: 'Degree',
      width: 60,
    },   
    {
      field: 'yearsOfExperience',
      headerName: 'Years of Experience',
      type: 'number',
      width: 60,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      type: 'number',
      width: 110,
    },
    {
      field: 'specialties',
      headerName: 'Specialties',
      sortable: false,
      minWidth: 200,
      flex: 3,
    }
  ];

  return (
    <Container sx={{backgroundColor: "#3f937c0d", padding: "20px" }}>
      <Paper>
        <Box sx={{marginTop: '20px', padding: 2}}>
          <Card variant="outlined" sx={{margin: 2, padding: 2}}>
            <>
              <Typography sx={{fontFamily: 'freight-big-pro'}} variant = 'h3'>Solace Advocates</Typography>
              <Typography sx={{color:"grey"}} variant = "body1" >Use this tool to search advocates by name, city, degree, specialty and more.</Typography>
            </>
          </Card>
        </Box>
  
        {error && 
        <Alert style={{marginBottom: '40px'}} icon={<ErrorIcon fontSize="inherit" />} severity="error">
          Error: {error}
        </Alert>}

        {!isLoading && 
        <>
        <ChipSet onSpecialtyClick={onSpecialtyClick}/>
        
        <DataGrid
            getEstimatedRowHeight={() => 100}
            getRowHeight={() => 'auto'} 
            rows = {adaptData(filteredData)}
            loading={isLoading}
            columns={columns}
            sx={{ border: 0, width: "100%", padding: 2 }}
            initialState={{
              pagination: { paginationModel },
              filter: {
                filterModel: {
                  items: [],
                },
              },
            }}
            slots={{ toolbar: CustomToolbar }}
            showToolbar
          />
          </>}
        
      </Paper>
    </Container>
  );
}

const formatPhone = (phone: string) => {
  const number = `${phone.substring(0,3)}-${phone.substring(4,6)}-${phone.substring(7,11)}`
  return number
};

function adaptData(advocates: any[]){
  const adaptedData = advocates.map(itm=>({...itm, specialties: itm.specialties.sort(), phoneNumber: formatPhone(itm.phoneNumber.toString())}))
  return adaptedData
};