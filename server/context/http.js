import rp from 'request-promise'

export default class Http {
  constructor () {
    this.rp = rp
  }

  post (apiUri, data) {
    return this.rp({
      method: 'POST',
      uri: apiUri,
      // POST data to a JSON REST API
      body: data,
      json: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
  }

  get (apiUri) {
    return this.rp({
      method: 'GET',
      uri: apiUri,
      json: true,
    })
  }
}
