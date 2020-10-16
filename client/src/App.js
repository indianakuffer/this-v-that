import React, { useState } from 'react'
import Header from './components/Header'
import { Switch, Route } from 'react-router-dom'
// import styled from 'styled-components'
import Feed from './screens/Feed'
import Match from './screens/Match'
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
          <Account userInfo={userInfo} />
        </Route>
        <Route path='/:id' exact>
          <Match userInfo={userInfo} />
        </Route>
      </Switch>
    </div>
  )
}
