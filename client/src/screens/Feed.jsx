import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { getMatches } from '../services/matches'
import Create from './Create'
import Match from '../components/Match'
import Searchbar from '../components/Searchbar'

const Container = styled.div`
  width: 100%;
`
const FeedContainer = styled.div`
  width: 100%;
  padding: 0px 10px;
`
const CreateButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: green;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 45px;
`
const CreateContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  keft: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function Feed(props) {
  let [matchList, setMatchList] = useState(null)
  let [showCreate, setShowCreate] = useState(false)
  let history = useHistory()

  useEffect(() => {
    fetchFeed()
  }, [])

  const fetchFeed = async () => {
    let matches = await getMatches()
    setMatchList(matches)
  }

  const toggleCreate = () => {
    setShowCreate(!showCreate)
  }

  const redirect = (id) => {
    history.push(`/${id}`)
  }

  let fakeData = {
    option1Color: "#2C699A",
    option2Color: "#A61120",
    votes1: [],
    votes2: [],
    count: 1,
    _id: "5f8e0de4db445c002490d2d6",
    option1: "This",
    option2: "That",
    creator: "5f8e0d76db445c002490d2d5",
    createdAt: "2020-10-19T22:06:28.993Z",
    updatedAt: "2020-10-19T22:06:39.678Z",
    __v: 0
  }

  return (
    <Container>
      <Searchbar setMatchList={setMatchList} />
      <FeedContainer>
        <Match matchData={fakeData} highlight={{ left: 'grey', right: 'grey' }} updateVote={() => true} key={`feed-${'fevaufeaea'}`} />
        {matchList &&
          matchList.map(match => {
            return (
              // awkward repurposing of Match component
              <Match matchData={{ ...match }} highlight={{ left: match.option1Color, right: match.option2Color }} updateVote={() => redirect(match._id)} key={`feed-${match._id}`} />
            )
          })
        }
      </FeedContainer>
      <CreateButton onClick={toggleCreate}>+</CreateButton>
      {showCreate &&
        <CreateContainer onClick={toggleCreate}>
          <Create userInfo={props.userInfo} closeFunction={toggleCreate} />
        </CreateContainer>
      }
    </Container>
  )
}
