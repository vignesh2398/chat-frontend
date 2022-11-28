import { ArrowBackIcon } from '@chakra-ui/icons'
import {  Flex, FormControl, IconButton, Input,  Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getSender, getSenderFull } from '../config/ChatLogics'
import { ChatState } from '../Context/ChatProvider'

import { ProfileModel1 } from './miscellaneous/ProfileModel1'

import axios from 'axios'
import './styles.css'
import { ScrollableChat } from './ScrollableChat'
import { io } from 'socket.io-client'
import Lottie from 'react-lottie'
import animationData from './Authentication/animations/typing.json'
const ENDPOINT = "https://chatapp2s.herokuapp.com"; 
var socket, selectedChatCompare;

export const SingleChat = ({fetchAgain,setFetchAgain}) => {

  const [Message,setMessage]= useState([]);
  const [newMessage,setNewMessage]= useState([]);
  const [Loading,setLoading]= useState(false);

  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
    const {User,SelectedChat,setSelectedChat,notification,setNotification }=ChatState(false)
    const toast= useToast();

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };


    const fetchMessages= async()=>{
      if(!SelectedChat)return;
      try {
        const config={
          headers:{
            "Content-type":"application/json",
            Authorization:`Bearer ${User.token}`
          }
        };
        setLoading(true)
        const {data}=await axios.get(`https://chatapp2s.herokuapp.com/api/message/${SelectedChat._id}`,config)
        console.log(Message,"this is msg")
        setMessage(data)
        setLoading(false)
        socket.emit("join chat", SelectedChat._id);  //socket
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        
      }
    }
    const sendMessage=async(event)=>{
      if(event.key === "Enter" && newMessage)
      {
        try {
          const config={
            headers:{
              "Content-type":"application/json",
              Authorization:`Bearer ${User.token}`
            }
          }
          setNewMessage("");
          const {data}=await axios.post("https://chatapp2s.herokuapp.com/api/message",{content:newMessage,chatId:SelectedChat._id},config)
          console.log(data)
          socket.emit("new message", data);
          setMessage([...Message,data]);
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: "Failed to send the Message",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          
        }
      }

    }

    useEffect(() => {
      socket = io(ENDPOINT);
      socket.emit("setup", User);
      socket.on("connected", () => setSocketConnected(true));
      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));
  
      // eslint-disable-next-line
    }, []);



    useEffect(()=>{
      fetchMessages();
      selectedChatCompare=SelectedChat;
    },[SelectedChat]);

    useEffect(() => {
      socket.on("message recieved", (newMessageRecieved) => {
        if (
          !selectedChatCompare || // if chat is not selected or doesn't match current chat
          selectedChatCompare._id !== newMessageRecieved.chat._id
        ) {
          if (!notification.includes(newMessageRecieved)) {
            setNotification([newMessageRecieved, ...notification]);
            setFetchAgain(!fetchAgain);
          }
        } else {
          setMessage([...Message, newMessageRecieved]);
        }
      });
    });

    const typingHandler=(e)=>{
      setNewMessage(e.target.value);
      //ddd
      if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", SelectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", SelectedChat._id);
        setTyping(false);
      }
    }, timerLength);
// typing Indicator
    };

  return (
  
    <>
    
    {SelectedChat?(<><Flex
    fontSize={{base:"28px",md:"30px"}}
    pb={3}
    px={2}
    w="100%"
    fontFamily="Work sans"
    d="flex"
    justifyContent={{base:"space-between"}}
    align="center"
    >
      <IconButton
        d={{base:"flex",md:"none"}}
        icon={<ArrowBackIcon/>}
        onClick={()=>setSelectedChat("")}/>
        {!SelectedChat.isGroupChat?(<>{getSender(User,SelectedChat.users)}<ProfileModel1 user={getSenderFull(User,SelectedChat.users)}/></>):(<>{SelectedChat.chatName}</>)}
        </Flex>
        <Flex
         d="flex"
         flexDir="column"
         justifyContent="flex-end"
         p={3}
         bg="#E8E8E8"
         w="100%"
         h="100%"
         borderRadius="lg"
         overflowY="hidden"
        >{Loading ? (
          <Spinner
            size="xl"
            w={20}
            h={20}
            alignSelf="center"
            margin="auto"
          />
        ) : (
          <div className='message'><ScrollableChat messages={Message}/></div>
        )}
        <FormControl onKeyDown={sendMessage} isRequired mt={3}>
        {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
          <Input variant="filled" bg="white" placeholder='enter message' onChange={typingHandler} value={newMessage}>
          
          </Input> </FormControl>
        
        </Flex>

        
       
        </>):
        (<Flex d="flex" alignItems="center" justifyContent="center" h="100%"><Text fontSize="3xl" pb={3} fontFamily="Work sans"> Click on a user to start chatting </Text> </Flex>)}</>
        )
}
