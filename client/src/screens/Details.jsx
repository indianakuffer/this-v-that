import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Loading from '../components/Loading'
import Match from '../components/Match'
import { getMatch, voteMatch, deleteMatch } from '../services/matches'

const Container = styled.div`
  width: 100%;
  padding: 10px;
  max-width: 600px;
  margin: 0 auto;
`
const DeleteButton = styled.button`
  margin-top: 20px;
  border: none;
  padding: 7px 19px;
  border-radius: 5px;
  background: brown;
  color: white;
  letter-spacing: 0.05rem;
`
const MatchDate = styled.div`
  color: light-grey;
  font-size: 0.6rem;
  text-align: right;
  width: 95%;
  transform: translateY(-8px);
`

export default function Details(props) {
  let params = useParams()
  let [matchData, setMatchData] = useState(null)
  let defaultColor = '#dfdfdf'
  let [highlight, setHighlight] = useState({ left: defaultColor, right: defaultColor })
  let [showLoading, setShowLoading] = useState(false)
  let history = useHistory()

  useEffect(() => {
    fetchMatch(params.id)
  }, [])

  useEffect(() => {
    if (!matchData || !props.userInfo) { return }
    if (matchData.votes1.includes(props.userInfo._id)) {
      setHighlight({ left: matchData.option1Color, right: defaultColor })
    } else if (matchData.votes2.includes(props.userInfo._id)) {
      setHighlight({ left: defaultColor, right: matchData.option2Color })
    } else {
      setHighlight({ left: defaultColor, right: defaultColor })
    }
  }, [matchData, props.userInfo])

  const fetchMatch = async (id) => {
    setShowLoading(true)
    let response = await getMatch(id)
    setMatchData(response)
    setShowLoading(false)
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

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this match?')) {
      await deleteMatch(matchData._id)
      history.push('/')
    }
  }

  return (
    <Container>
      {showLoading && <Loading />}
      {matchData &&
        <Match matchData={matchData} highlight={highlight} updateVote={updateVote} />
      }
      {matchData && props.userInfo && matchData.creator === props.userInfo._id &&
        <>
          <MatchDate>{new Date(matchData.createdAt).toLocaleDateString()}</MatchDate>
          <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        </>
      }
    </Container>
  )
}
