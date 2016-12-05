const attendingCountFetch = yelpId => (
  fetch('/api/attending', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      yelpId,
    }),
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json()
      .then(json => ({ response: json }))
    }
    return { error: response }
  })
  .catch(error => ({ error }))
)

const attendingAddFetch = yelpId => (
  fetch('/api/attending', {
    credentials: 'same-origin',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      yelpId,
    }),
  })
  .then((response) => {
    if (response.status === 200) {
      return { response: 'success' }
    }
    return { error: response }
  })
  .catch(error => ({ error }))
)

const barsFetch = search => (
  fetch('/api/search', {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      search,
      category_filter: 'bars',
    }),
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json()
      .then(json => ({ response: json }))
    }
    if (response.status === 204) {
      return { response: 'empty' }
    }
    return { error: response }
  })
  .catch(error => ({ error }))
)


const userObjectFetch = () => (
    fetch('/api/login', {
      credentials: 'same-origin',
      method: 'GET',
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
        .then(json => ({ response: json }))
      }
      if (response.status === 204) {
        return { response: 'empty' }
      }
      return { error: response }
    })
    .catch(error => ({ error }))
)


const loginFetch = (username, password) => (
  fetch('/api/login', {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json()
      .then(json => ({ response: json }))
    }
    return { error: response }
  })
  .catch(error => ({ error }))
)


const signupFetch = (username, password) => (
  fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
  .then((response) => {
    if (response.status === 200) {
      return { success: true }
    }
    return { error: response }
  })
  .catch(error => ({ error }))
)


const logoutFetch = () => (
  fetch('/api/logout', {
    credentials: 'same-origin',
    method: 'DELETE',
  })
  .then((response) => {
    if (response.status === 200) {
      return { success: true }
    }
    return { error: response }
  })
  .catch(error => ({ error }))
)

const api = {
  attendingCountFetch,
  attendingAddFetch,
  barsFetch,
  userObjectFetch,
  loginFetch,
  signupFetch,
  logoutFetch,
}

export default api
