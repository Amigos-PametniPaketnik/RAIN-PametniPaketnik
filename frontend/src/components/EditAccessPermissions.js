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
import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {useToast} from '@chakra-ui/react'

function formatDate(date) {
    return date.slice(0, -5);
}

function EditAccessPermission() {
    const { id } = useParams();

    const [username, setUsername] = useState([]);
    const [accessableFrom, setAccessableFrom] = useState([]);
    const [accessableTo, setAccessableTo] = useState([]);
    const [idParcelLocker, setParcelLocker] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);

    const toast = useToast()

    useEffect(() => {
        const res = fetch("http://localhost:3001/access-permissions/get/" + id, {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
            .then(response => response.json())
            .then((data) => {
                setUsername(data.idUser.username);
                setAccessableFrom(formatDate(data.accessableFrom));
                setAccessableTo(formatDate(data.accessableTo));
            });

    }, []);

    async function UpdateAccessPermission(e) {
        e.preventDefault();
        setLoading(true);


        const res = await fetch("http://localhost:3001/access-permissions/" + id, {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                accessableFrom: accessableFrom,
                accessableTo: accessableTo,
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
                description: data.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }


    return (
        <Stack minH={'100vh'} minW={'lg'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Box borderWidth={'2px'} p={20} borderRadius={'lg'}>
                    <Stack spacing={4} w={'full'} maxW={'md'}>
                        <Heading fontSize={'2xl'}>Uredi uporabniku pravice za dostop</Heading>

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
                        <Button colorScheme={'teal'} variant={'solid'} onClick={e => UpdateAccessPermission(e)} isLoading={loading? true : loading}>
                            Uredi pravice
                        </Button>
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
export default EditAccessPermission;