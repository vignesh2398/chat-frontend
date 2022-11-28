import { Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { Center, Square, Circle } from '@chakra-ui/react'
import React from 'react'

export const ProfileModel1 = ({user,children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
    <Button onClick={onOpen}>Profile</Button>

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
          <Center  h='100px' color='black'>
        <ModalHeader
        fontSize="40px"
        fontFamily="Work sans"
        d="flex"
        justifyContent="center"
 
        >{user.name}
  
</ModalHeader>
</Center>
        <ModalCloseButton />
        <ModalBody>
            <Center>
         <Image
         borderRadius="full"
         boxSize="150px"
         src={user.pic}
         alt={user.name}
         />
         </Center>
         <div>
         <Center>
         <Text justifyContent="center" d="flex">{user.email}</Text>
         </Center>
         </div>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='ghost'>Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>

  )
}
