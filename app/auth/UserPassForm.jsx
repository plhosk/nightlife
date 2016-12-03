import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
  textField: {
    maxWidth: 200,
    fontSize: '1.2em',
  },
  button: {
    maxWidth: 200,
    marginTop: 10,
  },
}

const UserPassForm = (props) => {
  if (props.user) {
    return (
      <h2>You are already logged in!</h2>
    )
  }

  // this form uses refs (instead of local state or redux store).
  // In a functional component, refs must be declared here
  let userInput = null
  let passInput = null

  const onSubmit = (e) => {
    e.preventDefault()
    const username = userInput.input.value
    const password = passInput.input.value
    switch (props.pathname) {
      case '/login':
        props.dispatch({ type: 'LOGIN_REQUEST', username, password })
        break
      case '/signup':
        props.dispatch({ type: 'SIGNUP_REQUEST', username, password })
        break
      default:
    }
  }

  let formTitle = ''
  let buttonLabel = ''
  switch (props.pathname) {
    case '/login':
      formTitle = 'Log in'
      buttonLabel = 'Log in'
      break
    case '/signup':
      formTitle = 'Sign up'
      buttonLabel = 'Sign up'
      break
    default:
  }

  return (
    <div>
      <div>
        <h1>{formTitle}</h1>
        <form onSubmit={onSubmit}>
          <TextField
            style={styles.textField}
            ref={(username) => { userInput = username }}
            id="username"
            type="text"
            placeholder="Username"
            required
            autoFocus
          />
          <br />
          <TextField
            style={styles.textField}
            ref={(password) => { passInput = password }}
            id="password"
            type="password"
            placeholder="Password"
            required
          />
          <br />
          <RaisedButton
            style={styles.button}
            type="submit"
            label={buttonLabel}
          />
        </form>
      </div>
    </div>
  )
}

UserPassForm.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  pathname: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired, //eslint-disable-line
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProps)(UserPassForm)
