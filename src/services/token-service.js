import jwtDecode from 'jwt-decode'
import config from '../config'

let timeoutId
const TEN_SECONDS_IN_MS = 10000

const TokenService = {
  saveAuthToken (token) {
    window.localStorage.setItem('token', token)
  },
  getAuthToken () {
    return window.localStorage.getItem('token')
  },
  clearAuthToken () {
    window.localStorage.removeItem('token')
  },
  hasAuthToken () {
    return !!TokenService.getAuthToken()
  },
  makeBasicAuthToken (userName, password) {
    return window.btoa(`${userName}:${password}`)
  },
  parseJwt (jwt) {
    return jwtDecode(jwt)
  },
  readJwtToken () {
    return TokenService.parseJwt(TokenService.getAuthToken())
  },
  getMsUntilExpiry (payload) {
    /*
      payload is from the JWT
      the `exp` value is in seconds, need to convert to ms, so * 1000
      calculates the difference between now and when the JWT will expire
    */
    return (payload.exp * 1000) - Date.now()
  },
  queueCallbackBeforeExpiry (callback) {
    /* get the number of ms from now until the token expires */
    const msUntilExpiry = TokenService.getMsUntilExpiry(
      TokenService.readJwtToken()
    )
    /*
      queue a callback that will happen 10 seconds before the token expires
      the callback is passed in as an argument so could be anything,
        in this app, the callback is for calling the refresh endpoint
    */
    timeoutId = setTimeout(callback, msUntilExpiry - TEN_SECONDS_IN_MS)
  },
  clearCallbackBeforeExpiry () {
    clearTimeout(timeoutId)
  }
}

export default TokenService
