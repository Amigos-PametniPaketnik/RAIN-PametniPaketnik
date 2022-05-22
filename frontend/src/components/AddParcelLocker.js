import {
    Alert, AlertIcon,
    Box,
    Button,
    Checkbox, Divider,
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
import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import {Steps, Step, useSteps } from "chakra-ui-steps";
import LocationMarker from "./LocationMarker";


function AddParcelLocker() {
    const [location, setLocation] = useState([]);
    const [numberParcelLocker, setNumberParcelLocker] = useState([]);
    const [nameParcelLocker, setNameParcelLocker] = useState(null);
    const [description, setDescription] = useState(null);
    const [city, setCity] = useState(null);
    const [address, setAddress] = useState(null);
    const [postal, setPostal] = useState(null);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const steps = [{ label: "1. korak" }, { label: "2. korak" }, { label: "3. korak" }]
    const { nextStep, prevStep, reset, activeStep } = useSteps({
        initialStep: 0,
    })
    const position = [51.505, -0.09];

    async function AddParcelLocker(e){
        e.preventDefault();
        setLoading(true);
        const res = await fetch("http://localhost:3001/parcel-lockers", {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
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
        if(data._id !== undefined){
            setLoading(false);
            navigate("/", {replace: true});
        }
        else{
            setLoading(false);
            setLocation("");
            setNumberParcelLocker("");
            setError("Unsuccessfull addition of parcel locker");
        }
    }

    function setNewLocation(newlocation) {
        setLocation(newlocation);
    }

    return (
        <Stack minH={'100vh'} minW={'lg'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} w={'full'} h={'min-content'}>
                <Box borderWidth={'2px'} p={20} borderRadius={'lg'} w={'full'}>
                    <Stack spacing={4} w={'full'}>
                        <Heading fontSize={'2xl'}>Dodaj paketnik</Heading>
                        <form onSubmit={AddParcelLocker}>
                            <Steps activeStep={activeStep}>
                                <Step label={'1. korak'} key={'1. korak'}>
                                    <FormControl id="numberParcelLocker" p={5}>
                                        <FormLabel>Številka paketnika:</FormLabel>
                                        <Input value={numberParcelLocker} w={'xs'} onChange={(e) => (setNumberParcelLocker(e.target.value))} type="text" required="true" />
                                    </FormControl>
                                    <FormControl id="nameParcelLocker">
                                        <FormLabel>Ime (vzdevek) paketnika:</FormLabel>
                                        <Input value={nameParcelLocker} w={'xs'} onChange={(e) => (setNameParcelLocker(e.target.value))} type="text" required="true" />
                                    </FormControl>
                                </Step>
                                <Step label={'2. korak'} key={'2. korak'}>
                                    <FormControl id="direction" p={5}>
                                        <FormLabel>Opis poti do paketnika: <i>(neobvezno)</i></FormLabel>
                                        <Textarea value={description} onChange={(e) => (setDescription(e.target.value))} type="text" required="false" />
                                    </FormControl>
                                </Step>
                                <Step label={'3. korak'} key={'3. korak'}>
                                            <Wrap p={5}>
                                                <WrapItem>
                                                    <Wrap>
                                                        <WrapItem>
                                                    <FormControl id="city">
                                                        <FormLabel>Kraj:</FormLabel>
                                                        <Input value={city} onChange={(e) => (setCity(e.target.value))} type="text" required="true" />
                                                    </FormControl>
                                                    </WrapItem>
                                                    <WrapItem>
                                                        <FormControl id="postal">
                                                            <FormLabel>Poštna številka:</FormLabel>
                                                            <Input value={postal} onChange={(e) => (setPostal(e.target.value))} type="number" required="true" />
                                                        </FormControl>
                                                    </WrapItem>
                                                    </Wrap>
                                                    <FormControl id="address">
                                                        <FormLabel>Naslov:</FormLabel>
                                                        <Input value={address} onChange={(e) => (setAddress(e.target.value))} type="text" required="true" />
                                                    </FormControl>
                                                </WrapItem>
                                            </Wrap>
                                            <Flex h={'sm'} w={'full'} mb={5}>
                                            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                                                    <TileLayer
                                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                    />
                                                    <LocationMarker setlocation={setNewLocation} />
                                                </MapContainer>
                                            </Flex>
                                </Step>
                            </Steps>
                            {activeStep === steps.length && loading == false ? (
                                <Flex px={4} py={4} width="100%" flexDirection="column">
                                    <Heading fontSize="xl" textAlign="center">
                                        Uspešno si dodal paketnik v tvoj račun!
                                    </Heading>
                                    <Button mx="auto" mt={6} size="sm" onClick={reset}>
                                        Reset
                                    </Button>
                                </Flex>
                            ) : (
                                <Flex width="100%" justify="flex-end" mb={5}>
                                    <Button
                                        isDisabled={activeStep === 0}
                                        mr={4}
                                        onClick={prevStep}
                                        size="sm"
                                        variant="solid"
                                    >
                                        Nazaj
                                    </Button>
                                    <Button size="sm" colorScheme={'teal'} onClick={nextStep} isLoading={loading? true : loading} type={activeStep === steps.length -1 ? "submit" : ""}>
                                        {activeStep === steps.length - 1 ? "Dodaj nov paketnik" : "Naprej"}
                                    </Button>
                                </Flex>
                            )}
                        <Divider />
                        <Stack spacing={6}>
                            <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}></Stack>
                            {error => (
                                error ?
                                    <></>
                                    :
                                    <>
                                        <Alert status="error">
                                            <AlertIcon />
                                            {error}
                                        </Alert>
                                    </>
                            )}
                            <NavLink to={"/login"}><Link color={'gray.500'} textAlign={'center'}>Ne želiš dodati paketnika? Pojdi nazaj</Link></NavLink>
                        </Stack>
                        </form>
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
export default AddParcelLocker;