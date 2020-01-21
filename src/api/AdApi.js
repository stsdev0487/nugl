import axios from 'axios'

export default class AdApi {
  static generate(type) {
    return axios
      .get(`${process.env.REACT_APP_API_HOST}/a/gen`, {
        params: {
          type,
        },
      })
      .then(response => {
        return response.data
      })
  }
}
