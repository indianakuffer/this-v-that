import React, { useState, useEffect } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import Header from './components/Header'

export default function App() {
  const [googleId, setGoogleId] = useState(null)

  return (
    <div>
      <Header googleId={googleId} setGoogleId={setGoogleId} />
    </div>
  )
}
