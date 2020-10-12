import React from 'react'
import styled from 'styled-components'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { getUser, createUser } from '../services/users'

const StyledHeader = styled.header`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 10px 20px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px 0px;
`

export default function Header(props) {

  const responseGoogle = async (response) => {
    let googleId = response.profileObj.googleId
    let user = await getUser(googleId)
    let _id = ''

    if (typeof user === 'string') {
      let newUser = await createUser(response.profileObj)
      _id = newUser._id
    } else {
      _id = user._id
    }

    props.setUserInfo({ ...response.profileObj, _id: _id })
  }

  const logout = () => {
    props.setUserInfo(null)
    localStorage.clear()
  }

  return (
    <StyledHeader>
      <div>This v That</div>
      {props.userInfo ?
        <GoogleLogout
          clientId='399548900107-q6hopk6di730ppv7dnf2q40hv70nl4k0.apps.googleusercontent.com'
          buttonText="Logout"
          onLogoutSuccess={logout}
        />
        :
        <GoogleLogin
          clientId='399548900107-q6hopk6di730ppv7dnf2q40hv70nl4k0.apps.googleusercontent.com'
          buttonText='Login'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      }
    </StyledHeader>
  )
}