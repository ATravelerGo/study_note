import {useRef, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ToDoList from "./components/ToDoList/index.tsx";
import {ConfigContext} from "./context/ConfigContext.ts";
import {mockData} from './mockData/index.ts'

function App() {


    const [count, setCount] = useState(0)
    const [data, setData] = useState(mockData)

    const countRef = useRef(0)


    const subHandle = () => {


        countRef.current = count

        setCount((pre) => pre - 1)

    }

    const addHandle = () => {
        countRef.current = count

        setCount((pre) => pre + 1)

    }


    return (
    <>
        <ConfigContext.Provider value={{config: data, setConfig: setData}}>
      <div>
          <a target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
          <a target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

            <hr/>

            <ToDoList></ToDoList>

        </ConfigContext.Provider>

        {countRef.current}
        <div style={{padding: 10}}>
            <button onClick={subHandle}>-</button>
            <span>{count}</span>
            <button onClick={addHandle}>+</button>
        </div>


    </>
  )
}

export default App
