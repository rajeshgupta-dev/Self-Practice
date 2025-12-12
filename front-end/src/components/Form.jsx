import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

const Form = () => {
  return (
    <div className='flex items-center justify-center bg-zinc-100 w-full h-screen'>
      <div className='max-w-sm flex flex-col items-center gap-3 bg-zinc-200 p-4 rounded-2xl'>
        <h1 className='text-center m-4 text-3xl'>Login</h1>
        <div className='w-full flex flex-col gap-3'>
          <Input
            className="focus:ring-2 focus:ring-red-500"
            placeholder="Email"
          />

          <Button className="w-full bg-zinc-300 mt-1" variant="outline">
            Button
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Form
