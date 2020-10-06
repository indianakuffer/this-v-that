import React from 'react'
import GoogleLogin from 'react-google-login'

export default function App() {

  const responseGoogle = (response) => {
    console.log(response)
    console.log(response.profileObj)
  }

  return (
    <div>
      <GoogleLogin
        clientId='399548900107-q6hopk6di730ppv7dnf2q40hv70nl4k0.apps.googleusercontent.com'
        buttonText='Login'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )
}
