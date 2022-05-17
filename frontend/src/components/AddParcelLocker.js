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
    Stack
} from "@chakra-ui/react";
import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";


function AddParcelLocker() {
    const [location, setLocation] = useState([]);
    const [numberParcelLocker, setNumberParcelLocker] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function AddParcelLocker(e){
        e.preventDefault();
        setLoading(true);
        const res = await fetch("http://localhost:3001/parcel-lockers", {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                location: location,
                numberParcelLocker: numberParcelLocker
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

    return (
        <Stack minH={'100vh'} minW={'lg'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Box borderWidth={'2px'} p={20} borderRadius={'lg'}>
                    <Stack spacing={4} w={'full'} maxW={'md'}>
                        <Heading fontSize={'2xl'}>Dodaj paketnik</Heading>
                        <form onSubmit={AddParcelLocker}>
                        <FormControl id="numberParcelLocker">
                            <FormLabel>Številka paketnika</FormLabel>
                            <Input value={numberParcelLocker} onChange={(e)=>(setNumberParcelLocker(e.target.value))} type="text" required="true" />
                        </FormControl>
                        <FormControl id="location">
                            <FormLabel>Lokacija</FormLabel>
                            <Input value={location} onChange={(e)=>(setLocation(e.target.value))} type="text" required="true" />
                        </FormControl>  
                        <Divider />
                        <Stack spacing={6}>
                            <Button colorScheme={'teal'} variant={'solid'} type={'submit'} isLoading={loading? true : loading}>
                                Dodaj
                            </Button>
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