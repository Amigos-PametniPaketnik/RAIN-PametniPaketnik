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


function Register() {
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const [email, setEmail] = useState([]);
    const [name, setName] = useState([]);
    const [lastname, setLastName] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function Register(e){
        e.preventDefault();
        setLoading(true);
        const res = await fetch("http://localhost:3001/users", {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password,
                name: name,
                lastname: lastname
            })
        });
        const data = await res.json();
        if(data._id !== undefined){
            setLoading(false);
            navigate("/login", {replace: true});
        }
        else{
            setLoading(false);
            setUsername("");
            setPassword("");
            setEmail("");
            setName("");
            setLastName("");
            setError("Registracija je spodletela!");
        }
    }

    return (
        <Stack minH={'100vh'} minW={'lg'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Box borderWidth={'2px'} p={20} borderRadius={'lg'}>
                    <Stack spacing={4} w={'full'} maxW={'md'}>
                        <Heading fontSize={'2xl'}>Registriraj se</Heading>
                        <form onSubmit={Register}>
                        <FormControl id="username">
                            <FormLabel>Uporabniško ime</FormLabel>
                            <Input value={username} onChange={(e)=>(setUsername(e.target.value))} type="text" required="true" />
                        </FormControl>
                        <FormControl id="email">
                            <FormLabel>E-pošta</FormLabel>
                            <Input value={email} onChange={(e)=>(setEmail(e.target.value))} type="email" required="true" />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Geslo</FormLabel>
                            <Input value={password} onChange={(e)=>(setPassword(e.target.value))} type="password" required="true" />
                        </FormControl>
                        <FormControl id="repeatpassword">
                            <FormLabel>Ponovi geslo</FormLabel>
                            <Input type="password" />
                        </FormControl>
                        <Divider />
                        <FormControl id="name">
                            <FormLabel>Ime</FormLabel>
                            <Input value={name} onChange={(e)=>(setName(e.target.value))} type="text" required="true" />
                        </FormControl>
                        <FormControl id="lastname">
                            <FormLabel>Priimek</FormLabel>
                            <Input value={lastname} onChange={(e)=>(setLastName(e.target.value))} type="text" required="true" />
                        </FormControl>
                        <Stack spacing={6}>
                            <Button colorScheme={'teal'} variant={'solid'} type={'submit'} isLoading={loading? true : loading}>
                                Registracija
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
                            <NavLink to={"/login"}><Link color={'gray.500'} textAlign={'center'}>Imaš že svoj uporabniški račun? Prijavi se tukaj</Link></NavLink>
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
export default Register;