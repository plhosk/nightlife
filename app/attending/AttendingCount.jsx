import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CircularProgress from 'material-ui/CircularProgress'

const AttendingCount = (props) => {
  if ({}.hasOwnProperty.call(props.attending, props.yelpId) === -1
    || props.attending[props.yelpId] === -1) {
    return <CircularProgress size={16} />
  }
  return <span>{props.attending[props.yelpId]}</span>
}

AttendingCount.propTypes = {
  attending: PropTypes.objectOf(PropTypes.number),
  yelpId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  attending: state.attending,
})

export default connect(mapStateToProps)(AttendingCount)
