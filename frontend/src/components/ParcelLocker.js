import {
    Tr,
    Td,
  } from '@chakra-ui/react'
//      <Text fontSize={'xl'} mb={1}> {props.parcelLocker.numberParcelLocker}</Text>
//<Text fontSize={'xl'} mb={1}> {props.parcelLocker.location}</Text>
function ParcelLocker(props){
    return (
        <>
                        <Tr>
                            <Td>{props.parcelLocker.numberParcelLocker}</Td>
                            <Td> {props.parcelLocker.location}</Td>
                        </Tr>
         
            </>
    );
}

export default ParcelLocker;