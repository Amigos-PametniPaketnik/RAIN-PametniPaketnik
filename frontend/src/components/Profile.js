import {Avatar, Box, Container, Divider, Heading, StackDivider, Text, VStack} from "@chakra-ui/react";
import {useContext} from "react";
import {UserContext} from "../userContext";
import {useState} from "react";
import {useEffect} from "react";
import {Navigate} from "react-router-dom";

function Profile(props) {
    const userContext = useContext(UserContext);
    const [profile, setProfile] = useState({});

    useEffect(function(){
        const getProfile = async function(){
            const res = await fetch("http://snf-58216.vm.okeanos-global.grnet.gr:3001/users/profile", {credentials: "include"});
            const data = await res.json();
            setProfile(data);
        }
        getProfile();
    }, []);
    return (
        <>
        {!userContext.user ? <Navigate replace to="/login" /> : ""}
        <Container>
            <Box p={12}>
            <Heading mb={6}>Moj profil</Heading>
            <VStack
                divider={<StackDivider borderColor='gray.200' />}
                spacing={4}
                align='stretch'>
            <Box>
            <Avatar name={profile.name+' '+profile.lastname} size='xl' src='https://bit.ly/dan-abramov' />
            </Box>
            <Box>
                <Text fontSize={'2xl'} mb={3}><b>Moji podatki</b></Text>
                <Text fontSize={'xl'} mb={1}><b>Uporabniško ime:</b> {profile.username}</Text>
                <Text fontSize={'xl'} mb={1}><b>E-pošta:</b> {profile.email}</Text>
                <Text fontSize={'xl'} mb={1}><b>Ime:</b> {profile.name}</Text>
                <Text fontSize={'xl'} mb={1}><b>Priimek:</b> {profile.lastname}</Text>
            </Box>
            <Box>

            </Box>
            </VStack>
            </Box>
        </Container>
        </>
    )
}

export default Profile;