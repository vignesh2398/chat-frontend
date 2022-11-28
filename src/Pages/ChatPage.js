
import { Flex, Spacer } from '@chakra-ui/react'
import { Box } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { ChatBox } from '../components/miscellaneous/ChatBox';
import { MyChats } from '../components/miscellaneous/MyChats';
import { SideDrawer } from '../components/miscellaneous/SideDrawer';
import { ChatState } from '../Context/ChatProvider';
import { useHistory } from 'react-router-dom';
export const ChatPage = () => {
  const history=useHistory();
const {User,setUser}=ChatState();
const[fetchAgain,setfetchAgain]=useState(false);
const[reload,setreload]=useState(false);



setTimeout(()=>{
  setreload(true)
},100)

    return (
      <>
    <div style={{ width: "100%" }}>
    {User && <SideDrawer />}
    <Flex  d="flex" justifyContent="space-between"  w="100%" h="91.5vh"  p="4" >
   
    {User && <MyChats fetchAgain={fetchAgain} />}
      {User && (<ChatBox fetchAgain={fetchAgain} setFetchAgain={setfetchAgain} />) }

    </Flex>
  </div>
      
      
      </>
  )
}
