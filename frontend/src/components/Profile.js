import {Avatar, Box, Button, Container, Divider, FormControl, FormLabel, Heading, Input, StackDivider, Text, VStack, Wrap, WrapItem} from "@chakra-ui/react";
import {useContext} from "react";
import {UserContext} from "../userContext";
import {useState} from "react";
import {useEffect} from "react";
import {Navigate} from "react-router-dom";

function Profile(props) {
    const userContext = useContext(UserContext);
    const [profile, setProfile] = useState({});
    const [editProfile, setEditProfile] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(function(){
        const getProfile = async function(){
            const res = await fetch("http://localhost:3001/users/profile", {credentials: "include"});
            const data = await res.json();
            setProfile(data);
            setEmail(data.email);
            setName(data.name);
            setLastName(data.lastname);
        }
        getProfile();
    }, []);

    function editModeProfile() {
        setEditProfile(!editProfile);
    }

    async function updateProfile(e) {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("http://localhost:3001/users/" + userContext.user._id, {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                name: name,
                lastname: lastname
            })
        });
        const data = await res.json();
        if (data._id !== undefined) {
            setProfile(data);
            setEmail(data.email);
            setName(data.name);
            setLastName(data.lastname);
            editModeProfile();
            setLoading(false);
        }
        else {
            setError("Spremembe niso bile uspešno shranjene!");
        }
    }

    return (
        <>
        {!userContext.user ? <Navigate replace to="/login" /> : ""}
        <Container>
            <Box p={12}>
            <Wrap>
                <WrapItem>
                    <Heading mb={6}>Moj profil</Heading>
                </WrapItem>
                <WrapItem>
                    <Button ml={5} onClick={editModeProfile} disabled={editProfile}>Uredi</Button>
                </WrapItem>
            </Wrap>
            <VStack
                divider={<StackDivider borderColor='gray.200' />}
                spacing={4}
                align='stretch'>
            <Box>
            <Avatar name={profile.name+' '+profile.lastname} size='xl' src='' />
            </Box>
            <Box>
                {editProfile? 
                <>
                <form onSubmit={updateProfile}>
                    <FormControl id="email">
                        <FormLabel>E-pošta:</FormLabel>
                        <Input type={"email"} value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                    </FormControl>
                    <FormControl id="name">
                        <FormLabel>Ime:</FormLabel>
                        <Input type={"text"} value={name} onChange={(e)=>{setName(e.target.value)}} />
                    </FormControl>
                    <FormControl id="lastname">
                        <FormLabel>Priimek:</FormLabel>
                        <Input type={"text"} value={lastname} onChange={(e)=>{setLastName(e.target.value)}} />
                    </FormControl>
                    <Button type="submit" mt={3} colorScheme={'teal'} isLoading={loading? true : loading}>Shrani spremembe</Button>
                </form>
                </>
                :
                <>
                <Text fontSize={'2xl'} mb={3}><b>Moji podatki</b></Text>
                <Text fontSize={'xl'} mb={1}><b>Uporabniško ime:</b> {profile.username}</Text>
                <Text fontSize={'xl'} mb={1}><b>E-pošta:</b> {profile.email}</Text>
                <Text fontSize={'xl'} mb={1}><b>Ime:</b> {profile.name}</Text>
                <Text fontSize={'xl'} mb={1}><b>Priimek:</b> {profile.lastname}</Text>
                </>
                }
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