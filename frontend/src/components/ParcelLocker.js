import {
    Tr,
    Td,
  } from '@chakra-ui/react'
import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { MdBuild , MdCall } from "react-icons/md"
import { WiDayCloudyWindy } from "react-icons/wi";
function ParcelLocker(props){
    return (
        <>
                        <Tr>
                            <Td>{props.parcelLocker.numberParcelLocker}</Td>
                            <Td> <Link to={`/weather/${props.parcelLocker.city}`}><Button leftIcon={<WiDayCloudyWindy />} colorScheme='blue'>{props.parcelLocker.location}</Button></Link> </Td>
                          <Td> <Link to={`/accessPermissions/${props.parcelLocker._id}`}><Button leftIcon={<MdBuild />} colorScheme='blue'>Pregled</Button></Link> </Td>
                        </Tr>
            </>
    );
}

export default ParcelLocker;