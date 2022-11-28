
import { Flex, Spacer } from '@chakra-ui/react'
import { Box } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react'
import { ChatBox } from '../components/miscellaneous/ChatBox';
import { MyChats } from '../components/miscellaneous/MyChats';
import { SideDrawer } from '../components/miscellaneous/SideDrawer';
import { ChatState } from '../Context/ChatProvider';
import { useHistory } from 'react-router-dom';
export const ChatPage = () => {
  const history=useHistory();
const {User,setUser,reload,setreload}=ChatState();
const[fetchAgain,setfetchAgain]=useState(false);
console.log(User)
useEffect(()=>{
  const refreshPage = ()=>{
    window.location.reload();
  }
})




    return (
      <div style={{ width: "100%" }}>
      {User && <SideDrawer />}
      <Flex  d="flex" justifyContent="space-between"  w="100%" h="91.5vh"  p="4" >
        {User && <MyChats fetchAgain={fetchAgain}/>}
        
        {User && <ChatBox /> }
       
      </Flex>
    </div>
  )
}
