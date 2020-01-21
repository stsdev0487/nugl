import axios from 'axios'

export default class GoogleApi {
  static geocodeSearch(type, input) {
    const searchText = input.split(' ').join('+')
    return axios
      .get(`${process.env.REACT_APP_API_HOST}/google/geocode`, {
        params: {
          type,
          input: searchText,
        },
        //headers: {'Authentication': `Bearer ${token}`}
      })
      .then(response => {
        return response.data
      })
  }
  static timezoneSearch(latitude, longitude) {
    return axios
      .get(`${process.env.REACT_APP_API_HOST}/google/timezone`, {
        params: {
          location: `${latitude},${longitude}`,
          timestamp: new Date().getTime() / 1000,
        },
      })
      .then(response => {
        return response.data
      })
  }
  static autoCompleteSearch(input) {
    const searchText = input.split(' ').join('+')
    return axios
      .get(`${process.env.REACT_APP_API_HOST}/google/autocomplete`, {
        params: {
          input: searchText,
        },
      })
      .then(response => {
        return Promise.resolve(response.data)
      })
  }
}
