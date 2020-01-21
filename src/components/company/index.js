import React from 'react'
import { connect } from 'react-redux'
import { firestore } from '../../firebase'
import { customMessage } from '../../store/actions/messageActions'
import Loading from '../common/Loading'

const getCompanyFromId = async id => {
  const brand = await firestore.doc(`brands/${id}`).get()
  if (brand.exists) {
    return brand.data()
  }
  const listing = await firestore.doc(`listings/${id}`).get()
  if (listing.exists) {
    return listing.data()
  }
  const service = await firestore.doc(`services/${id}`).get()
  if (service.exists) {
    return service.data()
  }
  const influencer = await firestore.doc(`influencers/${id}`).get()
  if (influencer.exists) {
    return influencer.data()
  }
  return null
}

class CompanyPage extends React.Component {
  constructor(props) {
    super(props)
    const companyId = props.match.params.companyId
    this.state = {
      companyId,
      loading: true,
      company: {},
    }
  }

  async componentDidMount() {
    const id = this.state.companyId
    const company = await getCompanyFromId(id)
    // TODO: redirect to 404 if no company is found
    if (!company) this.handle404()
    this.setState({
      company,
      loading: false,
    })
  }

  handle404 = () => {
    this.props.history.push('/')
    this.props.customMessage(
      <span>
        Looks like the page you tried to visit doesn't exist. <br />
        We've directed you to the front page instead.
      </span>,
    )
    this.setState({
      companyId: '',
      loading: true,
      company: {},
    })
  }

  render() {
    if (!this.state.companyId || this.state.loading) return <Loading />
    return <div />
  }
}

export default connect(
  null,
  { customMessage },
)(CompanyPage)
