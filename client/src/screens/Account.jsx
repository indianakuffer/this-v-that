import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { getUserMatches } from '../services/matches'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  h4 {
    margin: 8px 0 15px 0;
    border-bottom: 1px solid black;
  }
  hr {
    width: 90%;
  }
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
const AccountMatch = styled(Link)`
  display: block;
  text-decoration: none;
  margin-bottom: 8px;
  span {
    font-weight: bold;
  }
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
        <>
          <h2>Hey, {props.userInfo.givenName}!</h2>
          <hr />
          <h4>Your votes:</h4>
          {matchList.map(match => {
            return (
              <AccountMatch to={`/${match._id}`} key={match._id}>
                <span style={{ color: match.option1Color }}>{match.option1}</span> v <span style={{ color: match.option2Color }}>{match.option2}</span>
              </AccountMatch>
            )
          })}
          <hr />
          <DeleteButton>Delete Account</DeleteButton>
        </>
      }
    </Container>
  )
}
