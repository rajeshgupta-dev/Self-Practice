import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

const Form = () => {
  return (
    <div className='flex items-center'>
      <div className='grid w-full max-w-sm items-center gap-3'>
        <Input type="email" placeholder="Enter email" />
        <Button variant="outline">Button</Button>
      </div>
    </div>
  )
}
export default Form
