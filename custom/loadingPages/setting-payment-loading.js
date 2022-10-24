/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */

import React from 'react'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Loading = ({ leftBar }) => {
  return (
    <div>
      <div className=''>
        <div className='row'>
          <div
            className='col-8 '
            style={{ paddingTop: '35px', paddingRight: '180px' }}
          >
            <div className='div-block-346'>
              <div className='' style={{ paddingTop: '35px' }}>
                <Skeleton
                  baseColor='#CFDEEA'
                  style={{
                    height: '180px',
                    borderRadius: '',
                    width: '280px',
                  }}
                />
              </div>
            </div>

            <div style={{ width: '550px', padding: '60px' }}>
              <div className=''>
                <table className='table'>
                  <thead>
                    <tr>
                      <th style={{ padding: '14px 5px 5px 5px' }}></th>
                      <th style={{ padding: '14px 5px 5px 5px' }}>
                        <div>
                          <Skeleton
                            baseColor='#CFDEEA'
                            style={{
                              height: '10px',
                              borderRadius: '50px',
                              width: '12vw',
                            }}
                          />
                        </div>
                      </th>
                      <th style={{ padding: '14px 5px 5px 5px' }}>
                        <div>
                          <Skeleton
                            baseColor='#CFDEEA'
                            style={{
                              height: '10px',
                              borderRadius: '50px',
                              width: '12vw',
                            }}
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th style={{ padding: '14px 5px 5px 5px' }}>
                        <div>
                          <Skeleton
                            baseColor='#CFDEEA'
                            style={{
                              height: '10px',
                              borderRadius: '50px',
                              width: '12vw',
                            }}
                          />
                        </div>
                      </th>
                      <td style={{ padding: '14px 5px 5px 5px' }}>
                        <div>
                          <Skeleton
                            baseColor='#CFDEEA'
                            style={{
                              height: '10px',
                              borderRadius: '50px',
                              width: '12vw',
                            }}
                          />
                        </div>
                      </td>
                      <td style={{ padding: '14px 5px 5px 5px' }}>
                        <div>
                          <Skeleton
                            baseColor='#CFDEEA'
                            style={{
                              height: '10px',
                              borderRadius: '50px',
                              width: '12vw',
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='col-4  justify-content-center'>
            <div className='' style={{ paddingLeft: '30%' }}>
              <button
                className='border border-dark  px-5 py-2 field-label-11'
                style={{
                  width: 'auto',
                  height: 'auto',
                  backgroundColor: 'white',

                  borderRadius: '40px',
                  color: 'black',
                }}
              >
                Edit Details
              </button>
            </div>
            <div className='' style={{ padding: '50%' }}>
              <Skeleton
                baseColor='#CFDEEA'
                circle={true}
                style={{
                  height: '70px',
                  borderRadius: '50px',
                  width: '70px',
                  backgroundColor: '',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading
