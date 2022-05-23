import {
    Tr,
    Td,
    Wrap,
    WrapItem,
    Avatar,
    Stack,
    StackItem,
  } from '@chakra-ui/react'
import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { MdBuild , MdCall, MdDelete, MdUpdate, MdVpnKey } from "react-icons/md"

function ParcelLocker(props){
    return (
        <>
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
                              {props.parcelLocker.address} {props.parcelLocker.city} {props.parcelLocker.postal}
                              </StackItem>
                              </Stack>
                              </WrapItem>
                              </Wrap>
                              </Td>
                      
                          <Td> <Link to={`/accessPermissions/${props.parcelLocker._id}`}><Button leftIcon={<MdBuild />} colorScheme='blue'>Pregled</Button></Link> </Td>
                          <Td> <Link to={`/unlocks/${props.parcelLocker._id}`}><Button leftIcon={<MdVpnKey />} colorScheme='teal'>Odklepi</Button></Link> </Td>
                          <Td> <Link to={`/accessPermissions/${props.parcelLocker._id}`}><Button leftIcon={<MdUpdate />} colorScheme='blue'>Uredi</Button></Link> </Td>
                          <Td> <Link to={`/accessPermissions/${props.parcelLocker._id}`}><Button leftIcon={<MdDelete />} colorScheme='red'>Izbriši</Button></Link> </Td>
                        </Tr>
         
            </>
    );
}

export default ParcelLocker;