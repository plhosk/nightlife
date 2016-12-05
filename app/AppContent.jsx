import React from 'react'
import { Match } from 'react-router'
import Divider from 'material-ui/Divider'

import TopBar from './TopBar'
import ErrorDisplay from './error/ErrorDisplay'
import Index from './Index'
import Search from './search/Search'
import UserPassForm from './auth/UserPassForm'
import BarsList from './bars/BarsList'

const styles = {
  mainContainer: {
    maxWidth: 600,
    margin: '0 auto',
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: '#ccc',
  },
  topSection: {
    padding: 10,
  },
  botSection: {
    padding: 10,
    // width: '100%',
    height: 500,
    // display: 'flex',
    // flexFlow: 'row nowrap',
    // alignItems: 'stretch',
    // justifyContent: 'space-between',

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
        <Match pattern="/" exactly render={() => (<Divider />)} />
        <Match pattern="/" exactly component={Search} />
      </div>
      <div style={styles.botSection}>
        <BarsList />
      </div>
    </div>
  </div>
)

export default AppContent
