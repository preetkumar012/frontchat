import React, { useEffect, useState } from "react";
import "./chat.css";
import { user } from "../Join/Join.js";
import socketIO from "socket.io-client";
import Message from "../../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";

const ENDPOINT = "https://backchat-frf1.vercel.app/";
let socket;

const Chat = () => {
  const [id, setId] = useState("");
  const [comon, setComon] = useState([]);
 

  

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };

  console.log(comon);
  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      //   alert("conneted");
      setId(socket.id);
    });
    console.log(socket);
    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setComon([...comon, data]);
      console.log(data.user, data.message);
    });
    socket.on("userjoined", (data) => {
      setComon([...comon, data]);
      console.log(data.user, data.message);
    });
    socket.on("leave", (data) => {
      setComon([...comon, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit("desconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setComon([...comon, data]);
      console.log(data.user, data.message, data.id);
    });
    return ()=>{
      socket.off();
    }
  }, [comon]);



 



  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
         <img src="./Images/us.jpg" alt=""/>
          {/* <h3 className="text-center">Welcome chat Application</h3> */}
        <a href="/"><i class="fas fa-bars me-3 fs-5 text-light"></i></a>  


           </div>
        <ReactScrollToBottom className="chatBox">

      {
        comon.map((item,i)=> <Message message= {item.message}   user={item.id===id ? '' : item.user} classs={item.id===id ?  ' right' : 'left'}
        classes={item.id===id ? 'message-sect': "message-sectt"}
        /> )
      
      } 
        </ReactScrollToBottom>
        <div className="inputBox">
          <input onKeyPress={(e)=> e.key==='Enter'? send():null} type="text" id="chatInput" placeholder="typing here" />
          <button onClick={send} className="sendBtn">
            send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
