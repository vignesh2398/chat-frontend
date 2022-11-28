import { Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { Center, Square, Circle } from '@chakra-ui/react'
import React from 'react'

export const ProfileModel = ({user,children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
    <Button onClick={onOpen}>My Profile</Button>

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
          <Center  h='100px' color='black'>
        <ModalHeader
        fontSize="40px"
        fontFamily="Work sans"
        d="flex"
        justifyContent="center"
 
        >{user.userExist.name}
  
</ModalHeader>
</Center>
        <ModalCloseButton />
        <ModalBody>
            <Center>
         <Image
         borderRadius="full"
         boxSize="150px"
         src={user.userExist.pic}
         alt={user.userExist.name}
         />
         </Center>
         <div>
         <Center>
         <Text justifyContent="center" d="flex">{user.userExist.email}</Text>
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
