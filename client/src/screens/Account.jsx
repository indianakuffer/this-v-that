import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { getUserMatches } from '../services/matches'

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
const DeleteButton = styled.button`
  background: red;
`

export default function Account(props) {
  let [matchList, setMatchList] = useState(null)

  useEffect(() => {
    if (!props.userInfo) { return }
    fetchMatches(props.userInfo._id)
  }, [props.userInfo])

  const fetchMatches = async (id) => {
    let response = await getUserMatches(id)
    setMatchList(response)
  }

  return (
    <Container>
      {props.userInfo && matchList &&
        <div>
          <h3>Hey, {props.userInfo.givenName}!</h3>
          {matchList.map(match => {
            return (
              <Link to={`/${match._id}`} key={match._id}>{match.option1} v {match.option2}</Link>
            )
          })}
          <DeleteButton>Delete Account</DeleteButton>
        </div>
      }
    </Container>
  )
}
