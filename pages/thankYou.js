/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */

import React, { useEffect, useState } from 'react'
import Header2 from '../components/Header2'

const App = () => {
  return (
    <div className='wrapper '>
      <Header2 />
      <div
        id='pricing-area'
        className='m-5 d-flex justify-content-center'
        style={{
          background: 'linear-gradient(to bottom,#f3fbfe 50% ,white 50%)',
          height: '60%',
          width: '95%',
          alignContent: 'center',
        }}
      >
        <div style={{ padding: '10%' }}>
          <div
            className='card '
            style={{
              width: '45rem',
              height: '50rem',
              borderRadius: '5px',
              backgroundColor: 'white',
              padding: '5%',
              boxShadow:
                '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
              textAlign: 'center',
            }}
          >
            <img src='images/g16.png' className=''></img>
            <div className='' style={{ paddingTop: '10%' }}>
              <h3 className=''>Thank You For Booking Your Demo</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default App
