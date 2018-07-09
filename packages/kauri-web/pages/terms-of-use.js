import React from 'react'
import { withApollo, compose } from 'react-apollo'
import withData from '../lib/with-data'
import App from '../layouts/App'
import TermsOfUse from '../components/containers/TermsOfUse'

class TermsOfUsePage extends React.Component {
  render () {
    return (
      <App url={this.props.url}>
        <TermsOfUse category={'kauri'} />
      </App>
    )
  }
}

export default compose(withData, withApollo)(TermsOfUsePage)
