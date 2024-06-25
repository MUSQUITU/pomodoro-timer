import { useContext, useEffect } from 'react'
import { CountdownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../..'

export function Countdown() {
  // Contexto
  const {
    activeCycle,
    activeCycleId,
    markCurrentCyclesAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)

  // * se tiver um ciclo ativo, essa variável será o numero de minutos *60, se não tiver um ciclo o valor será zero.
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  // contagem de quantos segundos se passaram

  //* redução do countdown
  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCyclesAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCyclesAsFinished,
    setSecondsPassed,
  ])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  // quantos minutos eu tenho, floor sempre arredonda para baixo
  const minutesAmount = Math.floor(currentSeconds / 60)
  // quantos segundos restou da divisão
  const secondsAmount = currentSeconds % 60

  // * preencher o tamanho especifico, obrigatorio ter 2caracteres, se não inclui o 0 no inicio
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  // atualizar o titulo da janela/aba
  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
