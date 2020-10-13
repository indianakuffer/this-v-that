import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getMatch } from '../services/matches'

const Container = styled.div`
  width: 100%;
  padding: 10px;
`
const MatchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  margin: 10px 0;
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  .left, .right {
    height: 100%;
    width: 50%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .left {
    background: ${props => props.option1color};
    // border: 1px solid ${props => props.option1color === props.defaultColor ? 'black' : 'transparent'};
    color: ${props => props.option1color === props.defaultColor ? 'grey' : 'white'};
  }
  .right {
    background: ${props => props.option2color};
    // border: 1px solid ${props => props.option2color === props.defaultColor ? 'black' : 'transparent'};
    color: ${props => props.option2color === props.defaultColor ? 'grey' : 'white'};
  }
`

export default function Match(props) {
  let params = useParams()
  let defaultColor = '#dfdfdf'
  let [matchData, setMatchData] = useState(null)
  let [highlight, setHighlight] = useState({ left: defaultColor, right: defaultColor })

  useEffect(() => {
    fetchMatch(params.id)
  }, [])

  useEffect(() => {
    if (!matchData || !props.userInfo) { return }

    if (matchData.votes1.includes(props.userInfo._id)) {
      setHighlight({ left: matchData.option1Color, right: defaultColor })
    } else if (matchData.votes2.includes(props.userInfo._id)) {
      setHighlight({ left: defaultColor, right: matchData.option2Color })
    }

  }, [matchData, props.userInfo])

  const fetchMatch = async (id) => {
    let response = await getMatch(id)
    setMatchData(response)
  }

  return (
    <Container>
      {matchData &&
        <MatchContainer option1color={highlight.left} option2color={highlight.right} defaultColor={defaultColor}>
          <div className='left'>{matchData.option1}</div>
          <div className='right'>{matchData.option2}</div>
        </MatchContainer>
      }
    </Container>
  )
}
