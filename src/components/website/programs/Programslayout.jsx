import React from 'react'
import Programsbanner from "./Programsbanner"
import Programsdecoding from "./Programsdecoding"
import SerenityAlignedApp from "./SerenityAlignedApp"
import Aarav from "./AaravSection"
import SerenityCommunity from "./SerenityCommunity"


const Programslayout = () => {
  return (
    <div>
      <Programsbanner />
      <SerenityAlignedApp />
      <Aarav />
      <SerenityCommunity />
      <Programsdecoding />
    </div>
  )
}

export default Programslayout
