import moment from 'moment'
import { Timestamp } from '../firebase'

const createDateFromHours = hours => {
  if (typeof hours.toDate === 'function') {
    return hours.toDate()
  }
  if (hours._seconds) {
    return new Timestamp(hours._seconds, hours._nanoseconds).toDate()
  }
  return hours
}

const isCurrentlyOpen = listing => {
  if (!listing || !listing.hours) {
    return false
  }

  const now = moment().local()
  const dayOfWeek = now.format('dddd').toLowerCase()
  const listingDay = listing.hours[dayOfWeek]
  if (!listingDay || !listingDay.open) {
    return false
  }

  const from = moment(createDateFromHours(listingDay.from)).local()
  const to = moment(createDateFromHours(listingDay.to)).local()

  const m1 = moment()
    .set('hour', from.hour())
    .set('minute', from.minute())
    .set('second', 0)
  const m2 = moment()
    .set('hour', to.hour())
    .set('minute', to.minute())
    .set('second', 0)

  const isBetween = now.isBetween(m1, m2)

  return isBetween
}

export { isCurrentlyOpen, createDateFromHours }
