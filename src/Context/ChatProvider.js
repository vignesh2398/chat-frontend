import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext= createContext()
const ChatProvider=({children})=>{
    const [User,setUser]=useState();
    const [SelectedChat,setSelectedChat]=useState();
    const [reload,setreload]=useState();
    const [chats,setChats]=useState([]);
    const [notification, setNotification] = useState([]);
    const history=useHistory();
    useEffect(()=>{
      const userinfo= JSON.parse( localStorage.getItem("userInfo"))
      
      setUser(userinfo)
      if(!userinfo);
      history.push("/");
    },[history])
    return(
    <ChatContext.Provider value={{User,setUser,SelectedChat,setSelectedChat,notification,
      setNotification,chats,setChats,reload,setreload}}>
        {children}
    </ChatContext.Provider>
    )
};
export const ChatState=()=>{
return useContext(ChatContext)
}
export default ChatProvider;