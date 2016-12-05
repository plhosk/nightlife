import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import MapsLocalBar from 'material-ui/svg-icons/maps/local-bar'
import { indigo500 } from 'material-ui/styles/colors'

const styles = {
  outerDiv: {
    padding: '10px 0',
    lineHeight: '1.2em',
  },
  martini: {
    position: 'relative',
    top: 7,
    padding: 4,
  },
  title: {
    color: indigo500,
  },
}

const Index = props => (
  <div style={styles.outerDiv}>
    <h2 style={styles.title}><MapsLocalBar style={styles.martini} color={indigo500} />Nightlife</h2>
    {props.user && <h4>Welcome, {props.user.username}!</h4>}
    <ul>
      <li>Find bars in your area.</li>
      <li>See where other users of the app are planning to go.</li>
      <li>While logged in, your search term will be saved.</li>
      <li>While logged in, set your destination
          to let others know where you&rsquo;re going.</li>
      <li>Check out this app&rsquo;s source code on <a
        href="https://github.com/plhosk/nightlife"
        target="_blank"
        rel="noopener noreferrer"
      >GitHub
      </a>.</li>
    </ul>
  </div>
)

Index.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProps)(Index)
