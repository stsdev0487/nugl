import { storage, auth } from '.'
import UploadApi from '../api/UploadApi'

export const uploadPhoto = (listingId, file) =>
  storage
    .ref()
    .child(`listings/${listingId}/${file.name}`)
    .put(file)
    .then(snapshot => snapshot.metadata.fullPath)

export const uploadProfilePhoto = file => {
  storage
    .ref()
    .child(`users/${auth.currentUser.uid}/${file.name}`)
    .put(file)
  return UploadApi.uploadImage('users', auth.currentUser.uid, file).then(
    () =>
      `${process.env.REACT_APP_IMGIX_HOST}/users/${auth.currentUser.uid}/${file.name}`,
  )
}
