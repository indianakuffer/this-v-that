import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { getUserMatches } from '../services/matches'
import { deleteUser } from '../services/users'
import { useGoogleLogout } from 'react-google-login'
import Loading from '../components/Loading'

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
  align-self: flex-start;
  margin-left: 10%;
  color: grey;
  span {
    font-weight: bold;
  }
`

export default function Account(props) {
  let [matchList, setMatchList] = useState(null)
  let history = useHistory()
  let [showLoading, setShowLoading] = useState(false)
  const { signOut } = useGoogleLogout({
    clientId: '399548900107-q6hopk6di730ppv7dnf2q40hv70nl4k0.apps.googleusercontent.com',
    onLogoutSuccess: logout
  })

  useEffect(() => {
    if (!props.userInfo) { return }
    fetchMatches(props.userInfo._id)
  }, [props.userInfo])

  const fetchMatches = async (id) => {
    setShowLoading(true)
    let response = await getUserMatches(id)
    setMatchList(response)
    setShowLoading(false)
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account and all your votes?')) {
      await deleteUser(props.userInfo._id)
      signOut()
    }
  }

  function logout() {
    history.push('/')
    localStorage.clear()
    props.setUserInfo(null)
  }

  return (
    <Container>
      {showLoading && <Loading />}
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
          <DeleteButton onClick={handleDelete}>Delete Account</DeleteButton>
        </>
      }
    </Container>
  )
}
