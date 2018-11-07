// @flow
import React from 'react'
import { Tooltip } from 'react-tippy'
import styled from 'styled-components'
import { H6 } from '../Typography'
import theme from '../../lib/theme-config'

const TooltipContainer = styled.div`
  display: flex;
  width: 250px;
  padding: ${theme.space[2]}px;
  margin-top: ${theme.space[2]}px;
  flex-direction: column;
  position: relative;
  align-items: center;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  border-radius: 4px;
  > div:not(:last-child) {
    margin-bottom: ${theme.space[2]}px;
  }
  > * {
    cursor: pointer;
  }
`

const TooltipArrow = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  position: absolute;
  z-index: -1;
  top: -3%;
  width: 15px;
  height: 15px;
  background: white;
  transform: rotate(45deg);
  border-radius: 2px;
`

const Label = styled.span`
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${theme.colors['primary']};
`

const Divider = styled.div`
  display: flex;
  height: 2px;
  width: 100%;
  background-color: ${theme.colors['divider']};
  margin-top: ${theme.space[2]}px;
  margin-bottom: ${theme.space[2]}px;
  cursor: default;
`

const Content = () => (
  <TooltipContainer>
    <TooltipArrow />
    <Label>My Articles</Label>
    <Divider />
    <Label>Search for Articles</Label>
  </TooltipContainer>
)

const AddButtonIcon = () => (
  <svg width='30' height='30' viewBox='0 0 30 30' fill='none'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z'
      fill='#0BA986'
    />
    <rect x='6' y='6' width='18' height='18' fill='url(#pattern0)' />
    <mask id='mask0' mask-type='alpha' maskUnits='userSpaceOnUse' x='6' y='6' width='18' height='18'>
      <rect x='6' y='6' width='18' height='18' fill='url(#pattern1)' />
    </mask>
    <g mask='url(#mask0)'>
      <rect x='6' y='6' width='18' height='18' fill='white' />
    </g>
    <defs>
      <pattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'>
        <use xlinkHref='#image0' transform='scale(0.00961538)' />
      </pattern>
      <pattern id='pattern1' patternContentUnits='objectBoundingBox' width='1' height='1'>
        <use xlinkHref='#image0' transform='scale(0.00961538)' />
      </pattern>
      <image
        id='image0'
        width='104'
        height='104'
        xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABoCAYAAAAdHLWhAAAAAXNSR0IArs4c6QAAAv5JREFUeAHtnUFOG0EQRXEkNkE5ELCAkyGRa0EUVsB9YjZh4VRLXnhhi6r+/iqP81pqEZmq+T3veSzRmnEuLhgQgAAEIAABCEAAAhCAAAQgAAEIQAACEIAABA4Q2Gw2tzGfY37E/Gqso2DU3hw4HC8fk0CAHnL+xqyO0YOkY8rYd6yA/KtqZqf+ad8xT/m11Skvbt/aAvY6Xr/a97vEa+vVavUjUXcyJUsUtFHohaBFnfM35WTp9RNAkJ+xlIAgCZ+/GUF+xlICgiR8/mYE+RlLCQiS8PmbEeRnLCUgSMLnb0aQn7GUgCAJn78ZQX7GUgKCJHz+ZgT5GUsJCJLw+ZsR5GcsJSBIwudvRpCfsZSAIAmfvxlBfsZSAoIkfP5mBPkZSwkIkvD5mxHkZywlIEjC529GkJ+xlIAgCZ+/eeo+5biB/TaW9hjzOuZ3/zIXnfARq3+P+RC3hb9Wz6QsaCvndwRdVsP+8/rPOP/7qqSZj7ifyJl6q4039PjUKY2ZK0h5Pqe0uDMsLj+fNCNIej7nDKGXTqn6fNLMR1xpQRRrBBCk8bN3I8iOWAtAkMbP3o0gO2ItAEEaP3s3guyItYAZQWNviTFHYPyRXxozgsbGH2OOQJndzE7C+EKil5hsltYkjc3Su9hJeKu0la+g7W7sfYQ8xyxfspXFnUntYDRYleWM8y9fQaOpc4xvrlLyq3thStYxestX0DFCOUaeAILyrFoqEdSCPR+KoDyrlkoEtWDPhyIoz6qlEkEt2POhCMqzaqlEUAv2fCiC8qxaKhHUgj0fiqA8q5ZKBLVgz4ciKM+qpRJBLdjzoQjKs2qpRFAL9nwogvKsWioR1II9H4qgPKuWSgS1YM+HIijPqqUSQS3Y86EIyrNqqURQC/Z8KILyrFoqEdSCPR+6REHK80mLu9l/iYLKz9jsvF+V3p3D8M+DBOLhhpuYs//Z+vh2LoabwFbSU/z8E/OrMWpGLXLcYjg+BCAAAQhAAAIQgAAEIAABCEAAAhCAAAQWTOAfqlxd4sUV9HUAAAAASUVORK5CYII='
      />
    </defs>
  </svg>
)

const AddButton = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  > :first-child {
    margin-right: ${props => props.theme.space[1]}px;
  }
`

const Example = () => (
  <Tooltip html={<Content />} position='bottom' trigger='click' unmountHTMLWhenHide>
    <AddButton>
      <AddButtonIcon />
      <H6 textTransform='uppercase'>Options</H6>
    </AddButton>
  </Tooltip>
)

export default () => <Example />
