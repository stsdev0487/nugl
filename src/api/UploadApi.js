import axios from 'axios'
import { auth } from '../firebase'

export default class UploadApi {
  static uploadImage(collection, id, image) {
    const data = new FormData()
    data.append('collection', collection)
    data.append('id', id)
    data.append('image', image, image.name)
    return auth.currentUser.getIdToken().then(token => {
      return axios
        .post(`${process.env.REACT_APP_API_HOST}/upload/image`, data, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token}`,
            'content-type': 'multipart/form-data',
          },
        })
        .then(response => {
          return response.data
        })
        .catch(err => {
          console.error(err)
        })
    })
  }
}
