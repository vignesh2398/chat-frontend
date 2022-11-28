import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Flex, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getSender } from '../../config/ChatLogics';
import { ChatState } from '../../Context/ChatProvider';
import { ChatLoading } from '../ChatLoading';
import GroupChatModal from './GroupChatModal';

export const MyChats = ({fetchAgain}) => {
  
    const [loggedUser,setLoggedUser]=useState();
    const {User,SelectedChat,setSelectedChat,chats,setChats}=ChatState();
    const toast=useToast();
    const fetchChats=async()=>{
        try {
            const config={
                headers:{
                  "Content-type":"application/json",
                  Authorization:`Bearer ${User.token}`
                },
              };
             
              const{data}=await axios.get("https://chatapp2s.herokuapp.com/api/chat",config) 
              console.log(data,"fdgdfgdffdg")
              setChats(data);
        } catch (error) {
            toast({
                title:"error Occured",
                description:"failed to Load the Chats",
                status:"error",
                inClosable:true,
                position:"bottom-left"
            })
        }
    }
    useEffect(()=>{
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
        fetchChats();
    },[fetchAgain])
  return (
    <Flex
    d={{ base: SelectedChat ? "none" : "flex", md: "flex" }}
    flexDir="column"
    alignItems="center"
    p={3}
    bg="white"
    w={{ base: "100%", md: "31%" }}
    borderRadius="lg"
    borderWidth="1px">
      <Flex
       pb={3}
       px={3}
       fontSize={{ base: "28px", md: "30px" }}
       fontFamily="Work sans"
       d="Flex"
       w="100%"
       justifyContent="space-between"
       alignItems="center"
      >
        <Center>My Chats</Center>
        <GroupChatModal>

        <Button
                    d="flex"
                    fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                    rightIcon={<AddIcon />}
                    >Create New Group</Button>
        </GroupChatModal>
        </Flex>
        <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
        >
           {chats?(<Stack overflowY="scroll">
            {chats.map((chat)=>(
              <Box
              onClick={() => setSelectedChat(chat)}
              cursor="pointer"
              bg={SelectedChat === chat ? "lightblue" : "#E8E8E8"}
              color={SelectedChat === chat ? "blue" : "black"}
              px={3}
              py={2}
              borderRadius="lg"
              key={chat._id}>
                <Text>
                  {console.log(chat.users,"this is chattt")}
                 {!chat.isGroupChat?getSender(loggedUser,chat.users):chat.chatName}
                </Text>

              </Box>
            ))}
           </Stack>):(<ChatLoading/>)}

        </Box>

    </Flex>
  )
}
