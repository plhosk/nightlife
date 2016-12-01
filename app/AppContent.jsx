import React from 'react'
// import { Match } from 'react-router'

import TopBar from './TopBar'

const AppContent = () => (
  <div>
    <TopBar />
    <div> { /*
      <Paper style={styles.paper} zDepth={2}>
        <NavigationTabs />
        <div style={styles.contentDiv}>
          <ErrorMessage />
          <Match pattern="/" exactly component={Index}/>
          <Match pattern="/login" exactly component={Login}/>
          <Match pattern="/signup" exactly component={Signup}/>
          <Match pattern='/polls' exactly component={Polls}/>
          <Match pattern='/mypolls' exactly component={Polls}/>
          <Match pattern='/polls/:pollId' component={Poll}/>
        </div>
      </Paper>  */ }
    </div>
  </div>
)

export default AppContent
