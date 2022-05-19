import {
    Tr,
    Td,
  } from '@chakra-ui/react'
import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { MdBuild , MdCall } from "react-icons/md"

function ParcelLocker(props){
    return (
        <>
                        <Tr>
                            <Td>{props.parcelLocker.numberParcelLocker}</Td>
                            <Td> {props.parcelLocker.location}</Td>
                      
                          <Td> <Link to={`/accessPermissions/${props.parcelLocker._id}`}><Button leftIcon={<MdBuild />} colorScheme='blue'>Pregled</Button></Link> </Td>
                        </Tr>
         
            </>
    );
}

export default ParcelLocker;