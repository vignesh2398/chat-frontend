import { Avatar, Button, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Toast, useDisclosure, useToast } from '@chakra-ui/react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { Box } from '@chakra-ui/layout';
import React, { useState } from 'react'
import { Tooltip } from "@chakra-ui/tooltip";
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { ChatState } from '../../Context/ChatProvider';
import { ProfileModel } from './ProfileModel';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { ChatLoading } from '../ChatLoading';
import UserListItem from '../Useravatar/UserListItem';
import { type } from '@testing-library/user-event/dist/type';
export const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  
  
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [data, setdata] = useState();
  const {User,setSelectedChat,chats,setChats}=ChatState();
 
  const { isOpen, onOpen, onClose } = useDisclosure()
  const history=useHistory()
  const toast=useToast()
  const accessChat=async(userId)=>{
    console.log(userId)
    try {
      setLoadingChat(true)
      const config={
        headers:{
          "Content-type":"application/json",
          Authorization:`Bearer ${User.token}`
        },
      };
      
      const{data}=await axios.post("https://chatapp2s.herokuapp.com/api/chat",{userId},config)
      console.log(data)
      if(!chats.find((c)=>c._id===data._id))

      {
        setChats([data,...chats])
      }
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the ddchat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoadingChat(false);
    }
  }
  const logoutHandler=()=>{
    localStorage.removeItem("userInfo")
    history.push("/");
  }
  const handleSearch =async()=>{
    if(!search){
      toast({
        title:"please Enter Something in Search",
        status:"warning",
        duratiom:5000,
        isClosable:true,
        position:"top=left"
      })
      return;
    }
    try {
      setLoading(true)
      const config={
        headers:{
          Authorization:`Bearer ${User.token}`
        },
      };
      const {data}=await axios.get(`https://chatapp2s.herokuapp.com/api/user?search=${search}`,config)
      console.log(data)
      setLoading(false)
      setSearchResult(data)
    } catch (error) {
      toast({
        title:"Failed to load",
        status:"error",
        duratiom:5000,
        isClosable:true,
        position:"bottom-left"
      })
      return;
    }

  }
  return (  
    <div>
    <Flex 
    justifyContent="space-between"  w="100%"   p="1"    bg="white"
  
    borderWidth="5px"><Tooltip label="Search Users to chat"  hasArrow placement="bottom-end">
      <Button variant="ghost" onClick={onOpen}>
        <i class="fa-solid fa-magnifying-glass"></i>
    <Text d={{base:"none",md:"flex"}} px={4}>Search User</Text>
    </Button>
    </Tooltip>
    <Text fontSize="2xl"  font-family= 'Work Sans'sans-serif d={{base:"none",md:"flex"}} px={4} >Chat-App</Text>
    <div><Menu><MenuButton fontSize="2xl" m={1}>
      <BellIcon/>
      </MenuButton>
      <Menu>
        <MenuButton as={Button}
        rightIcon={<ChevronDownIcon/>}>
          <Avatar size='sm' cursor='pointer' name={User.userExist.name} src={User.userExist.pic}/>
          </MenuButton>
          <MenuList>
            <ProfileModel user={User }>
            <MenuItem>My Profile</MenuItem>{" "}
            </ProfileModel>
            <MenuDivider/>
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
        
      </Menu>
      </Menu></div>
    </Flex>
    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay/>
      <DrawerContent>
        <DrawerHeader>Search Users</DrawerHeader>
      <DrawerBody>
        <Flex d="flex" pb={2}>
        <Input placeholder='search by name or mail'
          mr={2}
          value={search}
          onChange={(e)=>setSearch(e.target.value)}/>
          <Button onClick={handleSearch}>

          Go
          </Button>
        </Flex>
        {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat &&<Spinner ml="auto" d="flex"/>}
      </DrawerBody>

      </DrawerContent>
    </Drawer>

    
    </div>
  )
}
