import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getMatch, voteMatch } from '../services/matches'

const Container = styled.div`
  width: 100%;
  padding: 10px;
`
const MatchContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  margin: 10px 0;
  overflow: hidden;
  text-decoration: none;
  .left, .right {
    height: 100%;
    width: 50%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    font-size: 1.3rem;
    font-weight: bold;
  }
  .left {
    left: 2.5%;
    background: ${props => props.option1color};
    color: ${props => props.option1color === props.defaultColor ? 'grey' : 'white'};
    clip-path: polygon(0 0, 100% 0, 90% 100%, 0% 100%);
    border-radius: 10px 0 0 10px;
  }
  .right {
    right: 2.5%;
    background: ${props => props.option2color};
    color: ${props => props.option2color === props.defaultColor ? 'grey' : 'white'};
    clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
    border-radius: 0 10px 10px 0;
  }
`
const LeftCounter = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  position: absolute;
  right: 8%;
  top: 12%;
  text-align: right;
`
const RightCounter = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  position: absolute;
  left: 8%;
  bottom: 12%;
`
const Divider = styled.div`
  position: absolute;
  background: linear-gradient(104deg, rgba(102,102,102,1) 6%, rgba(0,212,255,0) 11%);
  clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
  width: 50%;
  height: 80px;
  right: 2.5%;
  z-index: 10;
  pointer-events: none;
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
    // fetchMatch(params.id)
    if (matchData.votes1.includes(props.userInfo._id)) {
      setHighlight({ left: matchData.option1Color, right: defaultColor })
    } else if (matchData.votes2.includes(props.userInfo._id)) {
      setHighlight({ left: defaultColor, right: matchData.option2Color })
    } else {
      setHighlight({ left: defaultColor, right: defaultColor })
    }
  }, [matchData, props.userInfo])

  const fetchMatch = async (id) => {
    let response = await getMatch(id)
    setMatchData(response)
  }

  const updateVote = async (option) => {
    if (!props.userInfo) {
      alert('Please log in to vote!')
      return
    }
    const body = { [option]: props.userInfo._id }
    let response = await voteMatch(matchData._id, body)
    setMatchData(response)
  }

  return (
    <Container>
      {matchData &&
        <MatchContainer option1color={highlight.left} option2color={highlight.right} defaultColor={defaultColor}>
          <div className='left' onClick={() => updateVote('votes1')}>
            {matchData.option1}
            <LeftCounter>{matchData.votes1.length}</LeftCounter>
          </div>
          {highlight.left === defaultColor && highlight.right === defaultColor && <Divider />}
          <div className='right' onClick={() => updateVote('votes2')}>
            {matchData.option2}
            <RightCounter>{matchData.votes2.length}</RightCounter>
          </div>
        </MatchContainer>
      }
    </Container>
  )
}
