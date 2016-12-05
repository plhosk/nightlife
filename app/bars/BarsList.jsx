import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import Divider from 'material-ui/Divider'
import { green500 } from 'material-ui/styles/colors'

import AttendingCount from '../attending/AttendingCount'

const styles = {
  outerDiv: {
    padding: 5,
    maxWidth: 800,
    margin: '0 auto',
  },
  lastSearch: {
    fontWeight: 'bold',
  },
  yelp: {
    textAlign: 'right',
    fontSize: '0.6em',
    padding: 3,
  },
  barDiv: {
    padding: 10,
    display: 'flex',
    flexFlow: 'row wrap',
  },
  barDivider: {
    margin: 10,
  },
  barImg: {
    float: 'left',
    height: 72,
    width: 72,
    margin: 8,
    paddingRight: 8,
    alignSelf: 'center',
  },
  barName: {
    fontWeight: 'bold',
  },
  rating: {
    color: '#4CAF50',
  },
  distance: {
    color: '#FF9800',
  },
  barInfo: {
    flexGrow: 1,
    minWidth: 200,
    alignSelf: 'flex-start',
  },
  beThere: {
    alignSelf: 'center',
    textAlign: 'center',
    paddingTop: 8,
  },
  button: {
    margin: 8,
  },
}

const BarsList = (props) => {
  if (props.search.fetching) {
    return (
      <Paper style={styles.outerDiv}>
        <CircularProgress /><br />
        <h3>Searching...</h3>
      </Paper>
    )
  }
  if (props.bars.length === 0) {
    return null
  }
  return (
    <div style={styles.outerDiv}>
      <div>Last search: <span style={styles.lastSearch}>{props.search.lastSearch}</span></div>
      <div style={styles.yelp}>Source: Yelp API</div>
      <Paper>
        {props.bars.map(bar => (
          <div key={bar.id}>
            <div style={styles.barDiv}>
              <a href={bar.url}>
                <img style={styles.barImg} src={bar.image_url} alt="Bar" />
              </a>
              <div style={styles.barInfo}>
                <span style={styles.barName}>
                  {` ${bar.name}`}
                </span>
                <br />

                <span style={styles.rating}>
                  {Math.round(bar.rating * 2)}/10
                </span>
                <br />

                <span style={styles.distance}>
                  {!isNaN(bar.distance) && (
                    <div>
                      {Math.round(bar.distance / 100) / 10} km
                      <br />
                    </div>
                  )}
                </span>

                <span>
                  <a href={bar.url}>Info</a>
                </span>
                <br />

              </div>
              <div style={styles.beThere}>
                <span style={{ fontWeight: 'bold' }}>People going: </span>
                <AttendingCount yelpId={bar.id} />
                <br />
                {(props.user && props.user.attending === bar.id) && (
                  <FlatButton
                    style={styles.button}
                    label="Destination set"
                    icon={<ActionCheckCircle color={green500} />}
                  />
                )}
                {(props.user && props.user.attending !== bar.id) && (
                  <RaisedButton
                    style={styles.button}
                    label="Set destination"
                    onClick={() => {
                      if (props.user && props.user.attending.length > 0) {
                        props.dispatch({ type: 'ATTENDING_COUNT_DECREMENT',
                          yelpId: props.user.attending })
                      }
                      props.dispatch({ type: 'ATTENDING_COUNT_RESET', yelpId: bar.id })
                      props.dispatch({ type: 'ATTENDING_ADD_REQUEST', yelpId: bar.id })
                    }}
                  />
                )}
              </div>
            </div>
            <Divider style={styles.barDivider} />
          </div>
        ))}
      </Paper>
    </div>
  )
}

BarsList.propTypes = {
  bars: PropTypes.arrayOf(PropTypes.object),
  search: PropTypes.shape({
    lastSearch: PropTypes.string.isRequired,
    fetching: PropTypes.bool.isRequired,
  }).isRequired,
  user: PropTypes.objectOf(PropTypes.string),
}

const mapStateToProps = state => ({
  bars: state.bars,
  search: state.search,
  user: state.auth.user,
})

export default connect(mapStateToProps)(BarsList)
