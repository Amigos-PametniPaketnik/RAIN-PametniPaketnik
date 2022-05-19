import {useContext} from "react";
import {UserContext} from "../userContext";
import {useState} from "react";
import {useEffect} from "react";
import {Navigate} from "react-router-dom";
import ParcelLocker from './ParcelLocker';
import {Avatar, Box, Container, Divider, Heading, StackDivider, Text, VStack} from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'

function ParcelLockers() {
    const userContext = useContext(UserContext);
    const [parcelLocker, setParcelLockers] = useState({});

    useEffect(function(){
        const getParcelLockers = async function(){
            const res = await fetch("http://localhost:3001/parcel-lockers", {credentials: "include"});
            const data = await res.json();
            setParcelLockers(data);
        }
        getParcelLockers();
    }, []);

 if(parcelLocker.length > 0){
    return (
        <><>
            {!userContext.user ? <Navigate replace to="/login" /> : ""}

        </><TableContainer>
                <Table variant='simple' size="lg">
                    <TableCaption>Vsi paketniki</TableCaption>
                    <Thead>
                        <Tr >
                            <Th>Številka paketnika</Th>
                            <Th>Lokacija</Th>
                            <Th> Pravice dostopa </Th>
                            <Th> Dostopi </Th>
                            <Th> Briši </Th>
                            <Th> Uredi </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    
                    {parcelLocker.map(parcelLocker => (<ParcelLocker parcelLocker={parcelLocker} key={parcelLocker._id} ></ParcelLocker>))}
                     
                    </Tbody>

                </Table>
            </TableContainer></>
        
    )
}else{
    return (
        <>
        <Box p={12}>
            <Heading mb={6}>Nimate paketnikov!</Heading>
           </Box>
</>
         )
}
}

export default ParcelLockers;