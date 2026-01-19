import { useEffect, useState } from 'react'
import './App.css'

const colors = [
  'red',
  'green',
  'blue',
  'yellow',
  'purple',
  'pink',
  'orange',
  'teal',
  'cyan',
  'black',
]

function App() {
  const [color, setColor] = useState(
    () => localStorage.getItem('bgColor') || 'olive'
  )

  useEffect(() => {
    localStorage.setItem('bgColor', color)
  }, [color])

  return (
    <div
      className="w-full h-screen duration-200"
      style={{ backgroundColor: color }}
    >
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`outline-none px-4 py-1 rounded-full text-white shadow-lg
                ${color === c ? 'ring-4 ring-black scale-110' : ''}
              `}
              style={{ backgroundColor: c }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
