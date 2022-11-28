import { Box, Flex } from '@chakra-ui/react';
import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { SingleChat } from '../SingleChat';

export const ChatBox = (fetchAgain,setfetchAgain) => {
  const {SelectedChat}=ChatState();
  return (
    <Flex 
    d={{base:SelectedChat?"flex":"none",md:"flex"}}
  alignItems="center"
flexDir="column"
p={3}
bg="white"
w={{base:"100%",md:"68%"}}
boarderRadius="lg"
boaderWidth="1px"
><SingleChat fetchAgain={fetchAgain} setfetchAgain={fetchAgain}/>
</Flex>
  )
}
