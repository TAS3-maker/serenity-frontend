import React from 'react'
import Programsbanner from "./Programsbanner"
import Programsdecoding from "./Programsdecoding"
import SerenityAlignedApp from "./SerenityAlignedApp"
import Aarav from "./AaravSection"
import SerenityCommunity from "./SerenityCommunity"
import Decodingmoney from "./Decodingmoney"


const Programslayout = () => {
  return (
    <div>
      <Programsbanner />
      <SerenityAlignedApp />
      <Aarav />
      <SerenityCommunity />
      <Decodingmoney /> 
      <Programsdecoding />
    </div>
  )
}

export default Programslayout
