import {useContext} from "react";
import {UserContext} from "../userContext";
import {useState} from "react";
import {useEffect} from "react";
import {Navigate} from "react-router-dom";
import AccessPermisson from './AccessPermisson';
import {Avatar, Box, Container, Divider, Heading, StackDivider, Text, VStack} from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
  import { Link, useNavigate } from "react-router-dom";
  import { Button, ButtonGroup } from '@chakra-ui/react';
  import { MdBuild , MdCall, MdAddTask } from "react-icons/md";
  import { useLocation } from 'react-router-dom'



function AccessPermissions(props) {
    const { id } = useParams();
    const userContext = useContext(UserContext);
    const [accessPermission, setAccessPermissions] = useState({});

    useEffect(function(){
        const getAccessPermissions = async function(){
            const res = await fetch("http://snf-58216.vm.okeanos-global.grnet.gr:3001/access-permissions/"+id, {credentials: "include"});
            const data = await res.json();
            setAccessPermissions(data);
        }
        getAccessPermissions();
    }, []);

 
 if(accessPermission.length > 0){
 
      
    return (
        <><>
            {!userContext.user ? <Navigate replace to="/login" /> : ""}
          
        </>
        
        <Box p={12}>
        <Link to={`/addAccessPermission/${id}`}><Button leftIcon={<MdAddTask />} colorScheme='blue'>Dodajte dostop</Button></Link>
        </Box>
       
        <TableContainer>
       
                <Table variant='simple' size="lg">
                    <TableCaption>Vsi uporabniki z dostopi</TableCaption>
                    <Thead>
                        <Tr >
                            <Th>Uporabnik</Th>
                            <Th>Dostopno od</Th>
                            <Th> Dostopno do </Th>
                            <Th> Uredi </Th>
                            <Th> Briši </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    
                    {accessPermission.map(accessPermission => (<AccessPermisson accessPermission={accessPermission} key={accessPermission._id} ></AccessPermisson>))}
                     
                    </Tbody>
                   
                </Table>
            </TableContainer></>
        
    )
}else{
    return (
        <>
        <Box p={12}>
              <Link to={`/addAccessPermission/${id}`}><Button leftIcon={<MdAddTask />} colorScheme='blue'>Nimate dodanih dostopov? Dodajte dostop </Button></Link>
           </Box>
</>
         )
}
}

export default AccessPermissions;