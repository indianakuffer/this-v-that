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
  }
  .right {
    background: ${props => props.option2color};
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
