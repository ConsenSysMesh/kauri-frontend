// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import ExpiredRequest from './ExpiredRequest'
import { OpenRequestsHeader as ExpiredRequestsHeader } from '../OpenRequests/View'
import OpenRequest from '../OpenRequests/OpenRequest'
import Web3 from 'web3'

const web3 = new Web3()

type Props = {
  userId?: string,
  data?: ?{ searchRequests: ?{ content: Array<?RequestDTO>, totalElements: number } },
  ethUsdPrice?: number,
  routeChangeAction: string => void,
}

const Container = styled.section`
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
  padding-top: 0px;
`

class ExpiredRequests extends Component<Props> {
  static Container = Container

  render() {
    const { ethUsdPrice, userId, data, routeChangeAction } = this.props

    return (
      <ExpiredRequests.Container>
        <ExpiredRequestsHeader>Expired Requests</ExpiredRequestsHeader>
        {Array.isArray(data && data.searchRequests && data.searchRequests.content) &&
          data.searchRequests.totalElements > 0 ? (
            data &&
            data.searchRequests &&
            data.searchRequests.content.map(
              (request, index, requests) =>
                <OpenRequest
                  web3={web3}
                  key={request.request_id}
                  userId={userId}
                  request={request}
                  ethUsdPrice={ethUsdPrice}
                  routeChangeAction={routeChangeAction}
                />
            )
          ) : (
            <p>No expired requests found!</p>
          )}
      </ExpiredRequests.Container>
    )
  }
}

export default ExpiredRequests
