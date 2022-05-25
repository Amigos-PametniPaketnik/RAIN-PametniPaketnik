import {useContext} from "react";
import {UserContext} from "../userContext";
import {useState} from "react";
import {useEffect} from "react";
import {Navigate} from "react-router-dom";
import ParcelLocker from './ParcelLocker';
import {Avatar, Box, Container, Divider, Flex, Stack, Heading, StackDivider, Text, VStack, position} from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react';
  import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
  import markerIconPng from "leaflet/dist/images/marker-icon.png"
  import {Icon} from 'leaflet'

function ParcelLockers() {
    const userContext = useContext(UserContext);
    const [parcelLocker, setParcelLockers] = useState({});
    const [coordinates, setCoordinates] = useState([51.505, -0.09]);

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

        </>
        <Stack minH={'100vh'} minW={'lg'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} w={'full'} h={'full'}>
        <TableContainer>
                <Table variant='simple' size="md">
                    <TableCaption>Vsi paketniki</TableCaption>
                    <Thead>
                        <Tr >
                            <Th>Paketnik</Th>
                            <Th> Pravice dostopa </Th>
                            <Th> Odklepi </Th>
                            <Th> Uredi </Th>
                            <Th> Briši </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    
                    {parcelLocker.map(parcelLocker => (<ParcelLocker parcelLocker={parcelLocker} key={parcelLocker._id} ></ParcelLocker>))}
                     
                    </Tbody>

                </Table>
            </TableContainer>
            </Flex>
                <Flex flex={1}>
                    <Flex w={'full'} h={'96.5%'}>
                    <MapContainer center={parcelLocker[0].location} zoom={50} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            parcelLocker.map(parcelLocker => (
                                <Marker position={parcelLocker?.location} key={parcelLocker._id} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                            <Popup>
                                Paketnik {parcelLocker.name} se nahaja tukaj!
                            </Popup>
                        </Marker>
                            ))
                        }
                    </MapContainer>
                    </Flex>
                </Flex>
            </Stack>
            </>
        
    )
}else{
    return (
        <>
        {!userContext.user ? <Navigate replace to="/login" /> : ""}
        <Box p={12}>
            <Heading mb={6}>Nimate paketnikov!</Heading>
           </Box>
</>
         )
}
}

export default ParcelLockers;