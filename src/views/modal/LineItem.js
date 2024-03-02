import React from 'react'
import styled from 'styled-components'

const ItemWrapper = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid rgba(231, 230, 232, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Item = styled.div`
  font-size: 14px;
  font-weight: ${props => props.fontWeight};
`

const LineItem = props => {
  const { contentLeft = '', contentRight = '' } = props

  return (
    <ItemWrapper>
      <Item>{contentLeft}</Item>
      <Item fontWeight='600'>{contentRight}</Item>
    </ItemWrapper>
  )
}

export default LineItem
