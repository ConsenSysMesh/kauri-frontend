// @flow
import React from 'react'
import styled from 'styled-components'
import { TertiaryButton } from '../../../../../kauri-components/components/Button'

const CheckpointArticlesCTAContainer = styled.section`
  display: flex;
  justify-content: center;
  padding: ${props => props.theme.space[1]}px ${props => props.theme.padding};
  padding-bottom: 0px;
  margin: 0px ${props => props.theme.space[2]}px;
`

export const CheckpointArticlesIcon = () => (
  <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z'
      fill='#3897F0'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M13.7647 11.0714L9.88235 4L6 11.0714L9.88235 16L13.7647 11.0714ZM9.8823 6.24008L12.3689 10.7686L9.8823 11.8947L7.39571 10.7686L9.8823 6.24008ZM11.3343 12.4182L9.88242 13.0751L8.43051 12.4177L9.88242 14.2607L11.3343 12.4182Z'
      fill='white'
    />
  </svg>
)

export const AllArticlesOnMainnet = ({ text = 'All Articles on Mainnet' }: { text?: string }) => (
  <CheckpointedArticlesContainer>
    <CheckpointArticlesIcon />
    <span>{text}</span>
  </CheckpointedArticlesContainer>
)

const CheckpointedArticlesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > :first-child {
    margin-right: ${props => props.theme.space[1]}px;
    color: ${props => props.theme.colors['textPrimary']};
  }
  font-size: ${props => props.theme.fontSizes[0]}px;
  font-weight: ${props => props.theme.fontWeight[3]};
  text-transform: uppercase;
`

type Props = {
  articles: Array<ArticleDTO>,
  checkpointArticlesAction: () => void,
  pageType: 'public-profile' | 'approved-article',
}

export default ({ articles, checkpointArticlesAction, pageType = 'public-profile' }: Props) => (
  <CheckpointArticlesCTAContainer>
    {articles.find(article => !article.checkpoint) ? (
      <TertiaryButton
        color={'textPrimary'}
        icon={<CheckpointArticlesIcon />}
        onClick={() => checkpointArticlesAction()}
      >
        Submit Articles to Mainnet
      </TertiaryButton>
    ) : pageType === 'public-profile' ? (
      <AllArticlesOnMainnet />
    ) : (
      <AllArticlesOnMainnet text={'Article on Mainnet'} />
    )}
  </CheckpointArticlesCTAContainer>
)
