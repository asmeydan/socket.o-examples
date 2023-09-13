"use client"
import React, { useEffect, useState } from "react";
import { io } from 'socket.io-client'

const socket = io(`${process.env.SERVER}`)

const Messages = () => {
  const [content, setContent] = useState([])

  useEffect(()=> {
    socket.emit('client-ready')

    socket.on('submit-message-from-server', (state)=> {
      setContent(previous => [...previous, state])
    })

    return ()=> {
      socket.off('submit-message-from-server')
    }
  }, [])

  return (
    <div className=" flex-1 bg-slate-900 w-full flex flex-col justify-start items-start p-4 overflow-y-auto">
      <div className=" w-full flex flex-col items-start gap-2 ">
        {content.map((element, index) => (
          <div key={index} className=" bg-gray-700 px-2 py-1 rounded w-3/5 overflow-auto">
            {element}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
