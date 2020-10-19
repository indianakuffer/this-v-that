import React from 'react'
import styled from 'styled-components'

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
    text-align: center;
  }
  .left {
    left: 2.5%;
    background: ${props => props.option1color};
    color: ${props => props.option1color === props.defaultColor ? 'grey' : 'white'};
    clip-path: polygon(0 0, 100% 0, 90% 100%, 0% 100%);
    border-radius: 10px 0 0 10px;
    .left-text {
      padding: 0 1.6rem 0 0.6rem;
    }
  }
  .right {
    right: 2.5%;
    background: ${props => props.option2color};
    color: ${props => props.option2color === props.defaultColor ? 'grey' : 'white'};
    clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
    border-radius: 0 10px 10px 0;
    .right-text {
      padding: 0 0.6rem 0 1.6rem;
    }
  }
`
const LeftCounter = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  position: absolute;
  background: ${props => props.option1color};
  padding: 2px 5px;
  border-radius: 50%;
  right: 8%;
  top: 12%;
  text-align: right;
`
const RightCounter = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  position: absolute;
  background: ${props => props.option2color};
  border-radius: 50%;
  padding: 2px 5px;
  left: 8%;
  bottom: 12%;
`
const Divider = styled.div`
  position: absolute;
  clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
  width: 50%;
  height: 80px;
  right: 2.5%;
  z-index: 10;
  pointer-events: none;
`

export default function Match(props) {
  let defaultColor = '#dfdfdf'

  return (
    <MatchContainer option1color={props.highlight.left} option2color={props.highlight.right} defaultColor={defaultColor}>
      <div className='left' onClick={() => props.updateVote('votes1')}>
        <div className='left-text'>{props.matchData.option1}</div>
        <LeftCounter option1color={props.highlight.left}>{props.matchData.votes1.length}</LeftCounter>
      </div>
      {props.highlight.left === defaultColor && props.highlight.right === defaultColor && <Divider />}
      <div className='right' onClick={() => props.updateVote('votes2')}>
        <div className='right-text'>{props.matchData.option2}</div>
        <RightCounter option2color={props.highlight.right}>{props.matchData.votes2.length}</RightCounter>
      </div>
    </MatchContainer>
  )
}
