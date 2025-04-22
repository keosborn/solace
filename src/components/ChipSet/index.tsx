
import { useState } from "react";
import Chip from '@mui/material/Chip';
import Grid  from '@mui/material/Grid';
import { specialties } from "../../db/seed/advocates";
import CloseIcon from '@mui/icons-material/Close';


const ChipSet=({ onSpecialtyClick }) => {
    const [selectedSpecialty, setSelectedSpecialty] =useState<any>([]);
   
    const onClick = (event: { currentTarget: { id: any; }; }) =>{
        onSpecialtyClick(event)
        setSelectedSpecialty(event.currentTarget.id)
    }

    function modifySpecialties(specialties: any[]){
        const specialtiesModified = specialties
                .map(
                    (                    specialty: string)=>
                        specialty.substring(0,specialty.indexOf("(")>0 ? specialty.indexOf("(") : specialty.length)
                    )
                .filter((value: any, index: any, array: string | any[]) => array.indexOf(value) === index)
                .sort();

        return specialtiesModified
    }

    return (
        <Grid 
            container 
            direction="row" 
            size={10} 
            sx={{
            justifyContent: "center",
            alignItems: "center"}}
        >
            <>
            {specialties && 
                modifySpecialties(specialties).map((specialty: any,index: number)=>
                        {
                            return (
                                <Chip key={index} id={specialty} label={specialty} sx={{margin: "2px"}} color={selectedSpecialty === specialty ? "secondary" : "primary"} onClick={onClick} />
                            )
                        }
                    )

            }
             <Chip key={specialties.length+1} id={''} label={<CloseIcon />} sx={{margin: "2px"}} color="primary" onClick={onClick} />
            </>
        </Grid>

    )
}   

export default ChipSet