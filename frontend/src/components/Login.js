import {
    Button,
    Box,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Image, Alert, AlertIcon,
} from '@chakra-ui/react';
import {NavLink, useNavigate} from "react-router-dom";
import {UserContext} from "../userContext";
import {useContext, useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    async function Login(e){
        e.preventDefault();
        setLoading(true);
        setError(null);
        const res = await fetch("http://localhost:3001/users/login", {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const data = await res.json();
        if(data._id !== undefined){
            setLoading(false);
            userContext.setUserContext(data);
            setError(null);
            navigate("/", {replace: true});
        } else {
            setLoading(false);
            setUsername("");
            setPassword("");
            setError(data.message);
        }
    }

    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            {userContext.user ? <Navigate replace to="/" /> : ""}
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Box borderWidth={'2px'} p={20} borderRadius={'lg'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'}>Prijavi se v svoj račun</Heading>
                    <form onSubmit={Login}>
                    <FormControl id="email">
                        <FormLabel>E-pošta ali uporabniško ime</FormLabel>
                        <Input value={username} onChange={(e)=>(setUsername((e.target.value)))} type="text" />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Geslo</FormLabel>
                        <Input value={password} type="password" onChange={(e)=>(setPassword((e.target.value)))} />
                    </FormControl>
                    <Stack spacing={6}>
                        <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            align={'start'}
                            justify={'space-between'}>
                            <Checkbox>Zapomni si me</Checkbox>
                            <Link color={'gray.500'}>Pozabljeno geslo?</Link>
                        </Stack>
                        <Button colorScheme={'teal'} variant={'solid'} type={'submit'} isLoading={loading? true : loading}>
                            Prijava
                        </Button>
                        <Alert status={'error'} hidden={error? false : true}>
                            <AlertIcon />
                            {error}
                        </Alert>
                        <NavLink to={"/register"}><Link color={'gray.500'} textAlign={'center'}>Še nimaš svojega računa? Registriraj se tukaj</Link></NavLink>
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
export default Login;