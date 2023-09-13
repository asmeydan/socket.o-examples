"use client";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      redirect("/chat");
    }
  }, []);

  const handleSubmit = (e) => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: input,
        color: `hsla(${Math.floor(
          Math.random() * (360 - 0 + 1) + 0
        )}, 100%, 50%, 1)`,
      })
    );
    redirect('/chat')
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <form
        className=" border border-gray-800 p-10 rounded-lg w-full max-w-md flex flex-col gap-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          className=" bg-gray-700 rounded-lg h-10 px-2 w-full focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className=" w-full border border-gray-800 py-2 rounded hover:bg-gray-800 "
          type="submit"
        >
          Giriş Yap
        </button>
      </form>
    </main>
  );
}
