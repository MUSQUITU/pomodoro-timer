//! Exemplificando Context
import { createContext, useContext, useState } from 'react'

const CyclesContext = createContext({} as any)

function NewCycleForm() {
  const { activeCycle, setActiveCycle } = useContext(CyclesContext)

  return (
    <h1>
      New CycleForm: {activeCycle}
      <button
        onClick={() => {
          setActiveCycle(2)
        }}
      ></button>
    </h1>
  )
}

function Countdown() {
  const { activeCycle } = useContext(CyclesContext)

  return <h1>Countdown: {activeCycle}</h1>
}
// Context é o componete Pai
export function Context() {
  const [activeCycle, setActiveCycle] = useState(0)

  return (
    //* em value colocar quais informações serão compartilhadas
    <CyclesContext.Provider value={{ activeCycle, setActiveCycle }}>
      <div>
        <NewCycleForm />
        <Countdown />
      </div>
    </CyclesContext.Provider>
  )
}
