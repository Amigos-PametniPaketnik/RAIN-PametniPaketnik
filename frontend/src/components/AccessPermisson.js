import {
    Tr,
    Td,
  } from '@chakra-ui/react'
 
function AccessPermission(props){
    return (
        <>
                        <Tr>
                            <Td>{props.accessPermission.idUser.username}</Td>
                            <Td>{props.accessPermission.accessableFrom}</Td>
                            <Td>{props.accessPermission.accessableTo}</Td>
  
                        </Tr>
         
            </>
    );
}

export default AccessPermission;