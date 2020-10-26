import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { getMatches } from '../services/matches'
import Create from './Create'
import Match from '../components/Match'
import Searchbar from '../components/Searchbar'
import Loading from '../components/Loading'

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
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
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function Feed(props) {
  let [matchList, setMatchList] = useState(null)
  let [showCreate, setShowCreate] = useState(false)
  let [showLoading, setShowLoading] = useState(false)
  let history = useHistory()

  useEffect(() => {
    fetchFeed()
  }, [])

  const fetchFeed = async () => {
    setShowLoading(true)
    let matches = await getMatches()
    setMatchList(matches)
    setShowLoading(false)
  }

  const toggleCreate = () => {
    if (!props.userInfo) {
      alert('Please login to create a match!')
    } else {
      setShowCreate(!showCreate)
    }
  }

  const redirect = (id) => {
    history.push(`/${id}`)
  }

  return (
    <Container>
      <Searchbar setMatchList={setMatchList} />
      <FeedContainer>
        {showLoading && <Loading />}
        {matchList &&
          matchList.map(match => {
            return (
              <Match matchData={{ ...match }} highlight={{ left: match.option1Color, right: match.option2Color }} updateVote={() => redirect(match._id)} key={`feed-${match._id}`} />
            )
          })}
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
