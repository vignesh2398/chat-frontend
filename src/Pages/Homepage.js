import { Container,Box, Text, Tab, TabList, TabPanels, TabPanel, Tabs } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Login } from '../components/Authentication/Login'
import { Signup } from '../components/Authentication/Signup'
import { ChatState } from '../Context/ChatProvider'

export const Homepage = () => {
  const {setreload,reload}=ChatState();
  const history=useHistory();
  
  useEffect(()=>{
    const userinfo= JSON.parse( localStorage.getItem("userInfo"))
        if(userinfo)
    history.push("/chats");

  },[history])
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 0 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text m="0 0 0 150px" fontSize="4xl" fontFamily="Work sans">
          Chat-App
        </Text>
      </Box>
      <Box d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="10px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px">
      <Tabs variant='soft-rounded' colorScheme='green'>
  <TabList>
    <Tab width="50%">Login</Tab>
    <Tab width="50%">SIgnup</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
     {<Login/>}
    </TabPanel>
    <TabPanel>
      {<Signup/>} 
    </TabPanel>
  </TabPanels>
</Tabs>
      </Box>
 
    </Container>
  )
}
