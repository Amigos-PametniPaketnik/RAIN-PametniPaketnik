import {
    Tr,
    Td,
  } from '@chakra-ui/react'
 
function Unlock(props){

    function format(date) {
        date = new Date(date);
        return date.toLocaleDateString() + " ob " + date.toLocaleTimeString();
    }
    return (
        <>
                        <Tr>
                            <Td>{props.unlock.idUser.username}</Td>
                            <Td>{format(props.unlock.dateTime)}</Td>
                            <Td>{props.unlock?.success? props.unlock?.success : ''}</Td>
                        </Tr>
            </>
    );
}

export default Unlock;