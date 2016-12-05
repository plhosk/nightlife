import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { indigo500 } from 'material-ui/styles/colors'

const styles = {
  outerDiv: {
    padding: 10,
    paddingTop: 20,
    // maxWidth: 400,
    // margin: '0 auto',
  },
  textField: {
    width: 280,
    fontSize: '1.2em',
  },
  button: {
    width: 280,
    marginTop: 10,
  },
  searchInstruct: {
    fontWeight: 'bold',
    fontSize: '1.3em',
    color: indigo500,
  },
}


const Search = (props) => {
  let searchInput = null

  const onSubmit = (e) => {
    e.preventDefault()
    const search = searchInput.input.value
    props.dispatch({ type: 'BARS_SEARCH_REQUEST', search })
  }

  return (
    <div style={styles.outerDiv}>
      <span style={styles.searchInstruct}>
        Enter a neighborhood, address, intersection, or city:
      </span>
      <form onSubmit={onSubmit}>
        <TextField
          style={styles.textField}
          ref={(search) => { searchInput = search }}
          id="username"
          type="text"
          placeholder="Search your location"
          required
          // autoFocus
        />
        <br />
        <RaisedButton
          style={styles.button}
          type="submit"
          label="Find bars"
        />
      </form>
    </div>
  )
}

export default connect()(Search)
