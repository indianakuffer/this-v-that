import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getMatches } from '../services/matches'

const Container = styled.div`
  width: 100%;
`
const FeedContainer = styled.div`
  width: 100%;
  padding: 0px 10px;

`
const MatchButton = styled(Link)`
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
  clip-path: polygon(0 0, 100% 0, 90% 100%, 0% 100%);
  border-radius: 10px 0 0 10px;
}
.right {
  right: 2.5%;
  background: ${props => props.option2color};
  clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
  border-radius: 0 10px 10px 0;
}
`

export default function Feed(props) {
  let [matchList, setMatchList] = useState(null)

  useEffect(() => {
    fetchFeed()
  }, [])

  const fetchFeed = async () => {
    let matches = await getMatches()
    setMatchList(matches)
  }

  return (
    <Container>
      <h3>Searchbar</h3>
      <FeedContainer>
        {matchList &&
          matchList.map(match => {
            return (
              <MatchButton to={`/${match._id}`} option1color={match.option1Color} option2color={match.option2Color} key={match._id}>
                <div className='left'>{match.option1}</div>
                <div className='right'>{match.option2}</div>
              </MatchButton>
            )
          })
        }
      </FeedContainer>
    </Container>
  )
}
