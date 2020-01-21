import axios from 'axios'

export default class GeolocationApi {
  static getCurrentLocation() {
    return axios
      .get(`${process.env.REACT_APP_API_HOST}/geolocation/`)
      .then(response => {
        return Promise.resolve(response.data)
      })
  }
}
