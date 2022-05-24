import {
    Tr,
    Td,
    Wrap,
    WrapItem,
    Avatar,
    Stack,
    StackItem,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure

} from '@chakra-ui/react'
import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { MdBuild , MdCall, MdDelete, MdUpdate, MdVpnKey } from "react-icons/md"
import {useRef} from "react";


function AccessPermission(props){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    const localeAccessableFrom = new Date(	props.accessPermission.accessableFrom).toLocaleString();
    const localeAccessableTo = new Date(	props.accessPermission.accessableTo).toLocaleString();

    return (
        <>
                        <Tr>
                            <Td>{props.accessPermission.idUser.username}</Td>
                            <Td>{localeAccessableFrom}</Td>
                            <Td>{localeAccessableTo}</Td>
                            <Td> <Link to={`/EditAccessPermission/${props.accessPermission._id}`}><Button leftIcon={<MdUpdate />} colorScheme='blue'>Uredi</Button></Link> </Td>
                            <Td>
                                <Button onClick={onOpen} leftIcon={<MdDelete />} colorScheme='red'>Izbriši</Button>
                                <AlertDialog
                                    isOpen={isOpen}
                                    leastDestructiveRef={cancelRef}
                                    onClose={onClose}
                                >
                                    <AlertDialogOverlay>
                                        <AlertDialogContent>
                                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                                {"Izbriši dostop"}
                                            </AlertDialogHeader>

                                            <AlertDialogBody>
                                                {"Ali ste prepričani, da želite izbrisati dostop"} <br/>
                                                <b>{props.accessPermission.idUser.username}</b>
                                                {" (" + localeAccessableFrom + " - " +
                                                localeAccessableTo + ") ?"}
                                            </AlertDialogBody>

                                            <AlertDialogFooter>
                                                <Button ref={cancelRef} onClick={onClose}>
                                                    Prekliči
                                                </Button>
                                                <Button colorScheme='red' onClick={e => {

                                                    const res = fetch("http://localhost:3001/access-permissions/" + props.accessPermission._id, {
                                                        method: 'DELETE',
                                                        credentials: 'include',
                                                        headers: {'Content-Type': 'application/json'},
                                                    })
                                                        .then(response =>  {
                                                            onClose();
                                                            window.location.reload(false);
                                                        });

                                                }} ml={3}>
                                                    Izbriši
                                                </Button>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialogOverlay>
                                </AlertDialog>

                            </Td>
                        </Tr>
         
            </>
    );
}

export default AccessPermission;