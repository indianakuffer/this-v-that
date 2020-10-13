import React from 'react'
import styled from 'styled-components'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { Link } from 'react-router-dom'
import { getUser, createUser } from '../services/users'

const StyledHeader = styled.header`
  width: 100vw;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 10px 20px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px 0px;
`
const HomeLink = styled(Link)`
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: bold;
  color: grey;
`
const OptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    height: 35px;
    overflow: hidden;
  }
`
const ProfileImage = styled(Link)`
  background-image: url('${props => props.image}');
  background-size: contain;
  border: none;
  border-radius: 50%;
  height: 35px;
  width: 35px;
  margin-right: 5px;
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
      <HomeLink to='/'>This v That</HomeLink>
      <OptionsContainer>
        {props.userInfo &&
          <ProfileImage to='/account' image={props.userInfo.imageUrl} />
        }
        {props.userInfo ?
          <GoogleLogout
            clientId='399548900107-q6hopk6di730ppv7dnf2q40hv70nl4k0.apps.googleusercontent.com'
            buttonText="Logout"
            onLogoutSuccess={logout}
          />
          :
          <GoogleLogin
            style={{ background: 'red' }}
            clientId='399548900107-q6hopk6di730ppv7dnf2q40hv70nl4k0.apps.googleusercontent.com'
            buttonText='Login'
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
        }
      </OptionsContainer>
    </StyledHeader>
  )
}
