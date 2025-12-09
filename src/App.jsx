import { useState } from 'react'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='title-font text-2xl'>Welcome to Contesthub</div>
      <div className=''>This is the homepage</div>
    </>
  )
}

export default App
