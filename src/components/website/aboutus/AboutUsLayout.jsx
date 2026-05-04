import React from 'react'
import Aboutbanner from './AboutBanner'
import AboutDecoding from './AboutDecoding'
import BuiltSection from './BuiltSection'
import NotSection from './WeAreNot'
import ValuesSection from './OurValue'

const AboutUsLayout = () => {
  return (
    <div>
        <Aboutbanner />
        
        <BuiltSection />
        <NotSection />
        <ValuesSection />
        <AboutDecoding />
    </div>
  )
}

export default AboutUsLayout
