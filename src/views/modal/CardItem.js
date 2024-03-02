import React from 'react'
import styled from 'styled-components'

const ItemWrapper = styled.div`
    border: 1px solid rgba(34, 36, 38, 0.15);
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    margin: 16px 0;
`

const Item = styled.div`
    font-size: 14px;
`

const CardItem = props => {
  //   const { data } = props

  return (
    <ItemWrapper>
      <Item>Dương Việt Anh</Item>
      <Item>0865314035</Item>
    </ItemWrapper>
  )
}

export default CardItem
