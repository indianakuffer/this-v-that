import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  color: grey;
  text-align: center;
`

export default function Loading() {

  let [count, setCount] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      advanceDots()
    }, 400)
    return () => clearInterval(interval);
  }, [count])

  const advanceDots = () => {
    if (count > 2) {
      setCount(1)
    } else {
      setCount(count + 1)
    }
  }

  return (
    <Container>
      Loading
      {count > 0 && <span className='dots1'>.</span>}
      {count > 1 && <span className='dots2'>.</span>}
      {count > 2 && <span className='dots3'>.</span>}
    </Container>
  )
}
