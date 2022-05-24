import {
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Image,
    Input,
    Link,
    Stack,
    Textarea,
    Wrap,
    WrapItem
} from "@chakra-ui/react";
import {useState, useEffect} from "react";
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import {useToast} from '@chakra-ui/react'
import {useParams} from "react-router-dom";


function MarkerParcelLocker(props) {
    const map = useMapEvents({
        click(e) {
            props.onClick([e.latlng.lat, e.latlng.lng]);
        },
    });

    map.setView(props.location, map.getZoom(), {
        animate: true
    })
    console.log('map center:', map.getCenter())
    return (
        <Marker position={props.location}
                icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
            <Popup>Tukaj si</Popup>
        </Marker>
    )
}

function EditParcelLocker() {
    const {id} = useParams();

    const [location, setLocation] = useState([46.4246, 15.6850]);
    const [numberParcelLocker, setNumberParcelLocker] = useState([]);
    const [nameParcelLocker, setNameParcelLocker] = useState(null);
    const [description, setDescription] = useState(null);
    const [city, setCity] = useState(null);
    const [address, setAddress] = useState(null);
    const [postal, setPostal] = useState(null);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);

    const toast = useToast()

    useEffect(() => {
        const res = fetch("http://localhost:3001/parcel-lockers/" + id, {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
            .then(response => response.json())
            .then((data) => {
                setLocation(data.location);
                setNumberParcelLocker(data.numberParcelLocker);
                setNameParcelLocker(data.name);
                setDescription(data.description);
                setCity(data.city);
                setAddress(data.address);
                setPostal(data.postal);
            });

    }, []);

    async function UpdateParcelLocker(e) {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("http://localhost:3001/parcel-lockers/" + id, {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                numberParcelLocker: numberParcelLocker,
                nameParcelLocker: nameParcelLocker,
                description: description,
                city: city,
                address: address,
                postal: postal,
                location: location
            })
        });
        const data = await res.json();
        if (data._id !== undefined) {
            setLoading(false);
            toast({
                title: 'Podatki shranjeni.',
                description: "Podatki so uspešno shranjeni.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        } else {
            setLoading(false);
            toast({
                title: 'Napaka',
                description: "Napaka pri shranjevanju",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    return (
        <Stack minH={'100vh'} minW={'lg'} direction={{base: 'column', md: 'row'}}>
            <Flex p={8} flex={1} w={'full'} h={'min-content'}>
                <Box borderWidth={'2px'} p={20} borderRadius={'lg'} w={'full'}>
                    <Stack spacing={4} w={'full'}>
                        <Heading fontSize={'2xl'}>Paketnik</Heading>

                        <FormControl id="numberParcelLocker">
                            <FormLabel>Številka paketnika:</FormLabel>
                            <Input value={numberParcelLocker} w={'xs'}
                                   onChange={(e) => (setNumberParcelLocker(e.target.value))} type="text"
                                   required="true"/>
                        </FormControl>
                        <FormControl id="nameParcelLocker" mt={4}>
                            <FormLabel>Ime (vzdevek) paketnika:</FormLabel>
                            <Input value={nameParcelLocker} w={'xs'}
                                   onChange={(e) => (setNameParcelLocker(e.target.value))} type="text"
                                   required="true"/>
                        </FormControl>
                        <FormControl id="direction" mt={4}>
                            <FormLabel>Opis poti do paketnika: <i>(neobvezno)</i></FormLabel>
                            <Textarea value={description} onChange={(e) => (setDescription(e.target.value))}
                                      type="text" required="false"/>
                        </FormControl>

                        <Wrap mt={4}>
                            <WrapItem>
                                <Wrap>
                                    <WrapItem>
                                        <FormControl id="city">
                                            <FormLabel>Kraj:</FormLabel>
                                            <Input value={city} onChange={(e) => (setCity(e.target.value))}
                                                   type="text" required="true"/>
                                        </FormControl>
                                    </WrapItem>
                                    <WrapItem>
                                        <FormControl id="postal">
                                            <FormLabel>Poštna številka:</FormLabel>
                                            <Input value={postal} onChange={(e) => (setPostal(e.target.value))}
                                                   type="number" required="true"/>
                                        </FormControl>
                                    </WrapItem>
                                </Wrap>
                                <FormControl id="address">
                                    <FormLabel>Naslov:</FormLabel>
                                    <Input value={address} onChange={(e) => (setAddress(e.target.value))}
                                           type="text" required="true"/>
                                </FormControl>
                            </WrapItem>
                        </Wrap>
                        <Flex h={'sm'} w={'full'} mt={5}>
                            <MapContainer center={location} zoom={13} scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <MarkerParcelLocker location={location} onClick={e => setLocation(e)}/>
                            </MapContainer>
                        </Flex>

                        <Divider/>

                        <Flex width="100%" justify="flex-end" mt={3}>
                            <Button size="md" colorScheme={'teal'} onClick={e => UpdateParcelLocker(e)}
                                    isLoading={loading ? true : loading}
                                    loadingText='Loading' type={"submit"}>
                                {"Uredi"}
                            </Button>
                        </Flex>
                    </Stack>
                </Box>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    src={
                        'https://www.printink.si/content/images/thumbs/0043614_pametni-paketnik-direct4me.jpeg'
                    }
                />
            </Flex>
        </Stack>
    );
}

export default EditParcelLocker;