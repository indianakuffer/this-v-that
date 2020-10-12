import React, { useState } from 'react'
import Header from './components/Header'

export default function App() {
  const [userInfo, setUserInfo] = useState(null)

  return (
    <div>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
    </div>
  )
}
