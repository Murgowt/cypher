import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PrimaryButton from './components/PrimaryButton'
function App() {
  const [count, setCount] = useState(0)

  const increaseCount = ()=>{
    console.log(count)
    setCount(count+1);
  }
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <PrimaryButton placeHolder="Count is" count={count} increaseCount={increaseCount}/>
        <p>
        Usem & Pollam Solutions.
        </p>
      </div>
      <p className="text-3xl font-bold underline">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
