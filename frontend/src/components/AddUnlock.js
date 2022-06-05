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
import {useContext} from "react";
import {UserContext} from "../userContext";
import { useParams } from "react-router-dom";


function AddUnlock() {
    const { id } = useParams();
    const userContext = useContext(UserContext);
    const [unlockDateTime, setUnlockDateTime] = useState(null);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
   
  
    async function AddUnlock(e){
        
        e.preventDefault();
        setLoading(true);
        const res = await fetch("http://snf-58216.vm.okeanos-global.grnet.gr:3001/unlocks", {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                idParcelLocker: id,
                userId: userContext.user._id,
                datetime: unlockDateTime
            })
        });
        const data = await res.json();
        if(data._id !== undefined){
            setLoading(false);
            navigate("/", {replace: true});
        }
        else{
            setLoading(false);
            setUnlockDateTime("");
            setError("Unsuccessfull addition of unlock of parcel locker");
        }
    }

    return (
        <Stack minH={'100vh'} minW={'lg'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Box borderWidth={'2px'} p={20} borderRadius={'lg'}>
                    <Stack spacing={4} w={'full'} maxW={'md'}>
                        <Heading fontSize={'2xl'}>Dodajte nezabeležen odklep paketnika</Heading>
                        <form onSubmit={AddUnlock}>
                        <FormControl id="unlockDatetime">
                            <FormLabel>Datum odklepa:</FormLabel>
                            <Input value={unlockDateTime} onChange={(e)=>(setUnlockDateTime(e.target.value))} type="datetime-local" required="true" />
                        </FormControl> 
                        <Divider />
                        <Stack spacing={6}>
                            <Button colorScheme={'teal'} variant={'solid'} type={'submit'} mt={4} isLoading={loading? true : loading}>
                                Dodaj odklep
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
                            <NavLink to={"/"}><Link color={'gray.500'} textAlign={'center'}>Ne želiš dodati nezabeleženega odklepa? Pojdi nazaj</Link></NavLink>
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
export default AddUnlock;