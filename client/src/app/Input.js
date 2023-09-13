"use client"
import React from 'react'
import { io } from 'socket.io-client'
import { useState } from 'react'

const socket = io(`${process.env.SERVER}`)

const Input = () => {
  const [input, setInput] = useState("")

  const handleSubmit = (e)=> {
    e.preventDefault()
    socket.emit('submit-message', input)
    setInput("")
  }

  return (
    <div className=' w-full bg-green-950 flex flex-col justify-center items-center py-2'>
      <form className=' w-full h-full flex justify-center items-center px-6 gap-4' onSubmit={(e)=> handleSubmit(e)}>
        <input className=' flex-1 rounded-lg bg-gray-500 focus:outline-none px-4 py-1' type='text' value={input} onChange={(e)=> setInput(e.target.value)} />
        <button className=' bg-gray-500 rounded-lg px-4 py-1' type='submit'>gönder</button>
      </form>
    </div>
  )
}

export default Input