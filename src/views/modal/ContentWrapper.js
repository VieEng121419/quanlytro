import { Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const ContentWrapper = props => {
  const { title, children } = props

  const StyleContentWrapper = styled.div`
    margin-bottom: 20px;
  `

  const Title = styled.div`
    &:before {
      border-left: 4px solid #9155fd;
      border-radius: 10px;
      content: '';
      margin-right: 5px;
    }
  `

  return (
    <StyleContentWrapper>
      <Typography variant='subtitle1' gutterBottom>
        <Title>{title}</Title>
      </Typography>
      {children}
    </StyleContentWrapper>
  )
}

export default ContentWrapper
