import Messages from './Messages'
import Input from './Input'

export default function Home() {


  return (
    <main className="flex h-screen flex-col items-center justify-center py-20 px-4">
      <div className=' flex-1 w-full flex flex-col items-center justify-center rounded-lg overflow-hidden max-w-2xl'>
        <Messages  />
        <Input  />
      </div>
    </main>
  )
}
