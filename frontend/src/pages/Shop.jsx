import React from 'react'
import { GetStarted } from '../components/getStarted/GetStarted'
import Popular from '../components/Popular/Popular'
import Offers from '../components/Offers/Offers'
import NewCollection from '../components/NewCollections/NewCollections'
import NewsLetter from '../components/newsLetter/NewsLetter'

const ShopPage = () => {
  return (
    <div>
      <GetStarted />
      <Popular />
      <Offers />
      <NewCollection />
      <NewsLetter />
    </div>
  )
}

export default ShopPage