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
import { useParams } from "react-router-dom";


function AddAccessPermission() {
    const [username, setUsername] = useState([]);
    const [accessableFrom, setAccessableFrom] = useState([]);
    const [accessableTo, setAccessableTo] = useState([]);
    const { id } = useParams();
    const [idParcelLocker, setParcelLocker] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
   
  
    async function AddAccessPermission(e){
        
        e.preventDefault();
        setLoading(true);
        const res = await fetch("http://localhost:3001/access-permissions/:id", {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                idParcelLocker: id,
                accessableTo: accessableTo,
                accessableFrom: accessableFrom
            })
        });
        const data = await res.json();
        if(data._id !== undefined){
            setLoading(false);
            navigate("/", {replace: true});
        }
        else{
            setLoading(false);
            setUsername("");
            setAccessableFrom("");
            setAccessableTo("");
            setParcelLocker("");
            setError("Unsuccessfull addition of parcel locker");
        }
    }

    return (
        <Stack minH={'100vh'} minW={'lg'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Box borderWidth={'2px'} p={20} borderRadius={'lg'}>
                    <Stack spacing={4} w={'full'} maxW={'md'}>
                        <Heading fontSize={'2xl'}>Dodajte uporabniku pravice za dostop</Heading>
                        <form onSubmit={AddAccessPermission}>
                        <FormControl id="username">
                            <FormLabel>Uporabniški račun</FormLabel>
                            <Input value={username} onChange={(e)=>(setUsername(e.target.value))} type="text" required="true" />
                        </FormControl>
                        <FormControl id="accessableFrom">
                            <FormLabel>Od datuma:</FormLabel>
                            <Input value={accessableFrom} onChange={(e)=>(setAccessableFrom(e.target.value))} type="datetime-local" required="true" />
                        </FormControl> 
                        <FormControl id="accessableTo">
                            <FormLabel>Do datuma:</FormLabel>
                            <Input value={accessableTo} onChange={(e)=>(setAccessableTo(e.target.value))} type="datetime-local" required="true" />
                        </FormControl> 
                        <Divider />
                        <Stack spacing={6}>
                            <Button colorScheme={'teal'} variant={'solid'} type={'submit'} isLoading={loading? true : loading}>
                                Podaj pravice
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
                            <NavLink to={"/"}><Link color={'gray.500'} textAlign={'center'}>Ne želiš dodati dostopa? Pojdi nazaj</Link></NavLink>
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
                        
                        'https://www.printink.si/content/images/thumbs/0043615_pametni-paketnik-direct4me.jpeg'
                    }
                />
            </Flex>
        </Stack>
    );
}
export default AddAccessPermission;