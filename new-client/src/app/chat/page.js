"use client";
import { redirect } from "next/navigation";
import { io } from 'socket.io-client'
import React, { useEffect, useRef, useState } from "react";


const socket = io(`${process.env.SERVER}`)


const page = () => {
    const [children, setChildren] = useState([])
    const [size, setSize] = useState(100)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      redirect("/");
    }

    socket.emit('client-ready')

    socket.on('submit-ball-from-server', (state)=> {
      setChildren(previous => [...previous, state])
    })

    return ()=> {
      socket.off('submit-ball-from-server')
    }

  }, []);

  const handleClose = ()=> {
      localStorage.removeItem("user")
      window.location = "/"
  }

  const handleClick = (e)=> {
    setChildren(prev=> [...prev, {x: e.pageX, y: e.pageY, size: size, user: JSON.parse(localStorage.getItem("user"))}])
    socket.emit('submit-ball', {x: e.pageX, y: e.pageY, size: size, user: JSON.parse(localStorage.getItem("user"))})
  }

  return <div className=" h-screen w-full relative flex flex-wrap overflow-hidden cursor-crosshair" onClick={(e)=> handleClick(e)} >
      {
        children.map((element, index)=> (
          <div key={index} className={` absolute rounded-full ball hover:brightness-150 cursor-pointer `} style={{ height: +element.size, width: +element.size, left: element.x - (+element.size / 2), top: element.y - (+element.size / 2), background: element?.user?.color }} >
            <div className=" user px-4 py-1 rounded-lg z-50 select-none">{element?.user?.name}</div>
          </div>
        ))
      }
    <div className="z-20 absolute right-0 top-0 flex gap-10 items-center ">
      <input type="range" min="10" max="150" value={size} onChange={(e)=> setSize(e.target.value)} />
    <button className=" text-white py-3 px-4 bg-slate-800/50 hover:bg-slate-600 text-3xl font-bold" onClick={()=> handleClose()}  >X</button>
    </div>
  </div>; 
};

export default page;
