import {useContext} from "react";
import {UserContext} from "../userContext";
import {useState} from "react";
import {useEffect} from "react";
import {Navigate} from "react-router-dom";
import AccessPermisson from './AccessPermisson';
import {Avatar, Box, Center, Container, Divider, Flex, Heading, Image, Stack, StackDivider, StackItem, Text, VStack} from "@chakra-ui/react";

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
import Unlock from "./Unlock";



function Unlocks(props) {
    const { id } = useParams();
    const userContext = useContext(UserContext);
    const [unlocks, setUnlocks] = useState({});

    useEffect(function(){
        const getUnlocks = async function(){
            const res = await fetch("http://localhost:3001/unlocks/getByParcelLocker/"+id, {credentials: "include"});
            const data = await res.json();
            console.log(unlocks);
            setUnlocks(data);
        }
        getUnlocks();
    }, []);

 
 if(unlocks.length > 0){
 
      
    return (
        <><>
            {!userContext.user ? <Navigate replace to="/login" /> : ""}
        </>
        
        <Box p={12}>
        <Link to={`/addUnlock/${id}`}><Button leftIcon={<MdAddTask />} colorScheme='teal'>Dodajte nezabeležen odklep</Button></Link>
        </Box>
       
        <TableContainer>
                <Table variant='simple' size="lg">
                    <TableCaption>Odklepi paketnika</TableCaption>
                    <Thead>
                        <Tr >
                            <Th>Uporabnik</Th>
                            <Th>Datum in čas odklepa</Th>
                            <Th>Uspešnost odklepa</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    {unlocks.map(unlock => (<Unlock unlock={unlock} key={unlock._id} ></Unlock>))}
                    </Tbody>
                </Table>
            </TableContainer></>
    )
}else{
    return (
        <>
        <Stack h={"full"} minH={"100vh"} textAlign={"center"} justifyContent={"center"}>
            <StackItem>
                <Heading size={"md"}>
                    Trenutno še ni bil zabeležen noben odklep
                    </Heading>
            </StackItem>
            <StackItem>
                <Link to={`/addUnlock/${id}`}><Button colorScheme={"teal"}>Dodaj nezabeležen odklep</Button></Link>
            </StackItem>
        </Stack>
</>
         )
}
}

export default Unlocks;