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
    useDisclosure,
    Tooltip

  } from '@chakra-ui/react'
import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { MdBuild , MdCall, MdDelete, MdUpdate, MdVpnKey } from "react-icons/md"
import { WiDayCloudyWindy} from "react-icons/wi";
import {useRef} from "react";

function ParcelLocker(props){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    return (
                        <Tr>
                            <Td>
                              <Wrap>
                                <WrapItem>
                              <img src='https://www.direct4.me/Portals/_default/Skins/D4ME-WEB/images/d-box.png' width={50} height={50} />
                              </WrapItem>
                              <WrapItem>
                              <Stack spacing={1}>
                                <StackItem>
                              <b>{props.parcelLocker.numberParcelLocker}</b>
                              </StackItem>
                              <StackItem>
                              {props.parcelLocker.name}
                              </StackItem>
                              <StackItem>
                              {props.parcelLocker.address} {props.parcelLocker.postal} {props.parcelLocker.city}
                              </StackItem>
                              <StackItem>
                              <Link to={`/weather/${props.parcelLocker.city}`}>
                                  <Tooltip hasArrow label={"Vremenska napoved"}>
                                  <Button leftIcon={<WiDayCloudyWindy />} size={"sm"}>{props.parcelLocker.city}</Button>
                                  </Tooltip>
                              </Link>
                              </StackItem>
                              </Stack>
                              </WrapItem>
                              </Wrap>
                              </Td>

                          <Td> <Link to={`/accessPermissions/${props.parcelLocker._id}`}><Button leftIcon={<MdBuild />} colorScheme='blue'>Pregled</Button></Link> </Td>
                          <Td> <Link to={`/unlocks/${props.parcelLocker._id}`}><Button leftIcon={<MdVpnKey />} colorScheme='teal'>Odklepi</Button></Link> </Td>
                          <Td> <Link to={`/ParcelLocker/${props.parcelLocker._id}`}><Button leftIcon={<MdUpdate />} colorScheme='blue'>Uredi</Button></Link> </Td>
                          <Td>
                              <Button onClick={onOpen} leftIcon={<MdDelete />} colorScheme='red'>Izbri??i</Button>
                              <AlertDialog
                                  isOpen={isOpen}
                                  leastDestructiveRef={cancelRef}
                                  onClose={onClose}
                              >
                                  <AlertDialogOverlay>
                                      <AlertDialogContent>
                                          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                              {"Izbri??i Paketnik " + props.parcelLocker.name + "(" + props.parcelLocker.numberParcelLocker + ")"}
                                          </AlertDialogHeader>

                                          <AlertDialogBody>
                                              {"Ali ste prepri??ani, da ??elite izbrisati paketnik "}
                                              <b>{props.parcelLocker.name}</b>
                                              {"(" +props.parcelLocker.numberParcelLocker + ") ?"}
                                          </AlertDialogBody>

                                          <AlertDialogFooter>
                                              <Button ref={cancelRef} onClick={onClose}>
                                                  Prekli??i
                                              </Button>
                                              <Button colorScheme='red' onClick={e => {

                                                  const res = fetch("http://localhost:3001/parcel-lockers/" + props.parcelLocker._id, {
                                                      method: 'DELETE',
                                                      credentials: 'include',
                                                      headers: {'Content-Type': 'application/json'},
                                                  })
                                                      .then(response =>  {
                                                          onClose();
                                                          window.location.reload(false);
                                                      });

                                              }} ml={3}>
                                                  Izbri??i
                                              </Button>
                                          </AlertDialogFooter>
                                      </AlertDialogContent>
                                  </AlertDialogOverlay>
                              </AlertDialog>

                          </Td>
                        </Tr>

    );
}

export default ParcelLocker;