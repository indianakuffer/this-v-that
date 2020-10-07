import React from 'react'
import styled from 'styled-components'
import { GoogleLogin, GoogleLogout } from 'react-google-login'

export default function Header(props) {

  const StyledHeader = styled.header`
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px 10px 20px;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px 0px;
  `

  const responseGoogle = (response) => {
    console.log(response)
    console.log(response.profileObj)
    props.setGoogleId(response.profileObj.googleId)
  }
  const logout = () => {
    props.setGoogleId(null)
    console.log(props.googleId)
    localStorage.clear()
  }

  return (
    <StyledHeader>
      <div>This v That</div>
      {props.googleId ?
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
