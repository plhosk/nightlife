import React from 'react'
import { Match } from 'react-router'

import TopBar from './TopBar'
import ErrorDisplay from './ErrorDisplay'
import Index from './Index'
import UserPassForm from './auth/UserPassForm'

const styles = {
  mainContainer: {

  },
  topSection: {

  },
}

const AppContent = () => (
  <div>
    <TopBar />
    <div style={styles.mainContainer}>
      <div style={styles.topSection}>
        <ErrorDisplay />
        <Match pattern="/" exactly component={Index} />
        <Match pattern="/login" exactly component={UserPassForm} />
        <Match pattern="/signup" exactly component={UserPassForm} />
      </div>
      { /*
      <div style={styles.botSection}>
        <GoogleMap />
        <PlaceList />
      </div>
      */ }
    </div>
  </div>
)

export default AppContent
