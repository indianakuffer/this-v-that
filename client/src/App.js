import React, { useState } from 'react'
import Header from './components/Header'
import { Switch, Route } from 'react-router-dom'
// import styled from 'styled-components'
import Feed from './screens/Feed'
import Details from './screens/Details'
import Account from './screens/Account'

export default function App() {
  const [userInfo, setUserInfo] = useState(null)

  return (
    <div>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      <Switch>
        <Route path='/' exact>
          <Feed userInfo={userInfo} />
        </Route>
        <Route path='/account' exact>
          <Account userInfo={userInfo} setUserInfo={setUserInfo} />
        </Route>
        <Route path='/:id' exact>
          <Details userInfo={userInfo} />
        </Route>
      </Switch>
    </div>
  )
}
